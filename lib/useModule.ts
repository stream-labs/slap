import {
  useForceUpdate,
  useOnCreate, useOnDestroy,
} from './hooks';
import { useSelector } from './useSelector';
import { useModuleInstance } from './useResolveModule';
import { generateId, TModuleInstanceFor, TModuleLocatorType } from './scope';
import {
  ComponentView,
  createDefaultModuleView, GetModule, GetProps, MergeViews,
  StateView, TDefaultViewFor,
} from './slapp/module-view/state-view';
import { useEffect, useRef } from 'react';
import { useAppContext } from './ReactModules';
import { Store } from './store';
import { ReactStoreAdapter } from './react/react-store-adapter';
import { isSimilar } from './isDeepEqual';
import { StateSelector } from './slapp/module-view/state-selector';

export function useComponentView<TModuleView extends StateView<any, any>>(moduleView: TModuleView, id?: string): TModuleView['stateSelector']['props'] & {componentView: ComponentView<TModuleView>, extend: <TNewProps>(
    newPropsFactory: (props: GetProps<TModuleView>) => TNewProps,
  ) => (MergeViews<StateView<GetModule<TModuleView>, GetProps<TModuleView> & TNewProps>, TDefaultViewFor<TNewProps>>)['stateSelector']['props'] & {componentView: ComponentView<TModuleView> }} {
  const forceUpdate = useForceUpdate();

  const { selector, componentId, componentView } = useOnCreate(() => {

    const componentId = id || generateId();
    const componentView = moduleView.registerComponent(componentId, forceUpdate);
    const stateSelector = componentView.stateSelector;

    // check affected components
    function selector() {
      if (!stateSelector.hasSelectedValues) return;
      const reactiveValues = stateSelector.getSnapshot();
      return reactiveValues;
    }

    function extend<TNewProps>(
      newPropsFactory: (props: GetProps<TModuleView>) => TNewProps,
    ): (MergeViews<StateView<GetModule<TModuleView>, GetProps<TModuleView> & TNewProps>, TDefaultViewFor<TNewProps>>)['stateSelector']['props'] {
      const extendedView = moduleView.extend(newPropsFactory);
      return useComponentView(extendedView, componentId) as any;
    }

    stateSelector.defineProp({
      type: 'extend',
      name: 'extend',
      getValue: () => extend,
    });

    stateSelector.defineProp({
      type: 'ComponentView',
      name: 'componentView',
      getValue: () => componentView,
    });

    return {
      selector, stateSelector, componentId, componentView,
    };
  });

  useOnDestroy(() => {
    moduleView.destroyComponent(componentId);
  });


  // useDetectChanges
  // call selector to make selected props reactive
  useSelector(selector as any);

  return componentView.stateSelector.proxy;
}

export function useModule<T extends TModuleLocatorType, TInitState extends boolean | Partial<TModuleInstanceFor<T>['state']>>(locator: T, initProps: TInitState|null = null, moduleName = '') {
  const module = useModuleInstance(locator, initProps, moduleName);
  const moduleView = useOnCreate(() => createDefaultModuleView(module));
  return useComponentView(moduleView);
}

//
// export function useDetectChanges(componentView: ComponentView<unknown>) {
//   const affectedModulesRef = useRef<Record<string, number>>({});
//   const currentSelectorStateRef = useRef<Record<string, any>>({});
//   const forceUpdate = useForceUpdate();
//   const scope = useAppContext().modulesScope;
//   const store = scope.resolve(Store);
//   const reactStore = scope.resolve(ReactStoreAdapter);
//
//   useEffect(() => {
//     affectedModulesRef.current = store.listenAffectedModules(() => {
//       currentSelectorStateRef.current = cb();
//     });
//
//     // TODO do not run watchers for non-observable component views
//
//     const watcherId = reactStore.createWatcher(() => {
//       const prevRevisions = affectedModulesRef.current;
//       const currentRevisions = store.moduleRevisions;
//
//       let modulesHasChanged = false;
//       for (const moduleName in prevRevisions) {
//         if (prevRevisions[moduleName] !== currentRevisions[moduleName]) {
//           modulesHasChanged = true;
//           break;
//         }
//
//         if (!modulesHasChanged) {
//           // dependent modules don't have changes in the state
//           // do not re-render
//           return;
//         }
//       }
//
//       const prevSelectorState = currentSelectorStateRef.current;
//
//       affectedModulesRef.current = store.listenAffectedModules(() => {
//         currentSelectorStateRef.current = cb();
//       });
//
//       if (!isSimilar(prevSelectorState, currentSelectorStateRef.current)) {
//         // TODO try batched updates
//         forceUpdate();
//       }
//     });
//     return () => {
//       reactStore.removeWatcher(watcherId);
//     };
//   }, []);
// }
