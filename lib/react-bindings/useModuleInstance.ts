import { useEffect } from 'react';
import { useOnCreate, useOnDestroy } from './hooks';
import { useAppContext } from './ReactModules';
import { Store } from '../store/Store';
import {
  getInstanceMetadata,
  Scope,
  GetModuleInstanceFor,
  TModuleLocatorType,
  GetModuleConstructorArgs
} from '../scope';
import { createStateViewForModule } from '../store';

export function useModuleInstance<T extends TModuleLocatorType, TInitProps extends boolean | GetModuleConstructorArgs<T>>(locator: T, initProps: TInitProps|null = null, name = ''): GetModuleInstanceFor<T> {
  const rootScope = useAppContext().modulesScope;

  const {
    instance,
    moduleName,
    scope,
    isRoot,
    store,
  } = useOnCreate(() => {

    let moduleName = name || typeof locator === 'string' ? locator : (locator as any).name;
    const store = rootScope.resolve(Store);
    const shouldInitInNewScope = !!initProps;
    let scope: Scope;
    let isRoot = false;

    if (shouldInitInNewScope) {
      scope = rootScope.registerScope();
      isRoot = true;
      const provider = scope.register(locator as any);
      moduleName = provider.name;
      const constructorArgs = Array.isArray(initProps) ? initProps as unknown[] : [];
      const instance = scope.init(moduleName, ...constructorArgs);
      // if (initProps && typeof initProps === 'object') {
      //   instance.state['nonReactiveUpdate'](initProps);
      // }
    } else {
      scope = store.currentContext[moduleName] ?? rootScope;
      const provider = scope.isRegistered(moduleName) ? scope.resolveProvider(moduleName) : scope.register(locator as any);
      moduleName = provider.name;
    }
    //
    // let scope: Scope = isRoot ? rootScope : store.currentContext[moduleName];
    //
    // if (!scope) {
    //   if (rootScope.isRegistered(locator)) {
    //     scope = rootScope;
    //   } else {
    //     isRoot = true;
    //     scope = rootScope.registerScope();
    //   }
    // }
    //
    // if (!scope.isRegistered(locator)) {
    //   const provider = scope.register(locator as any);
    //   moduleName = provider.name;
    // }

    const instance = scope.resolve(moduleName);



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
