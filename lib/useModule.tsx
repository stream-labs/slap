import { useContext, useMemo, useRef } from 'react';
import { ReactReduxContext } from 'react-redux';
import * as module from 'module';
import { useOnCreate, useOnDestroy, useComponentId } from './hooks';
import {
  IReduxModule,
  getModuleManager,
  useSelector,
  createDependencyWatcher,
  GetInjectReturnType,
  TPromisifyFunctions,
} from './store';
import { merge, TMerge, TMerge3 } from './merge';
import { lockThis } from './lockThis';
import { createViewWithActions } from './createStateView';

/**
 * A hook for using ReduxModules in components
 *
 * @example 1
 * // get module instance in the component
 * const myModule = useModule(MyModule)
 *
 * // use Redux to select reactive props from the module
 * const { foo } = useSelector(() => ({ foo: myModule.foo }))
 *
 * @example 2
 * // same as example 1 but with one-liner syntax
 * const { foo } = useModule(MyModule).select()
 *
 * @example 3
 * // same as example 2 but with a computed prop
 * const { foo, fooBar } = useModule(MyModule)
 *  .selectExtra(module => { fooBar: module.foo + module.bar  }))
 */
// function useModuleContext<
//   TInitParams,
//   TState,
//   TModuleClass extends new(...args: any[]) => IReduxModule<TInitParams, TState>,
//   TReturnType extends InstanceType<TModuleClass> & {
//     select: () => InstanceType<TModuleClass> &
//       InstanceType<TModuleClass>['state'] & { module: InstanceType<TModuleClass> };
//
//     selectExtra: <TComputedProps>(
//       fn: (module: InstanceType<TModuleClass>) => TComputedProps,
//     ) => InstanceType<TModuleClass> & TComputedProps & { module: InstanceType<TModuleClass> };
//   }
// >(ModuleClass: TModuleClass, initParams?: TInitParams, moduleName = '', isService = false): TReturnType {
//   const computedPropsFnRef = useRef<null | Function>(null);
//   const computedPropsRef = useRef<any>({});
//   const dependencyWatcherRef = useRef<any>(null);
//   const componentId = useComponentId();
//   const moduleManager = useModuleManager();
//   moduleName = moduleName || ModuleClass.name;
//
//   // register the component in the ModuleManager upon component creation
//   const {
//     module, select, selector, moduleContextId,
//   } = useOnCreate(() => {
//     // get existing module's instance or create a new one
//     const moduleContextId = isService ? 'service' : moduleManager.currentContext[moduleName] || 'default';
//
//     let module = moduleManager.getModule(moduleName, moduleContextId);
//     if (!module) {
//       const moduleMetadata = moduleManager.registerModule(ModuleClass, initParams, moduleName, false, moduleContextId);
//       if (moduleMetadata.module) {
//         module = moduleMetadata.module;
//       } else {
//         moduleManager.initModule(moduleName, moduleContextId);
//         module = moduleManager.getModule(moduleName, moduleContextId);
//       }
//     }
//
//     // register the component in the module
//     if (!isService) moduleManager.registerComponent(moduleName, moduleContextId, componentId);
//
//     // lockedModule is a copy of the module where all methods have a persistent `this`
//     // as if we called `module.methodName = module.methodName.bind(this)` for each method
//     const lockedModule = lockThis(module);
//
//     // calculate computed props that were passed via `.selectExtra()` call
//     // and save them in `computedPropsRef`
//     function calculateComputedProps() {
//       const compute = computedPropsFnRef.current;
//       if (!compute) return;
//       const computedProps = compute(module);
//       Object.assign(computedPropsRef.current, computedProps);
//       return computedPropsRef.current;
//     }
//
//     // Create a public `.select()` method that allows to select reactive state for the component
//     function select<TComputedProps>(
//       fn?: (module: InstanceType<TModuleClass>) => TComputedProps,
//     ): InstanceType<TModuleClass> & TComputedProps {
//       // create DependencyWatcher as a source of state to select from
//       if (!dependencyWatcherRef.current) {
//         // calculate computed props if the function provided
//         if (fn) {
//           computedPropsFnRef.current = fn;
//           calculateComputedProps();
//         }
//         // we have several sources of data to select from
//         // use `merge` function to join them into a single object
//         const mergedModule = merge(
//           // allow to select variables from the module's state
//           () => module.state,
//           // allow to select getters and actions from the module
//           () => lockedModule,
//           // allow to select computed props
//           () => computedPropsRef.current,
//           // allow to select the whole module itself
//           () => ({ module }),
//         );
//         dependencyWatcherRef.current = createDependencyWatcher(mergedModule);
//       }
//       return dependencyWatcherRef.current.watcherProxy;
//     }
//
//     // Create a Redux selector.
//     // Redux calls this method every time when component's dependencies have been changed
//     // eslint-disable-next-line no-shadow
//     function selector() {
//       // recalculate computed props
//       calculateComputedProps();
//       // select component's dependencies
//       return dependencyWatcherRef.current?.getDependentValues();
//     }
//
//     return {
//       module,
//       selector,
//       select,
//       moduleContextId,
//     };
//   });
//
//   // unregister the component from the module onDestroy
//   useOnDestroy(() => {
//     if (!isService) moduleManager.unRegisterComponent(moduleName, moduleContextId, componentId);
//   });
//
//   // call Redux selector to make selected props reactive
//   useSelector(selector);
//
//   // return Module with extra `select` method
//   // TODO: `.selectExtra()` is the same method as `.select()`
//   //  and it was added here only because of typing issues related
//   //  to multiple tsconfings in the project.
//   //  We should use only the `.select` after resolving typing issues
//   const mergeResult = merge(
//     () => module,
//     () => ({ select, selectExtra: select }),
//   );
//   return (mergeResult as unknown) as TReturnType;
// }

