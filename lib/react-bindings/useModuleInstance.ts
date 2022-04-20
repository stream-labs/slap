import { useEffect } from 'react';
import { useOnCreate, useOnDestroy } from './hooks';
import { useAppContext } from './ReactModules';
import { Store } from '../store/Store';
import {
  getInstanceMetadata,
  Scope,
  GetModuleInstanceFor,
  TModuleLocatorType,
  GetModuleConstructorArgs,
} from '../scope';
import { createStateViewForModule } from '../store';

export function useModuleInstance<T extends TModuleLocatorType, TInitProps extends boolean | GetModuleConstructorArgs<T>>(locator: T, initProps: TInitProps|null = null, name = ''): GetModuleInstanceFor<T> {
  const { modulesScope, servicesScope } = useAppContext();

  const {
    instance,
    moduleName,
    scope,
    isRoot,
    shouldInitInNewScope,
    isService,
    store,
  } = useOnCreate(() => {

    let moduleName = name || typeof locator === 'string' ? locator : (locator as any).name;
    const store = modulesScope.resolve(Store);
    const shouldInitInNewScope = !!initProps;
    let scope: Scope;
    let isRoot = false;
    let isService = false;

    if (shouldInitInNewScope) {
      scope = modulesScope.registerScope();
      isRoot = true;
      const provider = scope.register(locator as any);
      moduleName = provider.name;
      const constructorArgs = Array.isArray(initProps) ? initProps as unknown[] : [];
      const instance = scope.init(moduleName, ...constructorArgs);
    } else {
      scope = store.currentContext[moduleName] ?? modulesScope;
      const provider = scope.isRegistered(moduleName) ? scope.resolveProvider(moduleName) : scope.register(locator as any);
      isService = servicesScope.id === provider.scope.id;
      moduleName = provider.name;
      if (!isService && !provider.instance) isRoot = true;
    }

    const provider = scope.resolveProvider(moduleName);
    const instance = scope.resolve(moduleName);

    return {
      instance,
      store,
      isRoot,
      scope,
      moduleName,
      provider,
      shouldInitInNewScope,
      isService,
    };
  });

  isRoot && store.setModuleContext(moduleName, scope);
  useEffect(() => {
    isRoot && store.resetModuleContext(moduleName);
  }, []);

  // unregister the component from the module onDestroy
  useOnDestroy(() => {
    if (isService || !isRoot) return;
    store.resetModuleContext(moduleName);

    if (shouldInitInNewScope) {
      scope.dispose();
    } else {
      scope.unregister(moduleName);
    }

  });

  return instance;
}
