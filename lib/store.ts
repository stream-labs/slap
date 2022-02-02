import { isPlainObject } from 'is-plain-object';
import produce from 'immer';
import { traverseClassInstance } from './traverseClassInstance';

export class ReactiveStore {
  constructor(public readonly storeId: string) {
  }

  state = {
    storeId: this.storeId,
    modules: {} as Record<string, Record<string, any>>,
  };

  initModule(moduleName: string, contextId: string, initialState: any) {
    if (!this.state.modules[moduleName]) this.state.modules[moduleName] = {};
    this.state.modules[moduleName][contextId] = initialState;
  }

  destroyModule(moduleName: string, contextId: string) {
    delete this.state.modules[moduleName][contextId];
  }

  mutateModule(moduleName: string, contextId: string, mutation: Function) {
    mutation();
  }
}

/**
 * ReduxModuleManager helps to organize code splitting with help of Redux Modules
 * Each Redux Module controls its own chunk of state in the global Redux store
 * Redux Modules are objects that contain initialState, actions, mutations and getters
 */
export class ReduxModuleManager {
  registeredModules: Record<string, Record<string, IReduxModuleMetadata>> = {};

  currentContext: Record<string, string> = {};

  isMutationRunning = false;

  isRecordingAccessors = false;

  recordedAccessors: Record<string, number> = {};

  modulesRevisions: Record<string, number> = {};

  constructor(public store: ReactiveStore, public plugins: any[] = []) {}

  /**
   * Register a new Redux Module and initialize it
   * @param module the module object
   * @param initParams params that will be passed in the `.init()` handler after initialization
   */
  registerModule<TInitParams>(
    ModuleClass: any,
    initParams?: TInitParams,
    moduleName = '',
    contextId = 'default',
  ) {
    // use constructor name as a module name if other name not provided
    moduleName = moduleName || ModuleClass.prototype.constructor.name;
    const isService = contextId === 'service';
    const shouldInitialize = !isService;

    // create a record in `registeredModules` with the newly created module
    if (!this.registeredModules[moduleName]) this.registeredModules[moduleName] = {};
    this.registeredModules[moduleName][contextId] = {
      contextId,
      moduleName,
      componentIds: [],
      module: undefined,
      view: null,
      watchers: [],
      initParams,
      isService,
      ModuleClass,
    };
    this.modulesRevisions[moduleName + contextId] = 1;

    if (shouldInitialize) this.initModule(moduleName, contextId);

    return this.registeredModules[moduleName][contextId];
  }

  initModule(moduleName: string, contextId: string): void {
    const { ModuleClass, initParams } = this.registeredModules[moduleName][contextId];
    const module = new ModuleClass(this);
    this.registeredModules[moduleName][contextId].module = module as any;
    module.name = moduleName;

    module.beforeInit && module.beforeInit(this);
    module.init && module.init(initParams);
    const initialState = module.state;

    this.store.initModule(moduleName, contextId, initialState);
    const moduleManager = this;

    Object.defineProperty(module, 'state', {
      get: () => {
        // prevent accessing state on destroyed module
        if (!moduleManager.getModule(moduleName, contextId)) {
          throw new Error('ReduxModule_is_destroyed');
        }
        if (moduleManager.isRecordingAccessors) {
          const revision = moduleManager.modulesRevisions[moduleName + contextId];
          this.recordedAccessors[moduleName + contextId] = revision;
        }
        return moduleManager.isMutationRunning ? this.immerState : moduleManager.store.state.modules[moduleName][contextId];
      },
      set: (newState: unknown) => {
        if (!moduleManager.isMutationRunning) throw new Error('Can not change the state outside of mutation');
      },
    });

    // // replace module methods with mutation calls
    this.replaceMethodsWithMutations(module, contextId);

    // prevent usage of destroyed modules
    catchDestroyedModuleCalls(module);
  }

  /**
     * Unregister the module and erase its state from Redux
     */
  unregisterModule(moduleName: string, contextId: string) {
    const module = this.getModule(moduleName, contextId);
    module.destroy && module.destroy();
    this.store.destroyModule(moduleName, contextId);
    delete this.registeredModules[moduleName][contextId];
  }

