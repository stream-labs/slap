import produce from 'immer';
import { createNanoEvents } from 'nanoevents';
import { isPlainObject } from 'is-plain-object';
import {
  Scope,
  generateId,
  Dict,
  defineGetter,
  capitalize,
  defineSetter,
  PickFunctionPropertyNames,
  PickFunctionProperties, TLoadingStatus,
} from '../scope';
import { traverse } from '../utils/traverse';
import { parseStateConfig } from './parse-config';

/**
 * All React related code should be handled in ReactAdapter
 * Framework agnostic store
 */
export class Store {

  // keeps the state for all modules here as a map of immutable objects
  rootState = { } as Dict<any>;

  // keeps additional metadata
  modulesMetadata = { } as Dict<StatefulModuleMetadata>;

  currentMutation: Mutation | null = null;
  moduleRevisions: Dict<number> = {};

  createState<TConfigCreator>(stateName: string, configCreator: TConfigCreator): TStateControllerFor<TConfigCreator> {

    if (this.modulesMetadata[stateName]) {
      throw new Error(`State with a name "${stateName}" is already created`);
    }

    const config = parseStateConfig(configCreator);

    console.log('REGISTER STORE', stateName);
    const controller = new ModuleStateController(this, stateName, config);

    return controller as TStateControllerFor<TConfigCreator>;
  }

  dispatchMutation(mutation: Mutation) {
    console.log('RUN MUTATION', mutation);
    const stateName = mutation.stateName;
    const stateController = this.modulesMetadata[stateName].controller;

    if (this.currentMutation) {
      throw new Error('Can not run mutation while previous mutation is not completed');
    }

    this.currentMutation = mutation;
    stateController.applyMutation(mutation);
    this.currentMutation = null;

    // trigger subscribed components to re-render
    this.events.emit('onMutation', mutation, this);
  }

  getMetadata(stateName: string) {
    return this.modulesMetadata[stateName];
  }

  toJSON() {
    // TODO use for debugging
  }

  // TODO : move to hooks?
  currentScope: Record<string, Scope> = {};

  setModuleScope(moduleName: string, scope: Scope) {
    this.currentScope[moduleName] = scope;
  }

  resetModuleScope(moduleName: string) {
    delete this.currentScope[moduleName];
  }

  destroyState(stateName: string) {
    delete this.rootState[stateName];
  }

  isRecordingAccessors = false;

  affectedModules: Record<string, number> = {};

  listenAffectedModules(cb: Function) {
    this.isRecordingAccessors = true;
    cb();
    const result = this.affectedModules;
    this.isRecordingAccessors = false;
    this.affectedModules = {};
    return result;
  }

  currentContext: Record<string, Scope> = {};

  setModuleContext(moduleName: string, scope: Scope) {
    this.currentContext[moduleName] = scope;
  }

  resetModuleContext(moduleName: string) {
    delete this.currentContext[moduleName];
  }

  events = createNanoEvents<StoreEvents>();
}

export interface StoreEvents {
  onMutation: (mutation: Mutation, store: Store) => void
}

export class ModuleStateController {

  draftState: any = null;

  constructor(public store: Store, public stateName: string, config: TStateConfig) {
    const defaultState = config.state;

    // use immer to create an immutable state
    store.rootState[stateName] = produce(defaultState, () => {});

    // create metadata
    const controller = this;
    const metadata: StatefulModuleMetadata = {
      config,
      controller,
      rev: 0,
    };
    store.modulesMetadata[stateName] = metadata;

    // generate getters
    Object.keys(defaultState).forEach(propName => {
      defineGetter(controller, propName, () => controller.state[propName]);
      defineSetter(controller, propName, val => {
        controller.state[propName] = val;
        return true;
      });
    });

    Object.keys(config.getters).forEach(propName => {
      defineGetter(controller, propName, () => config.getters[propName].get.apply(controller));
    });

    Object.keys(config.getterMethods).forEach(propName => {
      defineGetter(controller, propName, (...args) => config.getterMethods[propName].apply(controller, args));
    });

    // create auto-generated mutations
    Object.keys(defaultState).forEach(propertyName => {
      const mutationName = `set${capitalize(propertyName)}`;
      if (config.mutations[mutationName]) return;
      const mutationMethod = (propVal: unknown) => (controller as any)[propertyName] = propVal;
      config.mutations[mutationName] = mutationMethod;
      controller.registerMutation(mutationName, mutationMethod);
    });

    // create other mutations
    Object.keys(config.mutations).forEach(propName => {
      this.registerMutation(propName, config.mutations[propName]);
    });


    // define bulk state mutation
    const bulkMutationName = 'bulkUpdateState';
    config.mutations[bulkMutationName] = (statePatch: object) => Object.assign(controller, statePatch);
    controller.registerMutation('bulkUpdateState', config.mutations[bulkMutationName]);
  }

