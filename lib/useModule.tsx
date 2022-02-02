import React, {
  useContext, useEffect, useMemo, useRef,
} from 'react';
import {
  useOnCreate, useOnDestroy, useComponentId, useForceUpdate,
} from './hooks';
import {
  IReduxModule,
  getModuleManager,
  createDependencyWatcher,
  GetInjectReturnType,
  TPromisifyFunctions,
} from './store';
import { merge, TMerge, TMerge3 } from './merge';
import { lockThis } from './lockThis';
import { createViewWithActions } from './createStateView';
import { isSimilar } from './isDeepEqual';

export const StoreContext = React.createContext('1');

export function useModuleManager() {
  const storeId = useContext(StoreContext);
  return useMemo(() => {
    const moduleManager = getModuleManager(storeId);
    return moduleManager;
  }, []);
}

export function useInject<T>(injectedObject: T): GetInjectReturnType<T> {
  return useModuleManager().inject(injectedObject);
}

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

function useSelector(cb: Function) {
  const servicesRevisionRef = useRef<Record<string, number>>({});
  const selectorResultRef = useRef<Record<string, any>>({});
  const forceUpdate = useForceUpdate();
  const moduleManager = useModuleManager();

  useEffect(() => {
    servicesRevisionRef.current = moduleManager.runAndSaveAccessors(() => {
      selectorResultRef.current = cb();
    });

    const watcherId = moduleManager.createWatcher(() => {
      const prevRevisions = servicesRevisionRef.current;
      const currentRevisions = moduleManager.modulesRevisions;
      let modulesHasChanged = false;
      for (const moduleName in prevRevisions) {
        if (prevRevisions[moduleName] !== currentRevisions[moduleName]) {
          modulesHasChanged = true;
          break;
        }
      }

      if (!modulesHasChanged) return;

      const prevSelectorResult = selectorResultRef.current;

      servicesRevisionRef.current = moduleManager.runAndSaveAccessors(() => {
        selectorResultRef.current = cb();
      });

      if (!isSimilar(prevSelectorResult, selectorResultRef.current)) {
        forceUpdate();
      }
    });
    return () => {
      moduleManager.removeWatcher(watcherId);
    };
  }, []);
}

export type TServiceView<
  TService extends Object,
  TState = TService extends { state?: any } ? TService['state'] : {},
  TView = TService extends { view?: any } ? TService['view'] : {},
  TActions = TPromisifyFunctions<TService>
  > = TMerge3<TState, TActions, TView>;