  registerServices<T extends TServiceConstructorMap>
  (serviceClasses: T): TInstances<T> {
    Object.keys(serviceClasses).forEach(serviceName => {
      const serviceClass = serviceClasses[serviceName];
      this.registerModule(serviceClass as any, null, '', 'service');
    });
    return this.inject(serviceClasses);
  }

  runAndSaveAccessors(cb: Function) {
    this.isRecordingAccessors = true;
    cb();
    const result = this.recordedAccessors;
    this.isRecordingAccessors = false;
    this.recordedAccessors = {};
    return result;
  }

  /**
   * Get the Module by name
   */
  getModule<TModule extends IReduxModule<any, any>>(moduleName: string, contextId: string): TModule {
    return this.registeredModules[moduleName]?.[contextId]?.module as TModule;
  }

  /**
   * Get the Service by name
   * Initialized the service if not initialized
   */
  getService(serviceName: string) {
    const serviceMetadata = this.registeredModules[serviceName].service;
    if (!serviceMetadata) throw new Error(`Service "${serviceName}" is not found. Is it registered?`);
    const { moduleName, contextId, module } = serviceMetadata;
    const shouldInit = !module;
    if (shouldInit) {
      this.initModule(moduleName, contextId);
      return this.registeredModules[serviceName][contextId].module;
    }
    return module;
  }

  inject<T>(injectedObject: T): GetInjectReturnType<T> {
    if (isPlainObject(injectedObject)) {
      return this.injectManyServices(injectedObject as any) as GetInjectReturnType<T>;
    }
    return this.injectOneService(injectedObject as any) as GetInjectReturnType<T>;
  }

  private injectOneService<
    TServiceClass extends new (...args: any) => any
    >(ServiceClass: TServiceClass): InstanceType<TServiceClass> {
    const serviceName = ServiceClass.name;

    let serviceMetadata = this.registeredModules[serviceName]?.service;
    if (!serviceMetadata) {
      serviceMetadata = this.registerModule(ServiceClass, null, '', 'service');
      // throw new Error(`Service "${serviceName}" is not found. Is it registered?`);
    }

    const { moduleName, contextId, module } = serviceMetadata;
    const shouldInit = !module;
    if (shouldInit) {
      this.initModule(moduleName, contextId);
      return this.registeredModules[serviceName][contextId].module as any as InstanceType<TServiceClass>;
    }
    return module as any as InstanceType<TServiceClass>;
  }

  injectModule<
    TModuleClass extends new (
...args: any) => any
    >(ModuleClass: TModuleClass,
    isService = false,
    createView?: (module: InstanceType<TModuleClass>) => any,
  ) {
    const moduleName = ModuleClass.name;
    const contextId = isService ? 'service' : this.currentContext[moduleName] || 'default';

    let moduleMetadata = this.registeredModules[moduleName]?.service;
    if (!moduleMetadata) {
      moduleMetadata = this.registerModule(ModuleClass, null, '', contextId);
    }

    let { module } = moduleMetadata;
    const shouldInit = !module;
    if (shouldInit) {
      this.initModule(moduleName, contextId);
      moduleMetadata = this.registeredModules[moduleName][contextId];
      module = moduleMetadata.module as any as InstanceType<TModuleClass>;
    }
    if (createView && !moduleMetadata.view) {
      moduleMetadata.view = createView(module as any);
    }
    return moduleMetadata;
  }

  private injectManyServices<T extends { [key: string]: new (...args: any) => any }>
  (serviceClasses: T): TInstances<T> {
    const result = {};
    Object.keys(serviceClasses).forEach(serviceName => {
      const serviceClass = serviceClasses[serviceName];
      Object.defineProperty(result, serviceName, {
        get: () => {
          return this.injectOneService(serviceClass);
        },
      });
    });
    return result as TInstances<T>;
  }

  /**
     * Register a component that is using the module
     */
  registerComponent(moduleName: string, contextId: string, componentId: string) {
    this.registeredModules[moduleName][contextId].componentIds.push(componentId);
  }

