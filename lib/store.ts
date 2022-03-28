import produce from 'immer';
import {
  Scope, generateId, Dict, defineGetter, capitalize, createConfig, defineSetter,
} from './scope';
import { getDescriptors, traverse } from './traverse';
import { createNanoEvents } from 'nanoevents';

/**
 * All React related code should be handled in ReactAdapter
 * Framework agnostic store
 */
export class Store {

  // keeps the state for all modules here as a map of immutable objects
  rootState = { } as Dict<any>;

  // keeps additional metadata
  modulesMetadata = { } as Dict<StatefulModule>;

  // scope!: Scope;
  currentMutation: Mutation | null = null;
  moduleRevisions: Dict<number> = {};
  // isReady = true;
  // onReady = new Subject<boolean>();
  //
  // setIsReady(isReady: boolean) {
  //   this.isReady = isReady;
  //   this.onReady.next(isReady);
  // }

  createState<TConfigCreator extends TStateConfigCreator>(stateName: string, configCreator: TConfigCreator): TStateControllerFor<TConfigCreator> {

    if (this.modulesMetadata[stateName]) {
      throw new Error(`State with a name "${stateName}" is already created`);
    }

    const config = createConfig(configCreator);


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
    const defaultState = getDefaultStateFromConfig(config);

    // use immer to create an immutable state
    store.rootState[stateName] = produce(defaultState, () => {});

    // create metadata
    const controller = this;
    const metadata: StatefulModule = {
      config,
      controller,
      rev: 0,
      mutations: {},
    };
    store.modulesMetadata[stateName] = metadata;

    // find and register other mutations and getters
    traverse(config, (propName, descriptor) => {

      // generate getters
      if (propName in defaultState) {
        defineGetter(controller, propName, () => controller.state[propName]);
        defineSetter(controller, propName, val => {
          controller.state[propName] = val;
          return true;
        });
        return;
      }

      // register state getters
      if (descriptor.get) {
        defineGetter(controller, propName, descriptor.get);
        return;
      }

      // register getter functions
      if (propName.startsWith('get')) {
        defineGetter(controller, propName, descriptor.value);
        return;
      }

      // register mutations
      this.registerMutation(propName, (config as any)[propName]);
    });

    // create auto-generated mutations
    Object.keys(config).forEach(propertyName => {
      const mutationName = `set${capitalize(propertyName)}`;
      if (metadata.mutations[mutationName]) return;

      const mutationMethod = (propVal: unknown) => (controller as any)[propertyName] = propVal;
      controller.registerMutation(mutationName, mutationMethod);
    });

    // bulk state update mutation
    controller.registerMutation('updateState', (statePatch: object) => Object.assign(controller, statePatch));
  }

  registerMutation(mutationName: string, mutationMethod: Function) {
    const controller = this;
    const { store, stateName, metadata } = controller;

    metadata.mutations[mutationName] = mutationMethod;

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
      const controller = this as any;
      // eslint-disable-next-line prefer-spread
      controller.metadata.mutations[mutationName].apply(controller, mutation.payload);
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

function getDefaultStateFromConfig(config: any) {
  const defaultState: Dict<any> = {};
  traverse(config, (propName, descr) => {
    if (descr.get) return;
    const propVal = descr.value;
    if (typeof propVal === 'function') return;
    defaultState[propName] = propVal;
  });
  return defaultState;
}

// TODO remove
/**
 * A decorator that registers the object method as an mutation
 */
export function mutation() {
  return function (target: any, methodName: string) {
    target.mutations = target.mutations || [];
    // mark the method as an mutation
    target.mutations.push(methodName);
  };
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

export type TStateConfigCreator = (new (...args: any) => TStateConfig) | TStateConfig

export type TStateConfig = {
  // persistent?: boolean, // TODO
  // persistentKeys?: boolean, // TODO
  // autogenerateMutations?: boolean, // TODO
}

export interface StatefulModule {
  rev: number;
  config: TStateConfig;
  controller: ModuleStateController;
  mutations: Dict<Function>;
}

// todo refactor

export type TConfigFor<TConfigCreator> =
  TConfigCreator extends new (...args: any) => infer TConfig ?
    TConfig extends TStateConfig ? TConfig : never
    : TConfigCreator extends TStateConfig ? TConfigCreator : never;

export type TStateConfigFor<TConfigCreator> =
  TConfigCreator extends new (...args: any) => infer TConfig ?
    TConfig extends TStateConfig ? TConfig : never
     : TConfigCreator extends TStateConfig ? TConfigCreator : never;

// export type TStateControllerFor<TConfigCreator, TConfig = TStateConfigFor<TConfigCreator>>
//   = TConfig extends TStateConfig ?
//     TConfig['state'] &
//     PickGeneratedMutations<TConfig> &
//     Omit<TConfig, keyof TStateConfig> &
//     TGenericStateController
//   : never

export type TStateControllerFor<TConfigCreator, TConfig = TStateConfigFor<TConfigCreator>>
  = TConfig extends TStateConfig ?
  WritablePart<TConfig> &
  ModuleStateController &
  PickGeneratedMutations<TConfig> &
  Omit<TConfig, keyof TStateConfig>
  : never

type GetSetterName<TPropName> = TPropName extends string ? `set${Capitalize<TPropName>}` : never;

export type PickGeneratedMutations<TConfig extends TStateConfig> = {
  [K in keyof TConfig as GetSetterName<K>]: (value: TConfig[K]) => unknown
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
