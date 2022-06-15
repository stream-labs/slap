import produce from 'immer';
import { createNanoEvents } from 'nanoevents';
import {
  Scope,
  generateId,
  Dict,
  defineGetter,
  capitalize,
  defineSetter,
  PickFunctionProperties,
} from '../scope';
import { parseStateConfig } from './parse-config';
import {
  ArraySearchQuery, ArrayUpdateQuery, find, isSimilar, removeItems, updateItems,
} from '../utils';

/**
 * A centralised framework-agnostic store.
 * Data in this store is split by named states
 * Each module could inject multiple named states.
 * For better performance keep only reactive data in the store.
 *
 * All React related code should be handled in ReactAdapter
 */
export class Store {

  // keeps the state for all modules here as a map of immutable objects
  rootState = { } as Dict<any>;

  // keeps additional metadata
  modulesMetadata = { } as Dict<StatefulModuleMetadata>;

  pendingMutations = 0;
  moduleRevisions: Dict<number> = {};

  createState<TConfigCreator>(moduleName: string, configCreator: TConfigCreator): GetStateControllerFor<TConfigCreator> {

    if (this.modulesMetadata[moduleName] && this.modulesMetadata[moduleName]) {
      throw new Error(`State with a name "${moduleName}" is already created`);
    }

    const config = parseStateConfig(configCreator);
    const controller = new StateController(this, moduleName, config);
    return controller as GetStateControllerFor<TConfigCreator>;
  }

  dispatchMutation(mutation: Mutation) {
    const moduleName = mutation.moduleName;
    const metadata = this.modulesMetadata[moduleName];
    if (!metadata) return; // state is destroyed

    const stateController = this.modulesMetadata[moduleName].controller;

    if (this.pendingMutations) {
      throw new Error('Can not run mutation while previous mutation is not completed');
    }

    stateController.mutate(mutation);
  }

  destroyModule(moduleName: string) {
    const metadata = this.modulesMetadata[moduleName];
    metadata.subscriptions.forEach(unsub => unsub());
    delete this.rootState[moduleName];
    delete this.modulesMetadata[moduleName];
  }

  recordingAccessors = 0;

  affectedModules: Record<string, number> = {};

  listenAffectedModules(cb: Function) {
    this.recordingAccessors++;
    cb();
    const result = this.affectedModules;
    this.recordingAccessors--;
    if (!this.recordingAccessors) {
      this.affectedModules = {};
    }
    return result;
  }

  currentContext: Record<string, Scope> = {};

  setModuleContext(moduleName: string, scope: Scope) {
    this.currentContext[moduleName] = scope;
  }

  resetModuleContext(moduleName: string) {
    delete this.currentContext[moduleName];
  }

  getMetadata(moduleName: string) {
    return this.modulesMetadata[moduleName];
  }

  getController(moduleName: string) {
    return this.getMetadata(moduleName)?.controller;
  }

  events = createNanoEvents<StoreEvents>();
}

export interface StoreEvents {
  onMutation: (mutation: Mutation | Function) => void
  onReadyToRender: () => void
}

/**
 * Controls a single named state
 */
export class StateController<TConfig = any> {

  draftState: any = null;