  /**
     * Un-register a component that is using the module.
     * If the module doesnt have registered components it will be destroyed
     */
  unRegisterComponent(moduleName: string, contextId: string, componentId: string) {
    const moduleMetadata = this.registeredModules[moduleName][contextId];
    moduleMetadata.componentIds = moduleMetadata.componentIds.filter((id) => id !== componentId);
    if (!moduleMetadata.componentIds.length) this.unregisterModule(moduleName, contextId);
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

  replaceMethodsWithMutations(module: IReduxModule<unknown, unknown>, contextId: string) {
    const moduleName = getDefined(module.name);
    const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
    const moduleManager = this;

    mutationNames.forEach(mutationName => {
      const originalMethod = (module as any)[mutationName];

      // override the original Module method to dispatch mutations
      (module as any)[mutationName] = function (...args: any[]) {
        // if this method was called from another mutation
        // we don't need to dispatch a new mutation again
        // just call the original method
        if (moduleManager.isMutationRunning) return originalMethod.apply(module, args);

        // prevent accessing state on deleted module
        if (!moduleManager.getModule(moduleName, contextId)) {
          throw new Error('Module_is_destroyed');
        }

        const nextState = produce(module.state, draftState => {
          moduleManager.isMutationRunning = true;
          moduleManager.immerState = draftState;
          console.log('run mutation', mutationName);
          originalMethod.apply(module, args);
          moduleManager.modulesRevisions[moduleName + contextId]++;
        });
        moduleManager.immerState = null;
        moduleManager.store.state.modules[moduleName][contextId] = nextState;
        moduleManager.isMutationRunning = false;
        moduleManager.runWatchers();
      };
    });
  }

  immerState: any = null;

  // /**
  //    * Run watcher functions registered in modules
  //    */
  // runWatchers() {
  //   Object.keys(this.registeredModules).forEach((moduleName) => {
  //     Object.keys(this.registeredModules[moduleName]).forEach(contextId => {
  //       const { watchers } = this.registeredModules[moduleName][contextId];
  //       watchers.forEach((watcher) => {
  //         const newVal = watcher.selector();
  //         const prevVal = watcher.prevValue;
  //         watcher.prevValue = newVal;
  //         if (newVal !== prevVal) {
  //           watcher.onChange(newVal, prevVal);
  //         }
  //       });
  //     });
  //   });
  // }

  setModuleContext(moduleName: string, contextId: string) {
    this.currentContext[moduleName] = contextId;
  }

  resetModuleContext(moduleName: string) {
    delete this.currentContext[moduleName];
  }
}

const moduleManagers: Record<string, ReduxModuleManager> = {};

// TODO: remove
(window as any).mm = moduleManagers;

export function createModuleManager(Services?: TServiceConstructorMap, plugins?: TModuleManagerHooks[]) {
  const appId = generateId();

  // create ReactiveStore
  const store = new ReactiveStore(appId);

  // create the ModuleManager and
  // automatically register some additional modules
  const moduleManager = new ReduxModuleManager(store);

  moduleManagers[appId] = moduleManager;

  if (Services) moduleManager.registerServices(Services);

  return moduleManager;
}

export function destroyModuleManager(appId: string) {
  delete moduleManagers[appId];
}

/**
 * The ModuleManager is a singleton object accessible in other files
 * via the `getModuleManager()` call
 */
export function getModuleManager(appId: string) {
  return moduleManagers[appId];
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

// function replaceMethodsWithMutations(module: IReduxModule<unknown, unknown>, contextId: string, appId: string) {
//   const moduleName = getDefined(module.name);
//   const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
//   const moduleManager = moduleManagers[appId];
//
//   mutationNames.forEach((mutationName) => {
//     const originalMethod = (module as any)[mutationName];
//
//     // override the original Module method to dispatch mutations
//     (module as any)[mutationName] = function (...args: any[]) {
//       // if this method was called from another mutation
//       // we don't need to dispatch a new mutation again
//       // just call the original method
//       const mutationIsRunning = !!moduleManager.immerState;
//       if (mutationIsRunning) return originalMethod.apply(module, args);
//
//       // prevent accessing state on deleted module
//       if (!moduleManager.getModule(moduleName, contextId)) {
//         throw new Error('ReduxModule_is_destroyed');
//       }
//
//       const batchedUpdatesModule = moduleManager.getModule<BatchedUpdatesModule>(
//         'BatchedUpdatesModule',
//         'default',
//       );
//
//       // clear unserializable events from arguments
//       args = args.map((arg) => {
//         const isReactEvent = arg && arg._reactName;
//         if (isReactEvent) return { _reactName: arg._reactName };
//         return arg;
//       });
//
//       // dispatch reducer and call `temporaryDisableRendering()`
//       // so next mutation in the javascript queue
//       // will not cause redundant re-renderings in components
//       batch(() => {
//         if (moduleName !== 'BatchedUpdatesModule') batchedUpdatesModule.temporaryDisableRendering();
//         moduleManager.store.dispatch(moduleManager.actions.mutateModule({
//           moduleName, contextId, methodName: mutationName, args,
//         }));
//       });
//     };
//   });
// }

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

/**
 * Wraps the given object in a Proxy for watching read operations on this object
 *
 * @example
 *
 * const myObject = { foo: 1, bar: 2, qux: 3};
 * const { watcherProxy, getDependentFields } = createDependencyWatcher(myObject);
 * const { foo, bar } = watcherProxy;
 * getDependentFields(); // returns ['foo', 'bar'];
 *
 */
export function createDependencyWatcher<T extends object>(watchedObject: T) {
  const dependencies: Record<string, any> = {};
  const watcherProxy = new Proxy(
    {
      _proxyName: 'DependencyWatcher',
      _watchedObject: watchedObject,
      _dependencies: dependencies,
    },
    {
      get: (target, propName: string) => {
        // if (propName === 'hasOwnProperty') return watchedObject.hasOwnProperty;
        if (propName in target) return (target as any)[propName];
        const value = (watchedObject as any)[propName];
        dependencies[propName] = value;
        return value;
        // }
      },
    },
  ) as T;

  function getDependentFields() {
    return Object.keys(dependencies);
  }

  function getDependentValues(): Partial<T> {
    const values: Partial<T> = {};
    Object.keys(dependencies).forEach((propName) => {
      const value = dependencies[propName];
      // if one of the dependencies is a Binding then expose its internal dependencies
      if (value && value._proxyName === 'Binding') {
        const bindingMetadata = value._binding;
        Object.keys(bindingMetadata.dependencies).forEach((bindingPropName) => {
          (values as any)[`${bindingPropName}__binding-${bindingMetadata.id}`] = dependencies[propName][bindingPropName].value;
        });
        return;
      }
      // if it's not a Binding then just take the value from the watchedObject
      (values as any)[propName] = (watchedObject as any)[propName];
    });
    return values;
  }

  return { watcherProxy, getDependentFields, getDependentValues };
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

/**
 * Watch changes on a reactive state in the module
 */
export function watch<T>(
  module: IReduxModule<any, any>,
  selector: () => T,
  onChange: (newVal: T, prevVal: T) => unknown,
  contextId: string,
  appId: string,
) {
  const moduleName = getDefined(module.name);
  const moduleMetadata = moduleManagers[appId].registeredModules[moduleName][contextId];
  moduleMetadata.watchers.push({
    selector,
    // @ts-ignore
    onChange,
    prevValue: selector(),
  });
}

interface IWatcher<T> {
  selector: () => T;
  onChange: (newVal: T, prevVal: T) => unknown;
  prevValue: T;
}

export interface IReduxModule<TInitParams, TState> {
  state: TState;
  name?: string;
  init?: (initParams: TInitParams) => unknown;
  destroy?: () => unknown;
}

export interface IReduxModuleMetadata {
  moduleName: string;
  componentIds: string[];
  initParams: any;
  module?: IReduxModule<any, any>;
  view: any,
  ModuleClass?: any;
  watchers: IWatcher<unknown>[];
  isService: boolean;
  contextId: string;
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

export type TServiceConstructor = new (...args: any) => any;
export type TServiceConstructorMap = { [key: string]: TServiceConstructor }

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
