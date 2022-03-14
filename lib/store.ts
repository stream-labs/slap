import produce, { enableMapSet } from 'immer';
import {
  Scope, generateId, Subject, Dict,
} from './scope';
import { traverseClassInstance } from './traverseClassInstance';
import { Provider } from './scope/provider';

enableMapSet();



export class Store {

  state = {
    modules: {} as Dict<IState>,
  };

  scope!: Scope;
  isMutationRunning = false;
  modulesRevisions: Record<string, number> = {};
  watchers = new StoreWatchers();
  isReady = true;
  onReady = new Subject<boolean>();

  setIsReady(isReady: boolean) {
    this.isReady = isReady;
    this.onReady.next(isReady);
  }

  createState<T extends TStateControllerConstructor>
  (stateName: string, StateControllerClass: T, extraState: Object = {}): TStateControllerFor<InstanceType<T>> {
    const controller = new StateControllerClass();
    const defaultState = { ...controller.state, ...extraState };
    const state: IState = {
      rev: 0,
      value: clone(defaultState),
      draftState: null,
      controller,
      mutations: {},
    };
    this.state.modules[stateName] = state;

    // move state getters to the state controller level
    Object.keys(defaultState).forEach(propName => {
      Object.defineProperty(controller, propName, {
        get() {
          return controller.state[propName];
        },
        enumerable: true,
      });
    });

    // define state getter
    const store = this;
    Object.defineProperty(controller, 'state', {
      get() {
        if (store.isRecordingAccessors) {
          store.recordedAccessors[stateName] = state.rev;
        }
        return state.draftState || state.value;
      },
      enumerable: true,
    });

    // register mutations
    traverseClassInstance(controller, (propName, descriptor) => {
      if (propName === 'state') return;
      if (propName.startsWith('get')) return;
      if (descriptor.get) return;
      const mutationMethod = (controller as any)[propName];
      if (typeof mutationMethod !== 'function') return;

      store.registerMutation(stateName, propName, mutationMethod);
    });
    return controller as TStateControllerFor<InstanceType<T>>;
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

  createModuleState<T extends TStateControllerConstructor>(provider: Provider<any>, StateControllerClass: T) {
    const stateName = `${provider.name}__${provider.scope.id}`;
    const isLoaded = provider.isLoaded;
    const stateController = this.createState(stateName, StateControllerClass, { isLoaded });
    if (isLoaded) return stateController;

    this.registerMutation(stateName, 'setModuleIsLoaded', () => {
      stateController.state.isLoaded = true;
    });
    provider.events.on('onModuleLoaded',() => stateController.setModuleIsLoaded());
    return stateController;
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

export function getModuleMutations(module: any): Record<string, Function> {
  const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
  const mutations: Record<string, Function> = {};
  mutationNames.forEach(mutationName => {
    mutations[mutationName] = module[mutationName];
  });
  return mutations;
}

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

export type TStateControllerInstance = { state: any }
export type TStateControllerConstructor = new (...args: any[]) => TStateControllerInstance;

export type TStateControllerFor<TStateDescr extends TStateControllerInstance>
  = TStateDescr['state'] & TStateDescr;

export interface IState {
  value: any;
  draftState: any;
  rev: number;
  controller: any;
  mutations: Dict<Function>;
  provider?: Provider<any>;
}
