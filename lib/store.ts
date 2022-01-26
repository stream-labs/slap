import {
  configureStore, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { batch, useSelector as useReduxSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { Store } from 'redux';
import { useOnCreate } from './hooks';
import { isSimilar } from './isDeepEqual';
import { traverseClassInstance } from './traverseClassInstance';
import { useModuleManager } from './useModule';

/*
 * This file provides Redux integration in a modular way
 */

// INITIALIZE REDUX STORE

function createReduxStore(appId: string) {
  const modulesSlice = createSlice({
    name: 'modules',
    initialState: {
      appId,
    },
    reducers: {
      initModule: (state, action) => {
        const { moduleName, contextId, initialState } = action.payload;
        const moduleId = moduleName + '_' + contextId;
        (state as any)[moduleId] = initialState;
      },
      destroyModule: (state, action) => {
        const { moduleName, contextId } = action.payload;
        const moduleId = moduleName + '_' + contextId;
        delete (state as any)[moduleId];
      },
      mutateModule: (state, action) => {
        const {
          moduleName, contextId, methodName, args,
        } = action.payload;
        const moduleManager = getModuleManager(appId);
        const module = moduleManager.getModule(moduleName, contextId);
        moduleManager.setImmerState(state);
        (module as any)[methodName](...args);
        moduleManager.setImmerState(null);
      },
    },
  });

  const store = configureStore({
    reducer: {
      modules: modulesSlice.reducer,
    },
  });

  const { actions } = modulesSlice;

  return { store, modulesSlice, actions };
}

/**
 * ReduxModuleManager helps to organize code splitting with help of Redux Modules
 * Each Redux Module controls its own chunk of state in the global Redux store
 * Redux Modules are objects that contain initialState, actions, mutations and getters
 */
export class ReduxModuleManager {
  public immerState: any;

  registeredModules: Record<string, Record<string, IReduxModuleMetadata>> = {};

  currentContext: Record<string, string> = {};

  actions: any;

  constructor(public store: Store, public modulesSlice: any, public appId: string) {
    this.actions = modulesSlice.actions;
  }

  /**
   * Register a new Redux Module and initialize it
   * @param module the module object
   * @param initParams params that will be passed in the `.init()` handler after initialization
   */
  registerModule<TInitParams>(
    ModuleClass: any,
    initParams?: TInitParams,
    moduleName = '',
    isService = false,
    contextId = 'default',
  ) {
    // use constructor name as a module name if other name not provided
    moduleName = moduleName || ModuleClass.prototype.constructor.name;

    const shouldInitialize = !isService;

    // create a record in `registeredModules` with the newly created module
    if (!this.registeredModules[moduleName]) this.registeredModules[moduleName] = {};
    this.registeredModules[moduleName][contextId] = {
      contextId,
      moduleName,
      componentIds: [],
      module: undefined,
      watchers: [],
      initParams,
      isService,
      ModuleClass,
    };

    if (shouldInitialize) this.initModule(moduleName, contextId);

    return this.registeredModules[moduleName][contextId];
  }

  initModule(moduleName: string, contextId: string): void {
    // call `init()` method of module if exist
    unstable_batchedUpdates(() => {
      const { ModuleClass, initParams } = this.registeredModules[moduleName][contextId];
      const module = new ModuleClass();
      this.registeredModules[moduleName][contextId].module = module as any;
      module.name = moduleName;
      module.init && module.init(initParams);
      const initialState = module.state;

      // replace module methods with mutation calls
      replaceMethodsWithMutations(module, contextId, this.appId);

      // prevent usage of destroyed modules
      catchDestroyedModuleCalls(module);

      const moduleManager = moduleManagers[this.appId];

      // Re-define the `state` variable of the module
      // It should be linked to the global Redux state after module initialization
      // But when mutation is running it should be linked to a special Proxy from the Immer library
      Object.defineProperty(module, 'state', {
        get: () => {
          // prevent accessing state on destroyed module
          if (!moduleManager.getModule(moduleName, contextId)) {
            throw new Error('ReduxModule_is_destroyed');
          }
          const moduleId = moduleName + '_' + contextId;
          if (this.immerState) return this.immerState[moduleId];
          const globalState = this.store.getState() as any;
          return globalState.modules[moduleId];
        },
        set: (newState: unknown) => {
          const isMutationRunning = !!this.immerState;
          if (!isMutationRunning) throw new Error('Can not change the state outside of mutation');
          const moduleId = moduleName + '_' + contextId;
          this.immerState[moduleId] = newState;
        },
      });

      // call the `initModule` mutation to initialize the module's initial state
      this.store.dispatch(this.actions.initModule({ moduleName, contextId, initialState }));
    });
  }

  /**
     * Unregister the module and erase its state from Redux
     */
  unregisterModule(moduleName: string, contextId: string) {
    const module = this.getModule(moduleName, contextId);
    module.destroy && module.destroy();
    this.store.dispatch(this.actions.destroyModule({ moduleName, contextId }));
    delete this.registeredModules[moduleName][contextId];
  }

  registerServices<T extends { [key: string]: new (...args: any) => any }>
  (serviceClasses: T): TInstances<T> {
    const moduleManager = this;

    const result = {};

    Object.keys(serviceClasses).forEach(serviceName => {
      const serviceClass = serviceClasses[serviceName];
      moduleManager.registerModule(serviceClass as any, null, '', true, 'service');
      Object.defineProperty(result, serviceName, {
        get: () => {
          const service = moduleManager.getService(serviceName);
          return service;
        },
      });
    });

    return result as TInstances<T>;

    // return new Proxy(
    // {} as TInstances<T>,
    // {
    //   get(target, propName, receiver) {
    //     return moduleManager.getModule(propName as string, 'service');
    //   },
    // },
    // );
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
      console.log('Should init module', moduleName);
      this.initModule(moduleName, contextId);
      return this.registeredModules[serviceName][contextId].module;
    }
    console.log('Should NOT init module', moduleName, module);
    return module;
  }

  // /**
  //  * Get the Module by name for the current context
  //  * Create the module if not exist
  //  */
  // getModuleForCurrentContext<TModule extends IReduxModule<any, any>>(ModuleClass: any, moduleName: string): TModule {
  //   const contextId = this.currentContext[moduleName] || 'default';
  //   const module = this.getModule(moduleName, contextId);
  //   if (!module) {
  //     const moduleMetadata = moduleManager.registerModule(ModuleClass, initParams, moduleName);
  //     if (moduleMetadata.module) {
  //       module = moduleMetadata.module;
  //     } else {
  //       module = moduleManager.initModule(moduleName, contextId);
  //     }
  //   }
  //
  //   return this.getModule(moduleName, contextId);
  // }

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

  /**
     * When Redux is running mutation it replaces the state object with a special Proxy object from
     * the Immer library. Keep this object in the `immerState` property
     */
  setImmerState(immerState: unknown) {
    this.immerState = immerState;
  }

  /**
     * Run watcher functions registered in modules
     */
  runWatchers() {
    Object.keys(this.registeredModules).forEach((moduleName) => {
      Object.keys(this.registeredModules[moduleName]).forEach(contextId => {
        const { watchers } = this.registeredModules[moduleName][contextId];
        watchers.forEach((watcher) => {
          const newVal = watcher.selector();
          const prevVal = watcher.prevValue;
          watcher.prevValue = newVal;
          if (newVal !== prevVal) {
            watcher.onChange(newVal, prevVal);
          }
        });
      });
    });
  }

  setModuleContext(moduleName: string, contextId: string) {
    this.currentContext[moduleName] = contextId;
  }

  resetModuleContext(moduleName: string) {
    delete this.currentContext[moduleName];
  }
}

const moduleManagers: Record<string, ReduxModuleManager> = {};

export function createModuleManager() {
  const appId = generateId();

  // create ReduxStore
  const { store, modulesSlice } = createReduxStore(appId);

  // create the ModuleManager and
  // automatically register some additional modules
  const moduleManager = new ReduxModuleManager(store, modulesSlice, appId);

  moduleManagers[appId] = moduleManager;

  // add a BatchedUpdatesModule for rendering optimizations
  moduleManager.registerModule(BatchedUpdatesModule, { appId }, 'BatchedUpdatesModule');

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
  // if (!moduleManager) {
  //   // create the ModuleManager and
  //   // automatically register some additional modules
  //   moduleManager = createModuleManager();
  //
  //   // add a BatchedUpdatesModule for rendering optimizations
  //   moduleManager.registerModule(BatchedUpdatesModule, null, 'BatchedUpdatesModule');
  // }
  // return moduleManager;
}

/**
 * This module introduces a simple implementation of batching updates
 * for the performance optimization
 * It prevents components from being re-rendered in a not-ready state
 * and reduces an overall amount of redundant re-renderings
 *
 * React 18 introduced automated batched updates.
 * So most likely we can remove this module after the migration to the new version of React
 * https://github.com/reactwg/react-18/discussions/21
 */
class BatchedUpdatesModule {
  state = {
    appId: '',
    isRenderingDisabled: false,
  };

  init(params: { appId: string }) {
    this.state.appId = params.appId;
  }

  /**
     * Temporary disables rendering for components when multiple mutations are being applied
     */
  temporaryDisableRendering() {
    // if rendering is already disabled just ignore
    if (this.state.isRenderingDisabled) return;

    // disable rendering
    this.setIsRenderingDisabled(true);

    const appId = this.state.appId;

    // enable rendering again when Javascript processes the current queue of tasks
    setTimeout(() => {
      this.setIsRenderingDisabled(false);
      getModuleManager(appId).runWatchers();
    });
  }

  @mutation()
  private setIsRenderingDisabled(disabled: boolean) {
    this.state.isRenderingDisabled = disabled;
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

function replaceMethodsWithMutations(module: IReduxModule<unknown, unknown>, contextId: string, appId: string) {
  const moduleName = getDefined(module.name);
  const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
  const moduleManager = moduleManagers[appId];

  mutationNames.forEach((mutationName) => {
    const originalMethod = (module as any)[mutationName];

    // override the original Module method to dispatch mutations
    (module as any)[mutationName] = function (...args: any[]) {
      // if this method was called from another mutation
      // we don't need to dispatch a new mutation again
      // just call the original method
      const mutationIsRunning = !!moduleManager.immerState;
      if (mutationIsRunning) return originalMethod.apply(module, args);

      // prevent accessing state on deleted module
      if (!moduleManager.getModule(moduleName, contextId)) {
        throw new Error('ReduxModule_is_destroyed');
      }

      const batchedUpdatesModule = moduleManager.getModule<BatchedUpdatesModule>(
        'BatchedUpdatesModule',
        'default',
      );

      // clear unserializable events from arguments
      args = args.map((arg) => {
        const isReactEvent = arg && arg._reactName;
        if (isReactEvent) return { _reactName: arg._reactName };
        return arg;
      });

      // dispatch reducer and call `temporaryDisableRendering()`
      // so next mutation in the javascript queue
      // will not cause redundant re-renderings in components
      batch(() => {
        if (moduleName !== 'BatchedUpdatesModule') batchedUpdatesModule.temporaryDisableRendering();
        moduleManager.store.dispatch(moduleManager.actions.mutateModule({
          moduleName, contextId, methodName: mutationName, args,
        }));
      });
    };
  });
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

/**
 * This `useSelector` is a wrapper for the original `useSelector` method from Redux
 * - Optimizes component re-rendering via batched updates from Redux and Vuex
 * - Uses isDeepEqual with depth 2 as a default comparison function
 */
export function useSelector<T extends Object>(fn: () => T): T {
  const moduleManager = useModuleManager();
  const batchedUpdatesModule = moduleManager.getModule<BatchedUpdatesModule>(
    'BatchedUpdatesModule',
    'default',
  );
  const cachedSelectedResult = useRef<any>(null);
  const isMountedRef = useRef(false);

  // save the selector function and update it each component re-rendering
  // this prevents having staled closure variables in the selector
  const selectorFnRef = useRef(fn);
  selectorFnRef.current = fn;

  // create the selector function
  const selector = useOnCreate(() => () => {
    // if `isRenderingDisabled=true` selector will return previously cached values
    if (batchedUpdatesModule.state.isRenderingDisabled && isMountedRef.current) {
      return cachedSelectedResult.current;
    }

    // otherwise execute the selector
    cachedSelectedResult.current = selectorFnRef.current();
    return cachedSelectedResult.current;
  });

  useEffect(() => {
    isMountedRef.current = true;
  });

  return useReduxSelector(selector, (prevState, newState) => {
    // there is no reason to compare prevState and newState if
    // the rendering is disabled for components
    if (batchedUpdatesModule.state.isRenderingDisabled) {
      return true;
    }

    // use `isSimilar` function to compare 2 states
    if (!isSimilar(prevState, newState)) {
      return false;
    }
    return true;
  }) as T;
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

// export function getModule<T extends new (...args: any) => any>(ModuleClass: T, contextId = 'default'): InstanceType<T> {
//   const moduleManager = getModuleManager();
//   const moduleName = ModuleClass.prototype.constructor.name;
//   let moduleMetadata = moduleManager.registeredModules[moduleName][contextId];
//   if (!moduleMetadata) {
//     moduleMetadata = moduleManager.registerModule(ModuleClass);
//   }
//   if (!moduleMetadata.module) {
//     return moduleManager.initModule(moduleName, contextId);
//   }
//   return moduleMetadata.module as any;
// }
//
// export function getService<T extends new (...args: any) => any>(ModuleClass: T): InstanceType<T> {
//   return getModule(ModuleClass, 'service');
// }

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

interface IReduxModuleMetadata {
  moduleName: string;
  componentIds: string[];
  initParams: any;
  module?: IReduxModule<any, any>;
  ModuleClass?: any;
  watchers: IWatcher<unknown>[];
  isService: boolean;
  contextId: string;
}

let idCounter = 1;
export function generateId() {
  return (idCounter++).toString();
}

type TInstances<T extends { [key: string]: new (...args: any) => any }> = {
  [P in keyof T]: InstanceType<T[P]>;
};