// /**
//  * Get the Redux module instance from the current React context
//  * Creates a new module instance if no instances exist
//  */
// export function useModule<
//   TState,
//   TModuleClass extends new(...args: any[]) => IReduxModule<unknown, TState>
// >(ModuleClass: TModuleClass) {
//   return useModuleContext(ModuleClass).select();
// }

// /**
//  * Create a Redux module instance with given params
//  */
// export function useModuleContextRoot<
//   TInitParams,
//   TState,
//   TModuleClass extends new(...args: any[]) => IReduxModule<TInitParams, TState>
// >(ModuleClass: TModuleClass, initParams?: TInitParams, moduleName = '', contextId = '') {
//   return useModuleContext(ModuleClass, initParams, moduleName, false);
// }
//
// /**
//  * Create a Redux module instance with given params
//  */
// export function useModuleRoot<
//   TInitParams,
//   TState,
//   TModuleClass extends new(...args: any[]) => IReduxModule<TInitParams, TState>
//   >(ModuleClass: TModuleClass, initParams?: TInitParams, moduleName = '') {
//   return useModuleContext(ModuleClass, initParams, moduleName).select();
// }

// /**
//  * same as useModule but locates a module by name instead of a class
//  */
// export function useModuleContextByName<TModule extends IReduxModule<any, any>>(
//   moduleName: string,
//   contextId: string,
// ): TUseModuleReturnType<TModule> {
//   const moduleManager = useModuleManager();
//   const module = moduleManager.getModule(moduleName, contextId);
//   if (!module) throw new Error(`Can not find module with name "${moduleName}" `);
//   return (useModuleContext(
//     module.constructor as new (...args: any[]) => IReduxModule<null, unknown>,
//     null,
//     moduleName,
//   ) as unknown) as TUseModuleReturnType<TModule>;
// }

export function useModuleManager() {
  const { store } = useContext(ReactReduxContext);
  return useMemo(() => {
    const { appId } = store.getState().modules;
    const moduleManager = getModuleManager(appId);
    return moduleManager;
  }, []);
}

export function useInject<T>(injectedObject: T): GetInjectReturnType<T> {
  return useModuleManager().inject(injectedObject);
}

// /**
//  * same as useModule but locates a module by name instead of a class
//  */
// export function useModuleByName(moduleName: string, contextId: string) {
//   return useModuleContextByName(moduleName, contextId).select();
// }

// export function useService<
//   TState,
//   TModuleClass extends new(...args: any[]) => IReduxModule<unknown, TState>
//   >(ModuleClass: TModuleClass) {
//   return useModuleContext(ModuleClass, null, '', true).select();
// }