  constructor(
    public store: Store,
    public moduleName: string,
    config: TStateConfig,
  ) {
    const defaultState = config.state;

    store.rootState[moduleName] = { ...defaultState };

    // create metadata
    const controller = this;
    const getters = {};
    const metadata: StatefulModuleMetadata = {
      config,
      controller,
      getters,
      subscriptions: [],
      isInitialized: false,
      rev: 0,
    };
    store.modulesMetadata[moduleName] = metadata;

    // generate getters
    Object.keys(defaultState).forEach(propName => {
      const getter = () => (controller.state as any)[propName];
      defineGetter(controller, propName, getter);
      defineGetter(getters, propName, getter);
      defineSetter(controller, propName, val => {
        const changeIsAllowed = !metadata.isInitialized || controller.draftState;
        if (!changeIsAllowed) {
          console.error(`Failed to set "${propName}" with value`, val);
          throw new Error('Changing state outside of mutation');
        }
        (controller.state as any)[propName] = val;
        return true;
      });
    });

    // create simple getters and setters from the state config
    Object.keys(config.getters).forEach(propName => {
      const getter = () => config.getters[propName].get.apply(controller);
      defineGetter(controller, propName, getter);
      defineGetter(getters, propName, getter);
    });

    // create getter methods
    Object.keys(config.getterMethods).forEach(propName => {
      defineGetter(controller, propName, () => (...args: any) => config.getterMethods[propName].apply(controller, args));
    });

    // create auto-generated mutations
    Object.keys(defaultState).forEach(propertyName => {
      const mutationName = `set${capitalize(propertyName)}`;
      if (config.mutations[mutationName]) return;
      const mutationMethod = (propVal: unknown) => (controller as any)[propertyName] = propVal;
      controller.registerMutation(mutationName, mutationMethod);

      // generate array helpers
      if (!Array.isArray(defaultState[propertyName])) return;

      // generate a "push" mutation
      const pushMutationName = `push${capitalize(propertyName)}`;
      if (!config.mutations[pushMutationName]) {
        controller.registerMutation(pushMutationName, (newItem: unknown) => (controller as any)[propertyName].push(newItem));
      }
      // generate a "remove" mutation
      const removeMutation = `remove${capitalize(propertyName)}`;
      if (!config.mutations[removeMutation]) {
        controller.registerMutation(removeMutation, (searchQuery: ArraySearchQuery<unknown>) => {
          removeItems((controller as any)[propertyName], searchQuery);
        });
      }

      // generate an "update" mutation
      const updateMutation = `update${capitalize(propertyName)}`;
      if (!config.mutations[updateMutation]) {
        controller.registerMutation(
          updateMutation,
          (searchQuery: ArraySearchQuery<unknown>, updateFn: (item: unknown) => unknown) => {
            updateItems((controller as any)[propertyName], searchQuery, updateFn);
          },
        );
      }

      // create a find getter
      const findGetterName = `find${capitalize(propertyName)}`;
      if (!config.getterMethods[findGetterName]) {
        defineGetter(controller, findGetterName, () => (searchQuery: ArraySearchQuery<unknown>) => {
          return find((controller as any)[propertyName], searchQuery);
        });
      }
    });

    // create default mutations
    this.registerDefaultMutations();

    // create other mutations
    Object.keys(config.mutations).forEach(propName => {
      this.registerMutation(propName, config.mutations[propName]);
    });

    // create change events for each getter
    Object.keys(this.getters).forEach(getterName => {
      const eventName = `on${capitalize(getterName)}Change`;
      (this as any)[eventName] = (cb: (newVal: any, prevVal: any) => unknown, isEqual = isSimilar) => {
        let prevVal = (this.getters as any)[getterName];
        const unsubscribe = this.store.events.on('onMutation', () => {
          const newVal = (this.getters as any)[getterName];
          if (isEqual(newVal, prevVal)) return;
          cb(newVal, prevVal);
          prevVal = newVal;
        });
        this.getMetadata().subscriptions.push(unsubscribe);
        return unsubscribe;
      };
    });

  }

  finishInitialization() {
    // use immer to lock an immutable state
    this.getMetadata().isInitialized = true;
    this.store.rootState[this.moduleName] = produce(this.store.rootState[this.moduleName], () => {});
  }

  /**
   * Register a named mutation in the store.
   */
  registerMutation(mutationName: string, mutationMethod: Function, mutationThisContext?: any) {
    const controller = this;
    const { store, moduleName } = controller;
    const mutationContext = mutationThisContext || controller;

    controller.getMetadata().config.mutations[mutationName] = mutationMethod;

    // override the original Module method to dispatch mutations
    (controller as any)[mutationName] = function (...args: any[]) {
      // if this method was called from another mutation
      // we don't need to dispatch a new mutation again
      // just call the original method
      if (controller.draftState) {
        return mutationMethod.apply(mutationContext, args);
      }

      const mutation = {
        id: Number(generateId()),
        payload: args,
        moduleName,
        mutationName,
        mutationContext,
      };
      store.dispatchMutation(mutation);
    };
  }

