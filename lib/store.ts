import produce from 'immer';
import { traverseClassInstance } from './traverseClassInstance';
import { IModuleMetadata } from './module-manager';
import {
  assertInjectIsAllowed, getCurrentScope, injectScope, Scope, TModuleClass,
  generateId, Subject,
} from './scope';

export class Store {
  state = {
    modules: {} as Record<string, Record<string, any>>,
  };

  scope = injectScope();

  isMutationRunning = false;

  modulesRevisions: Record<string, number> = {};

  immerState: any = null;

  watchers = new StoreWatchers();

  modulesMetadata: Record<string, Record<string, IModuleMetadata>> = {};

  init() {
    Object.keys(this.scope.registry).forEach(moduleName => {
      if (moduleName === 'Store') return;
      this.createModuleMetadata(moduleName, this.scope.id);
    });

    this.scope.events.on('onModuleRegister', moduleInfo => {
      this.createModuleMetadata(moduleInfo.name, this.scope.id);
    });

    this.scope.events.on('onModuleInit', moduleInfo => {
      if (moduleInfo.name === 'Store') return;
      const instance = moduleInfo.instance as any;
      const scopeId = moduleInfo.scope.id;
      const metadata = this.getModuleMetadata(moduleInfo.factory, scopeId) || this.createModuleMetadata(moduleInfo.name, scopeId);
      metadata.instance = instance;
      const stateDescriptor = Object.getOwnPropertyDescriptor(instance, 'state');
      const isStatefull = stateDescriptor && !stateDescriptor.get && !instance.state?._isStateProxy;
      if (!isStatefull) return;

      this.initModule(instance, metadata.moduleName, scopeId);
    });
  }

  initModule(module: any, moduleName: string, contextId: string, state?: any) {
    this.state.modules[moduleName] = state || {};
    this.state.modules[moduleName][contextId] = module.state;
    this.modulesRevisions[moduleName + contextId] = 1;
    const store = this;

    Object.defineProperty(module, 'state', {
      get: () => {
        // prevent accessing state on destroyed module
        if (!store.state.modules[moduleName][contextId]) {
          throw new Error('Module_is_destroyed');
        }
        if (store.isRecordingAccessors) {
          const revision = store.modulesRevisions[moduleName + contextId];
          this.recordedAccessors[moduleName + contextId] = revision;
        }
        return store.isMutationRunning ? this.immerState : store.state.modules[moduleName][contextId];
      },
      set: (newState: unknown) => {
        if (!store.isMutationRunning) throw new Error('Can not change the state outside of mutation');
      },
    });

    this.replaceMethodsWithMutations(module, moduleName, contextId);
    // catchDestroyedModuleCalls(module);
  }

  destroyModule(moduleName: string, contextId: string) {
    delete this.state.modules[moduleName][contextId];
    if (!Object.keys(this.state.modules[moduleName])) {
      delete this.state.modules[moduleName];
    }
  }

  setBulkState(bulkState: Record<string, any>) {
    const scopeId = this.scope.id;
    Object.keys(bulkState).forEach(moduleName => {
      const module = this.scope.resolve(moduleName);
      this.initModule(module, moduleName, scopeId, bulkState[moduleName]);
    });
  }

  getBulkState() {
    const state: Record<string, any> = {};
    const scopeId = this.scope.id;
    Object.keys(this.state.modules).forEach(moduleName => {
      state[moduleName] = this.state.modules[moduleName][scopeId];
    });
    return state;
  }

