import { useEffect, useLayoutEffect, useRef } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { useForceUpdate, useOnCreate, useOnDestroy } from './hooks';
import { useModuleInstance } from './useModuleInstance';
import {
  generateId, getInstanceMetadata, TModuleInstanceFor, TModuleLocatorType,
} from '../scope';
import {
  createStateViewForModule,
  StateView,
  GetModuleStateView, ExtendView,
} from '../store/StateView';
import { useAppContext } from './ReactModules';
import { Store } from '../store';
import { ComponentView, ReactStoreAdapter } from './react-store-adapter';
import { isSimilar } from '../utils';
import mouseDown = Simulate.mouseDown;

export function useComponentView<TModule, TResult = GetUseComponentViewResult<TModule>>
(module: TModule): TResult {
  const forceUpdate = useForceUpdate();

  const { componentId, reactStore, component } = useOnCreate(() => {

    const provider = getInstanceMetadata(module).provider;
    const reactStore = provider.scope.resolve(ReactStoreAdapter);
    const store = provider.scope.resolve(Store);
    const componentId = `${provider.instanceId}__component__${generateId()}`;
    let moduleView = createStateViewForModule(module);
    const parentModuleView = provider.getMetadata('parentModuleView');
    if (parentModuleView) {
      moduleView = moduleView.mergeView(parentModuleView);
    }
    const component = reactStore.registerComponent(moduleView, componentId, forceUpdate);

    function extend<TNewProps>(
      newPropsFactory: (props: GetModuleStateView<TModule>['props']) => TNewProps,
    ): (ExtendView<GetModuleStateView<TModule>['props'], TNewProps>)['props'] {
      const newProvider = provider.resolveChildProvider(() => newPropsFactory(moduleView.props), componentId);
      newProvider.setMetadata('parentModuleView', moduleView);// TODO remove metadata
      store.setModuleContext(componentId, provider.childScope!);
      const result = useModule(componentId) as any;
      store.resetModuleContext(componentId);
      return result;
      // const extendedView = moduleView.extend(newPropsFactory, componentId);
      // return useComponentView(extendedView, moduleId, componentId) as any;
    }

    moduleView.defineProp({
      type: 'extend',
      name: 'extend',
      getValue: () => extend,
    });

    moduleView.defineProp({
      type: 'ComponentView',
      name: 'componentView',
      getValue: () => component,
    });

    return {
      componentId, component, moduleView, reactStore, provider,
    };
  });

  useOnDestroy(() => {
    reactStore.destroyComponent(componentId);

    // // // TODO find better way of detecting one-off modules
    // const shouldDestroyModule = provider.instanceId.includes('__component__');
    // if (shouldDestroyModule) provider.scope.
  });

  useLayoutEffect(() => {

    const stateView = component.stateView;
    if (!stateView.hasSelectedProps) return;

    component.makeSnapshot();

    // TODO do not run watchers for non-observable component views

    const watcherId = reactStore.createWatcher(component.id, () => {
      const prevSnapshot = component.lastSnapshot;

      // console.log('START SNAPSHOT FOR', componentId);
      const newSnapshot = component.makeSnapshot();
      // console.log('FINISH SNAPSHOT FOR', componentId, newSnapshot);

      // if (isSimilar(prevSnapshot.affectedModules, newSnapshot.affectedModules)) {
      //   // no modules changed, do not call compare props
      //   return;
      // }

      if (!isSimilar(prevSnapshot.props, newSnapshot.props)) {

        // console.log('should render ', componentId);
        // reactStore.updateUI();
        component.setInvalidated(true);
      }
    });
    return () => {
      reactStore.removeWatcher(watcherId);
    };
  }, []);

  useEffect(() => {
    component.setMounted();
  }, []);

  return component.stateView.proxy as TResult;
}

export function useModule<T extends TModuleLocatorType, TInitState extends boolean | Partial<TModuleInstanceFor<T>['state']>>(locator: T, initProps: TInitState|null = null, moduleName = ''): GetUseComponentViewResult<TModuleInstanceFor<T>> {
  const module = useModuleInstance(locator, initProps, moduleName);
  // const moduleView = useModuleView(module);
  return useComponentView(module);
}

export type GetUseComponentViewResult<TModuleInstance> =
  GetModuleStateView<TModuleInstance>['props'] &
  {
    componentView: ComponentView,
    extend: <TNewProps>(newPropsFactory: (props: GetModuleStateView<TModuleInstance>['props']) => TNewProps) => ExtendView<GetModuleStateView<TModuleInstance>['props'], TNewProps>['props'] & {componentView: ComponentView }
  }