  registerMutation(mutationName: string, mutationMethod: Function) {
    const controller = this;
    const { store, stateName } = controller;

    // override the original Module method to dispatch mutations
    (controller as any)[mutationName] = function (...args: any[]) {
      // if this method was called from another mutation
      // we don't need to dispatch a new mutation again
      // just call the original method
      if (store.currentMutation) {
        if (store.currentMutation.stateName !== stateName) {
          const parentMutation = store.currentMutation;
          const parentMutationName = `${parentMutation.stateName}_${parentMutation.mutationName}`;
          const childMutationName = `${stateName}_${mutationName}`;

          // TODO should we really prevent that?
          throw new Error(`Can not run a mutation of another module. Call ${parentMutationName} from ${childMutationName}`);
        }
        return mutationMethod.apply(controller, args);
      }

      const mutation = {
        id: Number(generateId()),
        payload: args,
        stateName,
        mutationName,
      };
      store.dispatchMutation(mutation);
    };
  }

  applyMutation(mutation: Mutation) {
    const stateName = mutation.stateName;
    const mutationName = mutation.mutationName;
    const state = this.store.rootState[stateName];
    this.store.rootState[stateName] = produce(state, (draft: unknown) => {
      this.draftState = draft;
      const controller = this as ModuleStateController;
      controller.metadata.config.mutations[mutationName].apply(controller, mutation.payload);
    });
    this.metadata.rev++;
    this.draftState = null;
  }

  get state() {
    if (this.draftState) return this.draftState;

    const store = this.store;
    const stateName = this.stateName;

    if (store.isRecordingAccessors) {
      store.affectedModules[stateName] = this.metadata.rev;
    }

    return store.rootState[stateName];
  }

  // TODO remove
  set state(val: any) {
    console.log('set state ', val);
    throw new Error('Trying to set state');
  }

  get metadata() {
    return this.store.modulesMetadata[this.stateName];
  }
}

export interface Mutation {
  id: number;
  stateName: string;
  mutationName: string;
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
  controller: ModuleStateController;
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


export type TStateFor<TDraftConfig> = TDraftConfig extends { state: infer TState } ? TState : WritablePart<TDraftConfig>;

export type PickMethods<
  TDraftConfig,
  TRootMethods = PickFunctionProperties<TDraftConfig>,
  TExplicitGetters = TDraftConfig extends { getters: infer TGetters } ? TGetters : {},
  TExplicitGetterMethods = TDraftConfig extends { getterMethods: infer TGetterMethods } ? TGetterMethods : {},
  TExplicitMutations = TDraftConfig extends { getters: infer TMutations } ? TMutations : {}
  > = TRootMethods & TExplicitGetters & TExplicitGetterMethods & TExplicitMutations;

class LoadingState {
  loadingStatus: TLoadingStatus = 'not-started';

  reset() {
    this.loadingStatus = 'not-started';
  }

  get isLoading() {
    return this.loadingStatus === 'loading';
  }

  get isLoaded() {
    return this.loadingStatus === 'done';
  }
}


// const contr: TStateControllerFor<LoadingState>;
// const draftConf: TDraftConfigFor<LoadingState>;
// const methods: PickMethods<typeof draftConf>;
// methods.reset()
// contr.setLoadingStatus('not-started');
// contr.metadata
// draftConf
// contr.state


type GetHeuristicGetterName<TPropName> = TPropName extends string ? `${'get'|'is'|'should'|'will'}${Capitalize<TPropName>}` : never;

export type PickHeuristicGetters<TDraftConfig> = {
  [K in keyof TDraftConfig as GetHeuristicGetterName<K>]: (value: TDraftConfig[K]) => unknown
}

export type TStateControllerFor<
  TConfigCreator,
  TDraftConfig = TDraftConfigFor<TConfigCreator>,
  TState = PickDefaultState<TDraftConfig>,
  > =
  ModuleStateController &
  TState &
  { state: TState} &
  PickAutogeneratedMutations<TState> &
  PickMethods<TDraftConfig> &
  Exclude<TDraftConfig, keyof TStateConfig>


type GetSetterName<TPropName> = TPropName extends string ? `set${Capitalize<TPropName>}` : never;

export type PickDefaultState<TDraftConfig> = TDraftConfig extends { state: infer TState } ? TState : WritablePart<TDraftConfig>;

export type PickAutogeneratedMutations<TState> = {
  [K in keyof TState as GetSetterName<K>]: (value: TState[K]) => unknown
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