  /**
   * Execute mutation
   * @param mutation a mutation function or Mutation object for a pre-registered named mutation
   */
  mutate(mutation: ((draft: this) => unknown) | Mutation) {
    const moduleName = this.moduleName;
    const state = this.store.rootState[moduleName];
    const mutationIsFunction = typeof mutation === 'function';
    const metadata = this.getMetadata();
    if (!metadata) return; // state is destroyed

    if (!metadata.isInitialized) {
      if (mutationIsFunction) {
        mutation(this);
      } else {
        const mutationObj = mutation as Mutation;
        const thisContext = mutationObj.mutationContext || this;
        metadata.config.mutations[mutationObj.mutationName].apply(thisContext, mutationObj.payload);
      }
      return;
    }

    this.store.pendingMutations++;

    try {
      this.store.rootState[moduleName] = produce(state, (draft: unknown) => {
        this.draftState = draft;
        if (mutationIsFunction) {
          mutation(this);
          return;
        }
        const mutationObj = mutation as Mutation;
        const thisContext = mutationObj.mutationContext || this;
        metadata.config.mutations[mutationObj.mutationName].apply(thisContext, mutationObj.payload);
      });
    } catch (e) {
      console.error('mutation failed', e);
    } finally {
      this.store.pendingMutations--;
      this.getMetadata().rev++;
      this.draftState = null;
    }

    this.store.events.emit('onMutation', mutation);

    if (!this.store.pendingMutations) {
      this.store.events.emit('onReadyToRender');
    }
  }

  private registerDefaultMutations() {
    const controller = this;
    const updateStateMutation = (statePatch: object) => Object.assign(controller, statePatch);
    controller.registerMutation('update', updateStateMutation);
  }

  get state(): TStateFor<TConfig> {
    if (this.draftState) return this.draftState;

    const store = this.store;
    const moduleName = this.moduleName;

    if (store.recordingAccessors) {
      store.affectedModules[moduleName] = this.getMetadata().rev;
    }

    return store.rootState[moduleName];
  }

  getMetadata() {
    return this.store.modulesMetadata[this.moduleName];
  }

  get getters(): TStateFor<TConfig> {
    return this.getMetadata().getters as TStateFor<TConfig>;
  }

  waitFor(cb: () => boolean | any, waitOptions?: { timeout: number }) {
    let isFound = cb();
    if (isFound) return;

    return new Promise<void>((resolve, reject) => {

      const unsubscribe = this.store.events.on('onMutation', () => {
        isFound = cb();
        if (!isFound) return;
        unsubscribe();
        resolve();
      });
      this.getMetadata().subscriptions.push(unsubscribe);

      if (waitOptions?.timeout) {
        setTimeout(() => {
          if (isFound) return;
          unsubscribe();
          reject(new Error('Store waiting timeout'));
        }, waitOptions.timeout);
      }
    });

  }

}

export interface Mutation {
  id: number;
  moduleName: string;
  mutationName: string;
  mutationContext?: any;
  payload: any;
}

export type TStateConfigCreator = (new (...args: any) => TStateConfigDraft) | TStateConfigDraft

export type TStateConfig = {
  state: any;
  mutations: any;
  getters: any;
  getterMethods: any;
  [key: string]: any;
}

export type TStateConfigDraft = Partial<TStateConfig>

export interface StatefulModuleMetadata {
  rev: number;
  config: TStateConfig;
  controller: StateController;
  isInitialized: boolean;
  getters: Dict<() => any>;
  subscriptions: (() => unknown)[];
}

export type TDraftConfigFor<TConfigCreator> =
  TConfigCreator extends new (...args: any) => infer TDraftConfigFromConstructor ?
    TDraftConfigFromConstructor :
      TConfigCreator extends (...args: any) => infer TDraftConfigFromFunction ?
        TDraftConfigFromFunction :
          TConfigCreator;

export type TStateFor<TConfigCreator, TDraftConfig = TDraftConfigFor<TConfigCreator>> = TDraftConfig extends { state: infer TState } ? TState : WritablePart<TDraftConfig>;

export type PickMethods<
  TDraftConfig,
  TRootMethods = PickFunctionProperties<TDraftConfig>,
  TExplicitGetters = TDraftConfig extends { getters: infer TGetters } ? TGetters : {},
  TExplicitGetterMethods = TDraftConfig extends { getterMethods: infer TGetterMethods } ? TGetterMethods : {},
  TExplicitMutations = TDraftConfig extends { mutations: infer TMutations } ? TMutations : {}
  > = TRootMethods & TExplicitGetters & TExplicitGetterMethods & TExplicitMutations;

