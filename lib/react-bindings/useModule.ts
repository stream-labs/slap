import { useForceUpdate, useOnCreate, useOnDestroy } from './hooks';
import { useSelector } from './useSelector';
import { useModuleInstance } from './useModuleInstance';
import { generateId, TModuleInstanceFor, TModuleLocatorType } from '../scope';
import {
  ComponentView,
  createStateViewForModule,
  GetProps,
  MergeViews, StateView,
  TStateViewFor,
} from '../store/StateView';

export function useComponentView<TStateView extends StateView<any>>(moduleView: TStateView, id?: string): TStateView['props'] & {componentView: ComponentView<TStateView>, extend: <TNewProps>(
    newPropsFactory: (props: GetProps<TStateView>) => TNewProps,
  ) => (MergeViews<StateView<GetProps<TStateView> & TNewProps>, TStateViewFor<TNewProps>>)['props'] & {componentView: ComponentView<TStateView> }} {
  const forceUpdate = useForceUpdate();

  const { selector, componentId, componentView } = useOnCreate(() => {

    const componentId = id || `component__${generateId()}`;
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
      const extendedView = moduleView.extend(newPropsFactory, componentId);
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
