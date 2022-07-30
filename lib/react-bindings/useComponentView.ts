import { useEffect, useLayoutEffect } from 'react';
import {
  getComponentName, useForceUpdate, useOnCreate, useOnDestroy,
} from './hooks';
import {
  generateId,
  getInstanceMetadata, Provider,
} from '../scope';
import { ExtendView } from '../store/StateView';
import { createModuleView, GetModuleStateView, Store } from '../store';
import { ComponentView, ReactStoreAdapter } from './react-store-adapter';
import { useModule } from './useModule';

export function useComponentView<TModule, TResult = GetUseComponentViewResult<TModule>>
(module: TModule): TResult {
  const forceUpdate = useForceUpdate();

  const {
    componentId, reactStore, component, provider,
  } = useOnCreate(() => {

    const provider = getInstanceMetadata(module).provider;
    const reactStore = provider.scope.resolve(ReactStoreAdapter);
    const store = provider.scope.resolve(Store);
    const componentName = getComponentName();
    const componentId = `${componentName}__${generateId()}`;
    let moduleView = createModuleView(module);
    const parentModuleView = provider.getMetadata('parentModuleView');
    if (parentModuleView) {
      moduleView = moduleView.mergeView(parentModuleView);
    }
    const component = reactStore.registerComponent(moduleView, componentId, forceUpdate, provider, reactStore);

    function extend<TNewProps>(
      newPropsFactory: (props: GetModuleStateView<TModule>['props']) => TNewProps,
    ): (ExtendView<GetModuleStateView<TModule>['props'], TNewProps>)['props'] {
      const newProvider = provider.createChildModule(() => newPropsFactory(moduleView.props as any));
      const newId = newProvider.name;
      newProvider.setMetadata('parentModuleView', moduleView);// TODO remove metadata
      store.setModuleContext(newId, provider.childScope!);
      const result = useModule(newId) as any;
      store.resetModuleContext(newId);
      return result;
    }

    moduleView.defineProp({
      name: 'extend',
      getValue: () => extend,
    });

    moduleView.defineProp({
      name: 'componentView',
      getValue: () => component,
    });

    return {
      componentId, component, moduleView, reactStore, provider,
    };
  });

  useOnDestroy(() => {
    reactStore.destroyComponent(componentId);
  });

  useLayoutEffect(() => {
    // startListeningStoreChanges(provider, component, reactStore);
    // component.startListeningStoreChanges(provider, component, reactStore);

    const stateView = component.stateView;
    if (!stateView.hasSelectedProps) return;

    component.makeSnapshot();

    const watcherId = reactStore.createWatcher(component.id, () => {

      if (provider.isDestroyed) return;

      const shouldUpdate = component.shouldComponentUpdate();
      if (shouldUpdate) {
        component.setInvalidated(true);
      }
    });
    return () => {
      reactStore.removeWatcher(component.id);
    };
  }, []);

  useEffect(() => {
    component.setMounted();
  });

  return component.stateView.proxy as TResult;
}

export type GetUseComponentViewResult<TModuleInstance> =
  GetModuleStateView<TModuleInstance>['props'] &
  {
    componentView: ComponentView,
    extend: <TNewProps>(newPropsFactory: (props: GetModuleStateView<TModuleInstance>['props']) => TNewProps) => ExtendView<GetModuleStateView<TModuleInstance>['props'], TNewProps>['props'] & {componentView: ComponentView }
  }

function startListeningStoreChanges(provider: Provider<any>, component: ComponentView, reactStore: ReactStoreAdapter) {
  const stateView = component.stateView;
  if (!stateView.hasSelectedProps) return;

  component.makeSnapshot();

  const watcherId = reactStore.createWatcher(component.id, () => {

    if (provider.isDestroyed) return;

    const shouldUpdate = component.shouldComponentUpdate();
    if (shouldUpdate) {
      component.setInvalidated(true);
    }
  });
}