// export function useServiceView<
//   TService extends { state: any, view: any },
//   TView extends TMerge3<TService['state'], TService, TService['view']>
//   >(ServiceClass: new(...args: any[]) => TService) {
//   const moduleManager = useModuleManager();
//
//   const {
//     selector,
//     dependencyWatcher,
//   } = useOnCreate(() => {
//     const service = moduleManager.inject(ServiceClass);
//     const serviceView = createView(service, service.view);
//
//     function select(cb: any) {
//       return selectFrom(serviceView, cb) as any;
//     }
//
//     // const select = (query: (view: TView) => any) => selectFrom(serviceView, query);
//     const result = merge(() => serviceView, () => ({ select }));
//     const dependencyWatcher = createDependencyWatcher(result);
//     const selector = () => (dependencyWatcher.getDependentValues());
//     return {
//       serviceView,
//       dependencyWatcher,
//       selector,
//       result,
//       select,
//     };
//   });
//
//   useSelector(selector as any);
//   return dependencyWatcher.watcherProxy as TView & {
//     select: <TComputedProps>(
//       fn: (module: TView) => TComputedProps,
//     ) => TView & TComputedProps
//   };
// }

// export function useModule<TModule, TState = TModule extends { state?: any } ? TModule['state'] : null,
//     >(ModuleClass: new(...args: any[]) => TModule) {
//   const moduleManager = useModuleManager();
//
//   const {
//     selector,
//     moduleView,
//     dependencyWatcher,
//   } = useOnCreate(() => {
//     const module = moduleManager.injectModule(ModuleClass);
//     // const moduleView = createModuleView(module) as TMerge<TModule['state'], TModule>;
//     const moduleView = createModuleView(module) as TMerge<TState, TModule>;
//     const dependencyWatcher = createDependencyWatcher(moduleView);
//     const selector = () => (dependencyWatcher.getDependentValues());
//     return {
//       moduleView,
//       dependencyWatcher,
//       selector,
//     };
//   });
//
//   // unregister the component from the module onDestroy
//   useOnDestroy(() => {
//     // if (!isService) moduleManager.unRegisterComponent(moduleName, moduleContextId, componentId);
//   });
//
//   useSelector(selector);
//   return dependencyWatcher.watcherProxy as typeof moduleView;
// }

// export function selectFrom<TSourceObject, TSelectResult>(sourceObject: TSourceObject, selectorFn: (sourceObj: TSourceObject) => TSelectResult): TMerge<TSourceObject, TSelectResult> {
//   const { selector, dependencyWatcher } = useOnCreate(() => {
//     const result = merge([sourceObject, () => selectorFn(sourceObject)]);
//     const dependencyWatcher = createDependencyWatcher(result);
//     const selector = () => (dependencyWatcher.getDependentValues());
//     return { selector, dependencyWatcher };
//   });
//
//   useSelector(selector as any);
//   return dependencyWatcher.watcherProxy as TMerge<TSourceObject, TSelectResult>;
// }

export type TModuleView<TModule extends Object, TState = TModule extends { state?: any } ? TModule['state'] : null> = TMerge<TState, TModule>;

export function createModuleView<TModule>(module: TModule): TModuleView<TModule> {
  const lockedModule = lockThis(module as any);
  const mergedModule = merge([
    // allow to select variables from the module's state
    () => (module as any).state,
    // allow to select getters and actions from the module
    lockedModule,
  ]);
  return mergedModule as any as TModuleView<TModule>;
}

  type TUseModuleReturnType<TModule extends IReduxModule<any, any>> = TModule & {
    select: () => TModule & TModule['state'] & { module: TModule };
  };
//
// export function useSelectFrom<TModuleView extends Object, TSelectorResult, TReturnType = TMerge<TModuleView, TSelectorResult>,
//   >(module: TModuleView, selectorFn?: (module: TModuleView) => TSelectorResult): TReturnType {
//   const computedPropsFnRef = useRef<null | Function>(null);
//   const computedPropsRef = useRef<any>({});
//   const dependencyWatcherRef = useRef<any>(null);
//   // register the component in the ModuleManager upon component creation
//   const { selector } = useOnCreate(() => {
//     // lockedModule is a copy of the module where all methods have a persistent `this`
//     // as if we called `module.methodName = module.methodName.bind(this)` for each method
//     const lockedModule = lockThis(module);
//
//     // calculate computed props that were passed via `.selectExtra()` call
//     // and save them in `computedPropsRef`
//     function calculateComputedProps() {
//       const compute = computedPropsFnRef.current;
//       if (!compute) return;
//       const computedProps = compute(module);
//       Object.assign(computedPropsRef.current, computedProps);
//       return computedPropsRef.current;
//     }
//
//     if (!dependencyWatcherRef.current) {
//       // calculate computed props if the function provided
//       if (selectorFn) {
//         computedPropsFnRef.current = selectorFn;
//         calculateComputedProps();
//       }
//       // we have several sources of data to select from
//       // use `merge` function to join them into a single object
//       const mergedModule = merge([
//         lockedModule,
//         // allow to select computed props
//         () => computedPropsRef.current,
//       ]);
//       dependencyWatcherRef.current = createDependencyWatcher(mergedModule);
//     }
//
//     // Create a Redux selector.
//     // Redux calls this method every time when component's dependencies have been changed
//     // eslint-disable-next-line no-shadow
//     function selector() {
//       // recalculate computed props
//       calculateComputedProps();
//       // select component's dependencies
//       return dependencyWatcherRef.current?.getDependentValues();
//     }
//
//     return { selector };
//   });
//
//   // call Redux selector to make selected props reactive
//   useSelector(selector);
//   return dependencyWatcherRef.current.watcherProxy;
// }

