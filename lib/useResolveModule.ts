import { useEffect } from 'react';
import { useComponentId, useOnCreate, useOnDestroy } from './hooks';
import { useScope } from './useModule';
import { Store } from './store';
import { TModuleClass, TModuleConstructor } from './scope';
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



export function useModuleInstance<
  TModuleConfig,
  TModule = TModuleConfig extends TModuleClass ? InstanceType<TModuleConfig> : TModuleConfig>(ModuleConstructor: TModuleConfig): TModule
{
  const moduleManager = useScope();

  const {
    instance,
    moduleName,
    scope,
    isRoot,
    store,
  } = useOnCreate(() => {

    const moduleIsPlainObject = Object.getPrototypeOf({}) === Object.getPrototypeOf(ModuleConstructor);

    if (moduleIsPlainObject) {
      return {
        // TODO implement
      } as any;
    }

    const ModuleClass = ModuleConstructor as any as TModuleClass;
    const moduleName = (ModuleClass as any).name;
    const store = moduleManager.resolve(Store);

    let scope = store.currentContext[moduleName];

    let isRoot = false;

    if (!scope) {
      if (moduleManager.isRegistered(ModuleClass)) {
        scope = moduleManager;
      } else {
        scope = moduleManager.registerScope({ ModuleClass });
        isRoot = true;
      }
    }

    const instance = scope.resolve(ModuleClass);

    return {
      instance,
      store,
      isRoot,
      scope,
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
