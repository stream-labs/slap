import {
  useForceUpdate,
  useOnCreate, useOnDestroy,
} from './hooks';
import { useSelector } from './useSelector';
import { useModuleInstance } from './useResolveModule';
import { generateId, TModuleInstanceFor, TModuleLocatorType } from './scope';
import {
  ComponentView,
  createStateViewForModule, GetProps, MergeViews,
  StateView, TStateViewFor,
} from './slapp/module-view/state-view';

export function useComponentView<TStateView extends StateView<any>>(moduleView: TStateView, id?: string): TStateView['props'] & {componentView: ComponentView<TStateView>, extend: <TNewProps>(
    newPropsFactory: (props: GetProps<TStateView>) => TNewProps,
  ) => (MergeViews<StateView<GetProps<TStateView> & TNewProps>, TStateViewFor<TNewProps>>)['props'] & {componentView: ComponentView<TStateView> }} {
  const forceUpdate = useForceUpdate();

  const { selector, componentId, componentView } = useOnCreate(() => {

    const componentId = id || generateId();
    const componentView = moduleView.registerComponent(componentId, forceUpdate);
    const stateView = componentView.stateView;

    // check affected components
    function selector() {
      if (!stateView.hasSelectedProps) return;
      const reactiveValues = stateView.getSnapshot();
      return reactiveValues;
    }

    function extend<TNewProps>(
      newPropsFactory: (props: GetProps<TStateView>) => TNewProps,
    ): (MergeViews<StateView<GetProps<TStateView> & TNewProps>, TStateViewFor<TNewProps>>)['props'] {
      const extendedView = moduleView.extend(newPropsFactory);
      return useComponentView(extendedView, componentId) as any;
    }

    stateView.defineProp({
      type: 'extend',
      name: 'extend',
      getValue: () => extend,
    });

    stateView.defineProp({
      type: 'ComponentView',
      name: 'componentView',
      getValue: () => componentView,
    });

    return {
      selector, componentId, componentView,
    };
  });

  useOnDestroy(() => {
    moduleView.destroyComponent(componentId);
  });


  // useDetectChanges
  // call selector to make selected props reactive
  useSelector(selector as any);

  return componentView.stateView.proxy;
}

export function useModule<T extends TModuleLocatorType, TInitState extends boolean | Partial<TModuleInstanceFor<T>['state']>>(locator: T, initProps: TInitState|null = null, moduleName = '') {
  const module = useModuleInstance(locator, initProps, moduleName);
  const moduleView = useOnCreate(() => createStateViewForModule(module));
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