  mutateModule(moduleName: string, contextId: string, mutation: Function) {
    mutation();
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

  private createModuleMetadata(moduleName: string, scopeId: string) {
    console.log('create module metadata for', moduleName, scopeId);

    if (!this.modulesMetadata[moduleName]) {
      this.modulesMetadata[moduleName] = {};
    }
    // eslint-disable-next-line no-multi-assign
    const metadata = this.modulesMetadata[moduleName][scopeId] = {
      scopeId,
      moduleName,
      instance: null,
      createView: null,
      view: null,
      componentIds: [],
      mutations: {},
      originalMutations: {},
    };
    return metadata!;
  }

  updateModuleMetadata(moduleName: string, scopeId: string, patch: Partial<IModuleMetadata>) {
    const metadata = this.modulesMetadata[moduleName][scopeId];
    return Object.assign(metadata, patch);
  }

  getModuleMetadata(ModuleClass: TModuleClass, scopeId: string): IModuleMetadata | null {
    const moduleName = ModuleClass.name;
    return this.modulesMetadata[moduleName] && this.modulesMetadata[moduleName][scopeId];
  }

  currentContext: Record<string, Scope> = {};

  setModuleContext(moduleName: string, scope: Scope) {
    this.currentContext[moduleName] = scope;
  }

  resetModuleContext(moduleName: string) {
    delete this.currentContext[moduleName];
  }

  replaceMethodsWithMutations(module: any, moduleName: string, contextId: string) {
    const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
    const store = this;
    const metadata = this.modulesMetadata[moduleName][contextId];

    mutationNames.forEach(mutationName => {
      const originalMethod = (module as any)[mutationName];
      metadata.originalMutations[mutationName] = originalMethod;

      // override the original Module method to dispatch mutations
      (module as any)[mutationName] = function (...args: any[]) {
        // if this method was called from another mutation
        // we don't need to dispatch a new mutation again
        // just call the original method
        if (store.isMutationRunning) return originalMethod.apply(module, args);
        store.mutate({ id: Number(generateId()), type: `${moduleName}.${mutationName}`, payload: args }, contextId);
      };
    });
  }

  mutate(mutation: Mutation, scopeId?: string) {
    scopeId = scopeId || this.scope.id;
    const [moduleName, methodName] = mutation.type.split('.');
    const store = this;
    const moduleState = store.state.modules[moduleName][scopeId];

    // prevent accessing state on deleted module
    if (!this.state.modules[moduleName][scopeId]) {
      throw new Error('Module_is_destroyed');
    }

    const moduleMetadata = store.modulesMetadata[moduleName][scopeId];
    const module = moduleMetadata.instance;

    const nextState = produce(moduleState, (draftState: any) => {
      store.isMutationRunning = true;
      store.immerState = draftState;
      console.log('run mutation', mutation.type);
      moduleMetadata.originalMutations[methodName].apply(module, mutation.payload);
      store.modulesRevisions[moduleName + scopeId]++;
    });
    store.immerState = null;
    store.state.modules[moduleName][scopeId] = nextState;
    store.isMutationRunning = false;
    store.onMutation.next(mutation);
    store.watchers.run();
  }

  onMutation = new Subject<Mutation>();
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

/**
 * Add try/catch that silently stops all method calls for a destroyed module
 */
// function catchDestroyedModuleCalls(module: any) {
//   // wrap each method in try/catch block
//   traverseClassInstance(module, (propName, descriptor) => {
//     // ignore getters
//     if (descriptor.get || typeof module[propName] !== 'function') return;
//
//     const originalMethod = module[propName];
//     module[propName] = (...args: unknown[]) => {
//       try {
//         return originalMethod.apply(module, args);
//       } catch (e: unknown) {
//         // silently stop execution if module is destroyed
//         if ((e as any).message !== 'Module_is_destroyed') throw e;
//       }
//     };
//   });
// }

/**
 * Makes all functions return a Promise and sets other types to never
 */
export type TPromisifyFunctions<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? TPromisifyFunction<T[P]> : never;
};

/**
 * Wraps the return type in a promise if it doesn't already return a promise
 */
export type TPromisifyFunction<T> = T extends (...args: infer P) => infer R
  ? T extends (...args: any) => Promise<any>
    ? (...args: P) => R
    : (...args: P) => Promise<R>
  : T;

export function injectState<TModuleClass extends new (...args: any) => any>(StatefulModule: TModuleClass): InstanceType<TModuleClass>['state'] {
  assertInjectIsAllowed();
  const module = getCurrentScope()!.resolve(StatefulModule);
  const proxy = { _isStateProxy: true };
  Object.keys(module.state).forEach(stateKey => {
    Object.defineProperty(proxy, stateKey, {
      configurable: true,
      enumerable: true,
      get() {
        return module.state[stateKey];
      },
    });
  });
  return proxy;
}

export interface Mutation {
  id: number;
  type: string;
  payload: any;
}
