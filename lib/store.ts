import produce from 'immer';
import { traverseClassInstance } from './traverseClassInstance';

export class ReactiveStore {
  constructor(public readonly storeId: string) {
  }

  state = {
    storeId: this.storeId,
    modules: {} as Record<string, Record<string, any>>,
  };


  isMutationRunning = false;

  modulesRevisions: Record<string, number> = {};

  immerState: any = null;

  initModule(module: any, moduleName: string, contextId: string) {
    if (!this.state.modules[moduleName]) this.state.modules[moduleName] = {};
    this.state.modules[moduleName][contextId] = module.state;
    const store = this;

    Object.defineProperty(module, 'state', {
      get: () => {
        // prevent accessing state on destroyed module
        if (!store.state.modules[moduleName][contextId]) {
          throw new Error('ReduxModule_is_destroyed');
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
    catchDestroyedModuleCalls(module);
  }

  destroyModule(moduleName: string, contextId: string) {
    delete this.state.modules[moduleName][contextId];
    if (!Object.keys(this.state.modules[moduleName])) {
      delete this.state.modules[moduleName];
    }
  }

  mutateModule(moduleName: string, contextId: string, mutation: Function) {
    mutation();
  }


  watchers = {} as Record<string, Function>;

  watchersOrder = [] as string[];

  createWatcher(cb: Function) {
    const watcherId = generateId();
    this.watchersOrder.push(watcherId);
    this.watchers[watcherId] = cb;
    return watcherId;
  }

  removeWatcher(watcherId: string) {
    const ind = this.watchersOrder.findIndex(id => watcherId);
    this.watchersOrder.splice(ind, 1);
    delete this.watchers[watcherId];
  }

  runWatchers() {
    const watchersIds = [...this.watchersOrder];
    watchersIds.forEach(id => this.watchers[id] && this.watchers[id]());
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

  replaceMethodsWithMutations(module: any, moduleName: string, contextId: string) {
    const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
    const store = this;

    mutationNames.forEach(mutationName => {
      const originalMethod = (module as any)[mutationName];

      // override the original Module method to dispatch mutations
      (module as any)[mutationName] = function (...args: any[]) {
        // if this method was called from another mutation
        // we don't need to dispatch a new mutation again
        // just call the original method
        if (store.isMutationRunning) return originalMethod.apply(module, args);

        // prevent accessing state on deleted module
        if (!store.state.modules[moduleName][contextId]) {
          throw new Error('Module_is_destroyed');
        }

        const nextState = produce(module.state, (draftState: any) => {
          store.isMutationRunning = true;
          store.immerState = draftState;
          console.log('run mutation', mutationName);
          originalMethod.apply(module, args);
          store.modulesRevisions[moduleName + contextId]++;
        });
        store.immerState = null;
        store.state.modules[moduleName][contextId] = nextState;
        store.isMutationRunning = false;
        store.runWatchers();
      };
    });
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
function catchDestroyedModuleCalls(module: any) {
  // wrap each method in try/catch block
  traverseClassInstance(module, (propName, descriptor) => {
    // ignore getters
    if (descriptor.get || typeof module[propName] !== 'function') return;

    const originalMethod = module[propName];
    module[propName] = (...args: unknown[]) => {
      try {
        return originalMethod.apply(module, args);
      } catch (e: unknown) {
        // silently stop execution if module is destroyed
        if ((e as any).message !== 'ReduxModule_is_destroyed') throw e;
      }
    };
  });
}

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

export function getDefined<T>(val: T): NonNullable<T> {
  assertIsDefined(val);
  return val;
}

let idCounter = 1;
export function generateId() {
  return (idCounter++).toString();
}

export type TInstances<T extends { [key: string]: new (...args: any) => any }> = {
  [P in keyof T]: InstanceType<T[P]>;
};

export type GetInjectReturnType<Type> = Type extends new (...args: any) => any
  ? InstanceType<Type>
  : Type extends { [key: string]: new (...args: any) => any } ? TInstances<Type> :
    never;
export type TInjector = <T>(injectedObject: T) => GetInjectReturnType<T>

export type TModuleConstructor = new (...args: any) => any;
export type TModuleConstructorMap = { [key: string]: TModuleConstructor }

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

type TModuleManagerHooks = {
  onModuleRegister(context: any): void;
  onModuleInit(context: any): void;
  onModuleDestroy(context: any): void;
  onMutation(context: any): void;
  onMethod(context: any): void;
}
