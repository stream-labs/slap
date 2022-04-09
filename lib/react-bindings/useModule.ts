import { useForceUpdate, useOnCreate, useOnDestroy } from './hooks';
import { useModuleInstance } from './useModuleInstance';
import { generateId, getInstanceMetadata, TModuleInstanceFor, TModuleLocatorType } from '../scope';
import {
  ComponentView,
  createStateViewForModule,
  GetProps,
  StateView,
  GetModuleStateView, ExtendView,
} from '../store/StateView';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useAppContext, useScope } from './ReactModules';
import { Store } from '../store';
import { ReactStoreAdapter } from './react-store-adapter';
import { isSimilar } from '../utils';

export function useComponentView<TStateView extends StateView<any>>(moduleView: TStateView, moduleId: string, id?: string): TStateView['props'] & {componentView: ComponentView<TStateView>, extend: <TNewProps>(
    newPropsFactory: (props: GetProps<TStateView>) => TNewProps,
  ) => ExtendView<TStateView['props'], TNewProps>['props'] & {componentView: ComponentView<TStateView> }} {
  const forceUpdate = useForceUpdate();
  const store = useScope().resolve(Store);

  const { componentId, componentView } = useOnCreate(() => {

    const componentId = id || `${moduleId}__component__${generateId()}`;
    const componentView = moduleView.registerComponent(store, componentId, forceUpdate);
    const stateView = componentView.stateView;

    // // check affected components
    // function selector() {
    //   if (!stateView.hasSelectedProps) return;
    //   const reactiveValues = stateView.getSnapshot();
    //   return reactiveValues;
    // }

    function extend<TNewProps>(
      newPropsFactory: (props: GetProps<TStateView>) => TNewProps,
    ): (ExtendView<GetProps<TStateView>, TNewProps>)['props'] {
      const extendedView = moduleView.extend(newPropsFactory, componentId);
      return useComponentView(extendedView, moduleId, componentId) as any;
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
      componentId, componentView,
    };
  });

  useOnDestroy(() => {
    moduleView.destroyComponent(componentId);
  });

  // useDetectChanges
  // call selector to make selected props reactive
  useConnectStore(componentView);

  return componentView.stateView.proxy;
}

export function useModule<T extends TModuleLocatorType, TInitState extends boolean | Partial<TModuleInstanceFor<T>['state']>>(locator: T, initProps: TInitState|null = null, moduleName = '') {
  const module = useModuleInstance(locator, initProps, moduleName);
  const moduleView = useOnCreate(() => createStateViewForModule(module));
  return useComponentView(moduleView, getInstanceMetadata(module).id);
}


export function useConnectStore(component: ComponentView<StateView<any>>) {
  const scope = useAppContext().modulesScope;
  const store = scope.resolve(Store);
  const reactStore = scope.resolve(ReactStoreAdapter);

  reactStore.createComponent(component);

  useLayoutEffect(() => {

    const stateView = component.stateView;
    if (!stateView.hasSelectedProps) return;

    component.makeSnapshot();

    // TODO do not run watchers for non-observable component views

    const watcherId = reactStore.createWatcher(component.id, () => {
      const prevSnapshot = component.lastSnapshot;
      const newSnapshot = component.makeSnapshot();

      if (isSimilar(prevSnapshot.affectedModules, newSnapshot.affectedModules)) {
        // no modules changed, do not call compare props
        return;
      }

      if (!isSimilar(prevSnapshot.props, newSnapshot.props)) {
        // reactStore.updateUI();
        component.setInvalidated(true);
      }
    });
    return () => {
      reactStore.removeWatcher(watcherId);
    };
  }, []);

  useEffect(() => {
    reactStore.mountComponent(component);
  },[])
}
