import React, {
  useContext, useMemo,
} from 'react';
import {
  useOnCreate,
} from './hooks';
import {
  TPromisifyFunctions,
} from './store';
import { merge, TMerge, TMerge3 } from './merge';
import { lockThis } from './lockThis';
import { useSelector } from './useSelector';
import { useProvider } from './useProvider';
import { createDependencyWatcher } from './dependency-watcher';
import { Scope } from './scope';

export const AppScope = React.createContext<Scope|null>(null);

export function useScope() {
  return useContext(AppScope)!;
  // const scope = useContext(AppScope);
  // return useMemo(() => {
  //   const moduleManager = scope;
  //   return moduleManager!;
  // }, []);
}

// export type TModuleView<TModule extends Object, TState = TModule extends { state?: any } ? TModule['state'] : null> = TMerge<TState, TModule>;

export type TModuleView<
  TModule extends Object,
  TState = TModule extends { state?: any } ? TModule['state'] : null,
  TView = TModule extends { createView: () => any } ? ReturnType<TModule['createView']> : null,
  > = TMerge3<TState, TModule, TView>;


export function createModuleView<TModule>(module: TModule): TModuleView<TModule> {
  if ('createView' in (module as any)) {
    const lockedModule = (module as any).createView(); // lockThis((module as any).view as any);
    return lockedModule;
  }
  const lockedModule = lockThis(module as any);
  const mergedModule = (module as any).state ? merge([
    // allow to select variables from the module's state
    () => (module as any).state,
    // allow to select getters and actions from the module
    lockedModule,
  ]) : lockedModule;
  return mergedModule as any as TModuleView<TModule>;
}

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

export function useModule<
  TModule,
  TSelectorResult,
  TResult extends TMerge<TModuleView<TModule>, TSelectorResult>
  >
(ModuleClass: new(...args: any[]) => TModule, selectorFn: (view: TModuleView<TModule>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
  const moduleMetadata = useProvider(ModuleClass);
  const selectResult = useSelectFrom(moduleMetadata.view, selectorFn);
  return selectResult as TResult;
}

// export function useServiceView<
//   TService,
//   TSelectorResult,
//   TResult extends TMerge<TServiceView<TService>, TSelectorResult>
//   >
// (ModuleClass: new(...args: any[]) => TService, selectorFn: (view: TServiceView<TService>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
//   const moduleMetadata = useProvider(ModuleClass, createServiceView);
//   const selectResult = useSelectFrom(moduleMetadata.view, selectorFn);
//   return selectResult as TResult;
// }

// export function createServiceView<TService>(service: TService) {
//   // const actions = service as any;
//   // const getters = (service as any).view || {} as any;
//   // return createViewWithActions(actions, getters) as TServiceView<TService>;
//   const moduleView = createModuleView(service); // createModuleView((service as any).view);
//   return moduleView;
// }

// export type TServiceView<
//   TService extends Object,
//   TState = TService extends { state?: any } ? TService['state'] : {},
//   TView = TService extends { view?: any } ? TService['view'] : {},
//   TActions = TPromisifyFunctions<TService>
//   > = TMerge3<TState, TActions, TView>;