export type GetHeuristicGetterName<TPropName> = TPropName extends string ? `${'get'|'is'|'should'|'will'}${Capitalize<TPropName>}` : never;

export type PickHeuristicGetters<TDraftConfig> = {
  [K in keyof TDraftConfig as GetHeuristicGetterName<K>]: (value: TDraftConfig[K]) => unknown
}

export type GetStateControllerFor<
  TConfigCreator,
  TDraftConfig = TDraftConfigFor<TConfigCreator>,
  TState = PickDefaultState<TDraftConfig>,
> =
  StateController<TConfigCreator> &
  TState &
  Omit<PickAutogeneratedMutations<TState>, keyof PickMethods<TDraftConfig>> &
  PickAutogeneratedPushMutations<TConfigCreator> &
  PickAutogeneratedUpdateMutations<TConfigCreator> &
  PickAutogeneratedRemoveMutations<TConfigCreator> &
  PickAutogeneratedFindGetters<TConfigCreator> &
  PickDefaultMutations<TState> &
  PickAutogeneratedEvents<TConfigCreator> &
  PickMethods<TDraftConfig> &
  Exclude<TDraftConfig, keyof TStateConfig>

export type TStateViewForStateConfig<TConfigCreator> = Omit<GetStateControllerFor<TConfigCreator>, 'state'>;

export type GetSetterName<TPropName> = TPropName extends string ? `set${Capitalize<TPropName>}` : never;

export type PickDefaultState<TDraftConfig> = TDraftConfig extends { state: infer TState } ? TState : WritablePart<TDraftConfig>;

export type PickAutogeneratedMutations<TState> = {
  [K in keyof TState as GetSetterName<K>]: (value: TState[K]) => unknown
}

export type GetChangeEventName<TPropName> = TPropName extends string ? `on${Capitalize<TPropName>}Change` : never;
export type PickAutogeneratedEvents<TConfigCreator, TState = TStateFor<TConfigCreator>> = {
  [K in keyof TState as GetChangeEventName<K>]: (cb: (newValue: TState[K], prevValue: TState[K]) => unknown) => () => unknown;
}

export type GetPushMutationName<TPropName> = TPropName extends string ? `push${Capitalize<TPropName>}` : never;
export type PickAutogeneratedPushMutations<TConfigCreator, TState = TStateFor<TConfigCreator>> = {
  [K in keyof TState as GetPushMutationName<K>]: TState[K] extends Array<infer TItem> ? (newItem: TItem) => void : never;
}

export type GetRemoveMutationName<TPropName> = TPropName extends string ? `remove${Capitalize<TPropName>}` : never;
export type PickAutogeneratedRemoveMutations<TConfigCreator, TState = TStateFor<TConfigCreator>> = {
  [K in keyof TState as GetRemoveMutationName<K>]: TState[K] extends Array<infer TItem> ? (searchQuery: ArraySearchQuery<TItem>) => void : never;
}

export type GetUpdateMutationName<TPropName> = TPropName extends string ? `update${Capitalize<TPropName>}` : never;
export type PickAutogeneratedUpdateMutations<TConfigCreator, TState = TStateFor<TConfigCreator>> = {
  [K in keyof TState as GetUpdateMutationName<K>]: TState[K] extends Array<infer TItem> ? (searchQuery: ArraySearchQuery<TItem>, updateQuery: ArrayUpdateQuery<TItem>) => void : never;
}

export type GetFindGetterName<TPropName> = TPropName extends string ? `find${Capitalize<TPropName>}` : never;
export type PickAutogeneratedFindGetters<TConfigCreator, TState = TStateFor<TConfigCreator>> = {
  [K in keyof TState as GetFindGetterName<K>]: TState[K] extends Array<infer TItem> ? (searchQuery: ArraySearchQuery<TItem>) => TItem | undefined : never;
}


export type PickDefaultMutations<TState> = {
  update(patch: Partial<TState>): unknown;
}

// Create a WritablePart helper
// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
export type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];

export type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
