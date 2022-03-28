import { useEffect } from 'react';
import { useComponentId, useOnCreate, useOnDestroy } from './hooks';
import { Store } from './store';
import {
  Scope,
  TModuleClass,
  TModuleConstructor,
  TModuleInstanceFor,
  TModuleLocatorType
} from './scope';
import { isPlainObject } from 'is-plain-object';
import { useAppContext } from './ReactModules';
//
// export function useResolveModule<TModule>
// (ModuleClass: new(...args: any[]) => TModule, createView?: (module: TModule) => any) {
//   const componentId = useComponentId();
//   const moduleManager = useScope();
//
//   const {
//     provider,
//     scope,
//     isRoot,
//     store,
//   } = useOnCreate(() => {
//     const moduleName = ModuleClass.name;
//     const store = moduleManager.resolve(Store);
//
//     let scope = store.currentContext[moduleName];
//
//     let isRoot = false;
//
//     if (!scope) {
//       if (moduleManager.isRegistered(ModuleClass)) {
//         scope = moduleManager;
//       } else {
//         scope = moduleManager.registerScope({ ModuleClass });
//         isRoot = true;
//       }
//     }
//
//     const moduleInstance = scope.resolve(ModuleClass);
//     const provider = scope.resolveProvider(ModuleClass);
//
//     return {
//       provider,
//       store,
//       isRoot,
//       scope,
//     };
//   });
//
//   isRoot && store.setModuleContext(provider.name, scope);
//   useEffect(() => {
//     isRoot && store.resetModuleContext(provider.name);
//   }, []);
//
//   // unregister the component from the module onDestroy
//   useOnDestroy(() => {
//     if (isRoot) scope.dispose();
//   });
//
//   return provider;
// }



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
      instance.state['updateState'](initProps);
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
    if (isRoot) scope.dispose();
  });

  return instance;
}
