import produce from 'immer';
import {
  Scope, generateId, Subject, Dict, defineGetter, capitalize,
} from './scope';
import { traverseClassInstance } from './traverseClassInstance';
import { Provider } from './scope/provider';

export class Store {

  state = {
    modules: {} as Dict<IStateMetadata>,
  };

  scope!: Scope;
  isMutationRunning = false;
  // modulesRevisions: Record<string, number> = {};
  watchers = new StoreWatchers();
  isReady = true;
  onReady = new Subject<boolean>();

  setIsReady(isReady: boolean) {
    this.isReady = isReady;
    this.onReady.next(isReady);
  }

  createState<TConfig extends TStateConfig>
  (config: TConfig): TStateControllerFor<TConfig> {
    const stateName = config.name;

    if (this.state.modules[stateName]) {
      throw new Error(`State with a name "${stateName}" is already created`);
    }

    const controller = {} as any;
    const defaultState = config.state;
    const metadata: IStateMetadata = {
      rev: 0,
      config,
      value: clone(defaultState),
      draftState: null,
      controller,
      mutations: {},
    };

    this.state.modules[stateName] = metadata;

    // move state getters to the state controller level
    Object.keys(defaultState).forEach(propName => {
      defineGetter(controller, propName, () => controller.state[propName]);
    });

    // define state getter
    const store = this;
    defineGetter(controller, 'state', () => {
      if (store.isRecordingAccessors) {
        store.recordedAccessors[stateName] = metadata.rev;
      }
      return metadata.draftState || metadata.value;
    });

    // autogenerate mutations
    this.generateMutations(stateName);

    // register mutations
    traverseClassInstance(controller, (propName, descriptor) => {
      if (propName === 'state') return;
      if (propName.startsWith('get')) return;
      if (descriptor.get) return;
      const mutationMethod = (controller as any)[propName];
      if (typeof mutationMethod !== 'function') return;

      store.registerMutation(stateName, propName, mutationMethod);
    });

    return controller;
  }

  registerMutation(stateName: string, mutationName: string, mutationMethod: Function) {
    const state = this.state.modules[stateName];
    const store = this;
    state.mutations[mutationName] = mutationMethod;

    // override the original Module method to dispatch mutations
    (state.controller)[mutationName] = function (...args: any[]) {
      // if this method was called from another mutation
      // we don't need to dispatch a new mutation again
      // just call the original method
      if (store.isMutationRunning) return mutationMethod.apply(module, args);
      const mutation = {
        id: Number(generateId()),
        payload: args,
        stateName,
        mutationName,
      };
      store.execMutation(mutation);
    };
  }

  generateMutations(stateName: string) {
    const state = this.state.modules[stateName];
    Object.keys(state.config.state).forEach(propertyName => {
      const mutationName = `set${capitalize(propertyName)}`;
      const mutationMethod = (val: unknown) => state.controller.state[propertyName] = val;
      this.registerMutation(stateName, mutationName, mutationMethod);
    });
  }

  execMutation(mutation: Mutation) {
    const { stateName, mutationName } = mutation;
    const store = this;
    const state = this.state.modules[stateName];
    state.value = produce(state.value, (draftState: any) => {
      store.isMutationRunning = true;
      state.draftState = draftState;
      console.log('RUN MUTATION', stateName, mutationName, mutation.payload);
      state.mutations[mutationName].apply(state.controller, mutation.payload);
      state.rev++;
    });
    state.draftState = null;
    store.isMutationRunning = false;
    this.watchers.run();
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
    delete this.state.modules[stateName];
  }

  isRecordingAccessors = false;

  recordedAccessors: Record<string, number> = {};

  runAndSaveAccessors(cb: Function) {
    this.isRecordingAccessors = true;
    cb();
    const result = this.recordedAccessors;
    this.isRecordingAccessors = false;
    this.recordedAccessors = {};
    return result;
  }

  currentContext: Record<string, Scope> = {};

  setModuleContext(moduleName: string, scope: Scope) {
    this.currentContext[moduleName] = scope;
  }

  resetModuleContext(moduleName: string) {
    delete this.currentContext[moduleName];
  }
}


class StoreWatchers {
  watchers = {} as Record<string, Function>;

  watchersOrder = [] as string[];

  create(cb: Function) {
    const watcherId = generateId();
    this.watchersOrder.push(watcherId);
    this.watchers[watcherId] = cb;
    return watcherId;
  }

  remove(watcherId: string) {
    const ind = this.watchersOrder.findIndex(id => watcherId === id);
    this.watchersOrder.splice(ind, 1);
    delete this.watchers[watcherId];
  }

  run() {
    const watchersIds = [...this.watchersOrder];
    watchersIds.forEach(id => this.watchers[id] && this.watchers[id]());
  }
}

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

// export function getModuleMutations(module: any): Record<string, Function> {
//   const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
//   const mutations: Record<string, Function> = {};
//   mutationNames.forEach(mutationName => {
//     mutations[mutationName] = module[mutationName];
//   });
//   return mutations;
// }

export interface Mutation {
  id: number;
  stateName: string;
  mutationName: string;
  payload: any;
}

/**
 * use immerjs API to clone the object
 */
export function clone<T>(state: T) {
  return produce(state, draft => {});
}

export const defaultStateConfig: Partial<TStateConfig> = {
  state: {},
  persistent: false,
  autogenerateMutations: true,
};

export type TStateConfig = {
  state: any,
  name: string,
  persistent?: boolean,
  autogenerateMutations?: boolean,
}

export interface IStateMetadata {
  value: any;
  draftState: any;
  rev: number;
  config: TStateConfig;
  controller: any;
  mutations: Dict<Function>;
  provider?: Provider<any>;
}

export type TStateControllerFor<TConfig extends TStateConfig>
  = TConfig['state'] & PickGeneratedMutations<TConfig> & Omit<TConfig, keyof TStateConfig>;

type GetSetterName<TPropName> = TPropName extends string ? `set${Capitalize<TPropName>}` : never;

export type PickGeneratedMutations<TConfig extends TStateConfig> = {
  [K in keyof TConfig['state'] as GetSetterName<K>]: (value: TConfig['state'][K]) => unknown
}

// const myState = {
//   state: {
//     myVal: 0,
//   },
// };
//
// const cont: TStateControllerFor<typeof myState> = null as any;
// cont.setMyVal()