export function useSelectFrom<TModuleView extends Object, TExtendedView, TReturnType = TMerge<TModuleView, TExtendedView>,
  >(module: TModuleView, extend?: (module: TModuleView) => TExtendedView): TReturnType {
  // register the component in the ModuleManager upon component creation
  const { selector, dependencyWatcher } = useOnCreate(() => {
    const observableObject = extend ? merge([module, extend(module)]) : module;
    const dependencyWatcher = createDependencyWatcher(observableObject);

    function selector() {
      return dependencyWatcher.getDependentValues();
    }

    return { selector, dependencyWatcher };
  });

  // call Redux selector to make selected props reactive
  useSelector(selector as any);

  return dependencyWatcher.watcherProxy as any as TReturnType;
}

export function useModuleMetadata<TModule>
(ModuleClass: new(...args: any[]) => TModule, isService: boolean, createView: (module: TModule) => any) {
  const componentId = useComponentId();
  const moduleManager = useModuleManager();

  // register the component in the ModuleManager upon component creation
  const {
    moduleMetadata,
  } = useOnCreate(() => {
    const moduleMetadata = moduleManager.injectModule(ModuleClass, isService, createView);
    const moduleName = moduleMetadata.moduleName;

    const contextId = moduleMetadata.contextId;
    if (!isService) moduleManager.registerComponent(moduleName, contextId, componentId);

    return {
      moduleMetadata,
    };
  });

  // unregister the component from the module onDestroy
  useOnDestroy(() => {
    if (!isService) moduleManager.unRegisterComponent(moduleMetadata.moduleName, moduleMetadata.contextId, componentId);
  });

  return moduleMetadata;
}

export function useModule<
  TModule,
  TSelectorResult,
  TResult extends TMerge<TModuleView<TModule>, TSelectorResult>
  >
(ModuleClass: new(...args: any[]) => TModule, selectorFn: (view: TModuleView<TModule>) => TSelectorResult = () => ({} as TSelectorResult), isService = false): TResult {
  const moduleMetadata = useModuleMetadata(ModuleClass, isService, createModuleView);
  const selectResult = useSelectFrom(moduleMetadata.view, selectorFn);
  return selectResult as TResult;
}

export function useService<
  TModule,
  TSelectorResult,
  TResult extends TMerge<TModuleView<TModule>, TSelectorResult>
  >
(ModuleClass: new(...args: any[]) => TModule, selectorFn: (view: TModuleView<TModule>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
  return useModule(ModuleClass, selectorFn, true);
}

export function useServiceView<
  TService,
  TSelectorResult,
  TResult extends TMerge<TServiceView<TService>, TSelectorResult>
  >
(ModuleClass: new(...args: any[]) => TService, selectorFn: (view: TServiceView<TService>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
  const moduleMetadata = useModuleMetadata(ModuleClass, true, createServiceView);
  const selectResult = useSelectFrom(moduleMetadata.view, selectorFn);
  return selectResult as TResult;
}

function createServiceView<TService>(service: TService): TServiceView<TService> {
  const actions = service as any;
  const getters = (service as any).view || {} as any;
  return createViewWithActions(actions, getters) as TServiceView<TService>;
}

export type TServiceView<
  TService extends Object,
  TState = TService extends { state?: any } ? TService['state'] : {},
  TView = TService extends { view?: any } ? TService['view'] : {},
  TActions = TPromisifyFunctions<TService>
  > = TMerge3<TState, TActions, TView>;
