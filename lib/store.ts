import {
  configureStore, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { batch, useSelector as useReduxSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { useOnCreate } from './hooks';
import { isSimilar } from './isDeepEqual';
import { traverseClassInstance } from './traverseClassInstance';

/*
 * This file provides Redux integration in a modular way
 */

// INITIALIZE REDUX STORE

export const modulesSlice = createSlice({
  name: 'modules',
  initialState: {},
  reducers: {
    initModule: (state, action) => {
      const { moduleName, initialState } = action.payload;
      (state as any)[moduleName] = initialState;
    },
    destroyModule: (state, action: PayloadAction<string>) => {
      const moduleName = action.payload;
      delete (state as any)[moduleName];
    },
    mutateModule: (state, action) => {
      const { moduleName, methodName, args } = action.payload;
      const moduleManager = getModuleManager();
      const module = getModuleManager().getModule(moduleName);
      moduleManager.setImmerState(state);
      (module as any)[methodName](...args);
      moduleManager.setImmerState(null);
    },
  },
});

export const store = configureStore({
  reducer: {
    modules: modulesSlice.reducer,
  },
});

const { actions } = modulesSlice;

/**
 * ReduxModuleManager helps to organize code splitting with help of Redux Modules
 * Each Redux Module controls its own chunk of state in the global Redux store
 * Redux Modules are objects that contain initialState, actions, mutations and getters
 */
class ReduxModuleManager {
  public immerState: any;

  registeredModules: Record<string, IReduxModuleMetadata> = {};

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
  ) {
    // use constructor name as a module name if other name not provided
    moduleName = moduleName || ModuleClass.prototype.constructor.name;

    const shouldInitialize = !isService;

    // create a record in `registeredModules` with the newly created module
    this.registeredModules[moduleName] = {
      componentIds: [],
      module: undefined,
      watchers: [],
      initParams,
      isService,
      ModuleClass,
    };

    if (shouldInitialize) this.initModule(moduleName);
    return this.registeredModules[moduleName];
  }

  initModule(moduleName: string): any {
    // call `init()` method of module if exist
    unstable_batchedUpdates(() => {
      const { ModuleClass, initParams } = this.registeredModules[moduleName];
      const module = new ModuleClass();
      this.registeredModules[moduleName].module = module as any;
      module.name = moduleName;
      module.init && module.init(initParams);
      const initialState = module.state;

      // replace module methods with mutation calls
      replaceMethodsWithMutations(module);

      // prevent usage of destroyed modules
      catchDestroyedModuleCalls(module);

      // Re-define the `state` variable of the module
      // It should be linked to the global Redux state after module initialization
      // But when mutation is running it should be linked to a special Proxy from the Immer library
      Object.defineProperty(module, 'state', {
        get: () => {
          // prevent accessing state on destroyed module
          if (!moduleManager.getModule(moduleName)) {
            throw new Error('ReduxModule_is_destroyed');
          }
          if (this.immerState) return this.immerState[moduleName];
          const globalState = store.getState() as any;
          return globalState.modules[moduleName];
        },
        set: (newState: unknown) => {
          const isMutationRunning = !!this.immerState;
          if (!isMutationRunning) throw new Error('Can not change the state outside of mutation');
          this.immerState[moduleName] = newState;
        },
      });

      // call the `initModule` mutation to initialize the module's initial state
      store.dispatch(modulesSlice.actions.initModule({ moduleName, initialState }));
    });

    return module;
  }

  /**
     * Unregister the module and erase its state from Redux
     */
  unregisterModule(moduleName: string) {
    const module = this.getModule(moduleName);
    module.destroy && module.destroy();
    store.dispatch(actions.destroyModule(moduleName));
    delete this.registeredModules[moduleName];
  }

  /**
     * Get the Module by name
     */
  getModule<TModule extends IReduxModule<any, any>>(moduleName: string): TModule {
    return this.registeredModules[moduleName]?.module as TModule;
  }

  /**
     * Register a component that is using the module
     */
  registerComponent(moduleName: string, componentId: string) {
    this.registeredModules[moduleName].componentIds.push(componentId);
  }

  /**
     * Un-register a component that is using the module.
     * If the module doesnt have registered components it will be destroyed
     */
  unRegisterComponent(moduleName: string, componentId: string) {
    const moduleMetadata = this.registeredModules[moduleName];
    moduleMetadata.componentIds = moduleMetadata.componentIds.filter((id) => id !== componentId);
    if (!moduleMetadata.componentIds.length) this.unregisterModule(moduleName);
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
      const { watchers } = this.registeredModules[moduleName];
      watchers.forEach((watcher) => {
        const newVal = watcher.selector();
        const prevVal = watcher.prevValue;
        watcher.prevValue = newVal;
        if (newVal !== prevVal) {
          watcher.onChange(newVal, prevVal);
        }
      });
    });
  }
}

let moduleManager: ReduxModuleManager;

/**
 * The ModuleManager is a singleton object accessible in other files
 * via the `getModuleManager()` call
 */
export function getModuleManager() {
  if (!moduleManager) {
    // create the ModuleManager and
    // automatically register some additional modules
    moduleManager = new ReduxModuleManager();

    // add a BatchedUpdatesModule for rendering optimizations
    moduleManager.registerModule(BatchedUpdatesModule, null, 'BatchedUpdatesModule');
  }
  return moduleManager;
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
    isRenderingDisabled: false,
  };

  /**
     * Temporary disables rendering for components when multiple mutations are being applied
     */
  temporaryDisableRendering() {
    // if rendering is already disabled just ignore
    if (this.state.isRenderingDisabled) return;

    // disable rendering
    this.setIsRenderingDisabled(true);

    // enable rendering again when Javascript processes the current queue of tasks
    setTimeout(() => {
      this.setIsRenderingDisabled(false);
      moduleManager.runWatchers();
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

function replaceMethodsWithMutations(module: IReduxModule<unknown, unknown>) {
  const moduleName = getDefined(module.name);
  const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];

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
      if (!moduleManager.getModule(moduleName)) {
        throw new Error('ReduxModule_is_destroyed');
      }

      const batchedUpdatesModule = moduleManager.getModule<BatchedUpdatesModule>(
        'BatchedUpdatesModule',
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
        store.dispatch(actions.mutateModule({ moduleName, methodName: mutationName, args }));
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
  const moduleManager = getModuleManager();
  const batchedUpdatesModule = moduleManager.getModule<BatchedUpdatesModule>(
    'BatchedUpdatesModule',
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

export function getModule<T extends new (...args: any) => any>(ModuleClass: T): InstanceType<T> {
  const moduleManager = getModuleManager();
  const moduleName = ModuleClass.prototype.constructor.name;
  let moduleMetadata = moduleManager.registeredModules[moduleName];
  if (!moduleMetadata) {
    moduleMetadata = moduleManager.registerModule(ModuleClass);
  }
  if (!moduleMetadata.module) {
    return moduleManager.initModule(moduleName);
  }
  return moduleMetadata.module as any;
}

export function getService<T extends new (...args: any) => any>(ModuleClass: T): InstanceType<T> {
  return getModule(ModuleClass);
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
) {
  const moduleName = getDefined(module.name);
  const moduleMetadata = moduleManager.registeredModules[moduleName];
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
  componentIds: string[];
  initParams: any;
  module?: IReduxModule<any, any>;
  ModuleClass?: any;
  watchers: IWatcher<unknown>[];
  isService: boolean;
}
