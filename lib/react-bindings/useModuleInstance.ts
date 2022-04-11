import { useEffect } from 'react';
import { useOnCreate, useOnDestroy } from './hooks';
import { useAppContext } from './ReactModules';
import { Store } from '../store/Store';
import { getInstanceMetadata, Scope, TModuleInstanceFor, TModuleLocatorType } from '../scope';
import { createStateViewForModule } from '../store';

export function useModuleInstance<T extends TModuleLocatorType, TInitProps extends boolean | Partial<TModuleInstanceFor<T>['state']>>(locator: T, initProps: TInitProps|null = null, name = ''): TModuleInstanceFor<T> {
  const rootScope = useAppContext().modulesScope;

  const {
    instance,
    moduleName,
    scope,
    isRoot,
    store,
  } = useOnCreate(() => {

    const moduleName = name || typeof locator === 'string' ? locator : (locator as any).name;
    const store = rootScope.resolve(Store);

    let isRoot = !!initProps;
    let scope: Scope = isRoot ? rootScope : store.currentContext[moduleName];

    if (!scope) {
      if (rootScope.isRegistered(locator)) {
        scope = rootScope;
      } else {
        isRoot = true;
      }
    }

    if (isRoot) scope = rootScope.registerScope({}, { autoregister: true });

    const instance = scope.resolve(locator);

    if (initProps && typeof initProps === 'object') {
      instance.state['nonReactiveUpdate'](initProps);
    }

    return {
      instance,
      store,
      isRoot,
      scope,
      moduleName,
    };
  });

  isRoot && store.setModuleContext(moduleName, scope);
  useEffect(() => {
    isRoot && store.resetModuleContext(moduleName);
  }, []);

  // unregister the component from the module onDestroy
  useOnDestroy(() => {
    isRoot && store.resetModuleContext(moduleName);
    if (isRoot) scope.dispose();
  });

  return instance;
}
