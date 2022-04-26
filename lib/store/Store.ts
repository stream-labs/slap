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
import { traverse } from '../utils/traverse';
import { parseStateConfig } from './parse-config';
import { StateView } from './StateView';

/**
 * All React related code should be handled in ReactAdapter
 * Framework agnostic store
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

    console.log('REGISTER STORE', moduleName);
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

  toJSON() {
    // TODO use for debugging
    JSON.stringify(this.rootState);
  }

  destroyModule(moduleName: string) {
    delete this.rootState[moduleName];
    delete this.modulesMetadata[moduleName];
    console.log('UNREGISTER STATE', moduleName);
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

    Object.keys(config.getters).forEach(propName => {
      const getter = () => config.getters[propName].get.apply(controller);
      defineGetter(controller, propName, getter);
      defineGetter(getters, propName, getter);
    });

    Object.keys(config.getterMethods).forEach(propName => {
      defineGetter(controller, propName, () => (...args: any) => config.getterMethods[propName].apply(controller, args));
    });

    // create auto-generated mutations
    Object.keys(defaultState).forEach(propertyName => {
      const mutationName = `set${capitalize(propertyName)}`;
      if (config.mutations[mutationName]) return;
      const mutationMethod = (propVal: unknown) => (controller as any)[propertyName] = propVal;
      config.mutations[mutationName] = mutationMethod;
      controller.registerMutation(mutationName, mutationMethod);
    });

    // create default mutations
    this.registerDefaultMutations();

    // create other mutations
    Object.keys(config.mutations).forEach(propName => {
      this.registerMutation(propName, config.mutations[propName]);
    });

  }

  finishInitialization() {
    // use immer to lock an immutable state
    this.getMetadata().isInitialized = true;
    this.store.rootState[this.moduleName] = produce(this.store.rootState[this.moduleName], () => {});
  }

  registerMutation(mutationName: string, mutationMethod: Function, mutationThisContext?: any) {
    const controller = this;
    const { store, moduleName } = controller;
    const mutationContext = mutationThisContext || controller;

    if (!controller.getMetadata().config.mutations[mutationName]) {
      controller.getMetadata().config.mutations[mutationName] = mutationMethod;
    }

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

  mutate(mutation: ((draft: this) => unknown) | Mutation) {
    const moduleName = this.moduleName;
    const state = this.store.rootState[moduleName];
    const mutationIsFunction = typeof mutation === 'function';
    const metadata = this.getMetadata();

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

  // TODO remove
  set state(val: any) {
    console.log('set state ', val);
    throw new Error('Trying to set state');
  }

  getMetadata() {
    return this.store.modulesMetadata[this.moduleName];
  }

  get getters(): TStateFor<TConfig> {
    return this.getMetadata().getters as TStateFor<TConfig>;
  }

  createView() {
    const config = this.getMetadata().config;
    const view = new StateView();
    const controller = this;

    view.defineProp({
      description: 'StateRev',
      name: 'getRev',
      reactive: true,
      getValue: () => {
        // eslint-disable-next-line no-unused-expressions
        controller.state; // read as reactive
        // console.log(`read REV for ${controller.moduleName}.${controller.sectionName}`, controller.metadata.rev);
        return controller.getMetadata().rev;
      },
    });

    traverse(config.state, stateKey => {
      view.defineProp({
        description: 'StateProp',
        name: stateKey,
        reactive: true,
        getValue: () => (controller as any)[stateKey],
      });
    });

    traverse(config.mutations, stateKey => {
      view.defineProp({
        description: 'StateMutation',
        name: stateKey,
        reactive: false,
        getValue: () => (controller as any)[stateKey],
      });
    });

    traverse(config.getters, (propName) => {
      view.defineProp({
        description: 'StateGetter',
        name: propName,
        reactive: true,
        getValue: () => (controller as any)[propName],
      });
    });

    traverse(config.getterMethods, (propName) => {
      view.defineProp({
        description: 'StateGetterMethod',
        name: propName,
        reactive: false,
        getValue: () => (controller as any)[propName],
      });
    });

    return view;
  }

}

export interface Mutation {
  id: number;
  moduleName: string;
  mutationName: string;
  mutationContext?: any;
  payload: any;
}
//
// /**
//  * use immerjs API to clone the object
//  */
// export function clone<T>(state: T) {
//   return produce(state, draft => {});
// }

export const defaultStateConfig: Partial<TStateConfig> = {
  // persistent: false,
  // autogenerateMutations: true,
};

export type TStateConfigCreator = (new (...args: any) => TStateConfigDraft) | TStateConfigDraft

export type TStateConfig = {
  state: any;
  mutations: any;
  getters: any;
  getterMethods: any;
  [key: string]: any;
  // persistent?: boolean, // TODO ?
  // persistentKeys?: boolean, // TODO ?
  // autogenerateMutations?: boolean, // TODO ?
}

export type TStateConfigDraft = Partial<TStateConfig>

export interface StatefulModuleMetadata {
  rev: number;
  config: TStateConfig;
  controller: StateController;
  isInitialized: boolean;
  getters: Dict<() => any>;
}

// todo refactor

export type TDraftConfigFor<TConfigCreator> =
  TConfigCreator extends new (...args: any) => infer TDraftConfigFromConstructor ?
    TDraftConfigFromConstructor :
      TConfigCreator extends (...args: any) => infer TDraftConfigFromFunction ?
        TDraftConfigFromFunction :
          TConfigCreator;

export type TStateConfigFor<TDraftConfig> = {
  state: TStateFor<TDraftConfig>;
  getters: any;
  getterMethods: any;
  mutations: any;
}

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
  PickDefaultMutations<TState> &
  PickMethods<TDraftConfig> &
  Exclude<TDraftConfig, keyof TStateConfig>

export type TStateViewForStateConfig<TConfigCreator> = Omit<GetStateControllerFor<TConfigCreator>, 'state'>;

export type GetSetterName<TPropName> = TPropName extends string ? `set${Capitalize<TPropName>}` : never;

export type PickDefaultState<TDraftConfig> = TDraftConfig extends { state: infer TState } ? TState : WritablePart<TDraftConfig>;

export type PickAutogeneratedMutations<TState> = {
  [K in keyof TState as GetSetterName<K>]: (value: TState[K]) => unknown
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

type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
