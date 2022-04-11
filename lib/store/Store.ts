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
  rootState = { } as Dict<Dict<any>>;

  // keeps additional metadata
  modulesMetadata = { } as Dict<Dict<StatefulModuleMetadata>>;

  currentMutation: Mutation | null = null;
  moduleRevisions: Dict<number> = {};

  createState<TConfigCreator>(moduleName: string, sectionName: string, configCreator: TConfigCreator): TStateControllerFor<TConfigCreator> {

    if (this.modulesMetadata[moduleName] && this.modulesMetadata[sectionName]) {
      throw new Error(`State with a name "${moduleName}" is already created`);
    }

    const config = parseStateConfig(configCreator);

    console.log('REGISTER STORE', moduleName, sectionName);
    const controller = new ModuleStateController(this, moduleName, sectionName, config);

    return controller as TStateControllerFor<TConfigCreator>;
  }

  dispatchMutation(mutation: Mutation) {
    console.log('RUN MUTATION', mutation);
    const moduleName = mutation.moduleName;
    const sectionName = mutation.sectionName;
    const metadata = this.modulesMetadata[moduleName];
    if (!metadata) return; // state is destroyed

    const stateController = this.modulesMetadata[moduleName][sectionName].controller;

    if (this.currentMutation) {
      throw new Error('Can not run mutation while previous mutation is not completed');
    }

    this.currentMutation = mutation;
    stateController.applyMutation(mutation);
    this.currentMutation = null;

    // trigger subscribed components to re-render
    if (!mutation.silent) this.events.emit('onMutation', mutation, this);
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

  destroyModule(moduleName: string) {
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

  getMetadata(moduleName: string, sectionName: string) {
    return this.modulesMetadata[moduleName] && this.modulesMetadata[moduleName][sectionName];
  }

  getController(moduleName: string, sectionName: string) {
    return this.getMetadata(moduleName, sectionName)?.controller;
  }

  events = createNanoEvents<StoreEvents>();
}

export interface StoreEvents {
  onMutation: (mutation: Mutation, store: Store) => void
  onAfterMutations: (store: Store) => void
}

export class ModuleStateController {

  draftState: any = null;

  constructor(
    public store: Store,
    public moduleName: string,
    public sectionName: string,
    config: TStateConfig,
  ) {
    const defaultState = config.state;

    // use immer to create an immutable state
    if (!store.rootState[moduleName]) store.rootState[moduleName] = {};
    store.rootState[moduleName][sectionName] = produce(defaultState, () => {});

    // create metadata
    const controller = this;
    const metadata: StatefulModuleMetadata = {
      config,
      controller,
      rev: 0,
    };
    if (!store.modulesMetadata[moduleName]) store.modulesMetadata[moduleName] = {};
    store.modulesMetadata[moduleName][sectionName] = metadata;

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

    // create other mutations
    Object.keys(config.mutations).forEach(propName => {
      this.registerMutation(propName, config.mutations[propName]);
    });

    // define bulk non-reactive state mutation
    const nonReactiveUpdate = 'nonReactiveUpdate';
    config.mutations[nonReactiveUpdate] = (statePatch: object) => Object.assign(controller, statePatch);
    controller.registerMutation('nonReactiveUpdate', config.mutations[nonReactiveUpdate], true);
  }

  registerMutation(mutationName: string, mutationMethod: Function, silent = false) {
    const controller = this;
    const { store, moduleName, sectionName } = controller;

    // override the original Module method to dispatch mutations
    (controller as any)[mutationName] = function (...args: any[]) {
      // if this method was called from another mutation
      // we don't need to dispatch a new mutation again
      // just call the original method
      if (store.currentMutation) {
        if (store.currentMutation.moduleName !== moduleName) {
          const parentMutation = store.currentMutation;
          const parentMutationName = `${parentMutation.moduleName}_${parentMutation.mutationName}`;
          const childMutationName = `${moduleName}_${mutationName}`;

          // TODO should we really prevent that?
          console.warn(`Can not run a mutation of another module. Call ${parentMutationName} from ${childMutationName}`);
        }
        return mutationMethod.apply(controller, args);
      }

      const mutation = {
        id: Number(generateId()),
        payload: args,
        moduleName,
        sectionName,
        mutationName,
        silent,
      };
      store.dispatchMutation(mutation);
    };
  }

  applyMutation(mutation: Mutation) {
    const moduleName = mutation.moduleName;
    const sectionName = mutation.sectionName;
    const mutationName = mutation.mutationName;
    const state = this.store.rootState[moduleName][sectionName];

    this.store.rootState[moduleName][sectionName] = produce(state, (draft: unknown) => {
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
    const moduleName = this.moduleName;
    const sectionName = this.sectionName;

    if (store.recordingAccessors) {
      store.affectedModules[moduleName + '__' + sectionName] = this.metadata.rev;
    }

    return store.rootState[moduleName][sectionName];
  }

  // TODO remove
  set state(val: any) {
    console.log('set state ', val);
    throw new Error('Trying to set state');
  }

  get metadata() {
    return this.store.modulesMetadata[this.moduleName][this.sectionName];
  }

  createView() {
    const metadata = this.metadata;
    const config = metadata.config;
    const view = new StateView();
    const controller = this as any;

    view.defineProp({
      type: 'StateRev',
      name: 'getRev',
      reactive: false,
      getValue: () => {
        // eslint-disable-next-line no-unused-expressions
        controller.state; // read as reactive
        return metadata.rev;
      },
    });

    traverse(config.state, stateKey => {
      view.defineProp({
        type: 'StateProp',
        name: stateKey,
        reactive: true,
        getValue: () => controller[stateKey],
      });
    });

    traverse(config.mutations, stateKey => {
      view.defineProp({
        type: 'StateMutation',
        name: stateKey,
        reactive: false,
        getValue: () => controller[stateKey],
      });
    });

    traverse(config.getters, (propName) => {
      view.defineProp({
        type: 'StateGetter',
        name: propName,
        reactive: true,
        getValue: () => controller[propName],
      });
    });

    traverse(config.getterMethods, (propName) => {
      view.defineProp({
        type: 'StateGetterMethod',
        name: propName,
        reactive: false,
        getValue: () => controller[propName],
      });
    });

    return view;
  }

}

export interface Mutation {
  id: number;
  moduleName: string;
  sectionName: string;
  mutationName: string;
  payload: any;
  silent?: boolean;
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

// const contr: TStateControllerFor<LoadingState>;
// const draftConf: TDraftConfigFor<LoadingState>;
// const methods: PickMethods<typeof draftConf>;
// methods.reset()
// contr.setLoadingStatus('not-started');
// contr.metadata
// draftConf
// contr.state

export type GetHeuristicGetterName<TPropName> = TPropName extends string ? `${'get'|'is'|'should'|'will'}${Capitalize<TPropName>}` : never;

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
  { state: TState, nonReactiveUpdate: (patch: Partial<TState>) => unknown} &
  Omit<PickAutogeneratedMutations<TState>, keyof PickMethods<TDraftConfig>> &
  PickMethods<TDraftConfig> &
  Exclude<TDraftConfig, keyof TStateConfig>

export type TStateViewForStateConfig<TConfigCreator> = Omit<TStateControllerFor<TConfigCreator>, 'state'>;

export type GetSetterName<TPropName> = TPropName extends string ? `set${Capitalize<TPropName>}` : never;

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
