import { useEffect } from 'react';
import { useComponentId, useOnCreate, useOnDestroy } from './hooks';
import {
  createModuleView, TModuleView, useScope, useSelectFrom,
} from './useModule';
import { Store } from './store';
import { TMerge } from './merge';

export function useProvider<TModule>
(ModuleClass: new(...args: any[]) => TModule, createView?: (module: TModule) => any) {
  const componentId = useComponentId();
  const moduleManager = useScope();

  // register the component in the ModuleManager upon component creation
  const {
    moduleMetadata,
    scope,
    isRoot,
    store,
  } = useOnCreate(() => {
    const moduleName = ModuleClass.name;
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

    const moduleInstance = scope.resolve(ModuleClass);
    let moduleMetadata = store.getModuleMetadata(moduleName, scope.id)!;
    if (!moduleMetadata.view) {
      let view: any;
      if ((moduleInstance as any).createView) {
        view = (moduleInstance as any).createView();
      } else if (createView) {
        view = createView(moduleInstance);
      } else {
        view = createModuleView(moduleInstance);
      }
      // const view = (moduleInstance as any).createView ? (moduleInstance as any).createView() : (() => createModuleView(moduleInstance));
      moduleMetadata = store.updateModuleMetadata(moduleName, scope.id, { view });
    }

    return {
      moduleMetadata,
      store,
      isRoot,
      scope,
    };
  });

  isRoot && store.setModuleContext(moduleMetadata.moduleName, scope);
  useEffect(() => {
    isRoot && store.resetModuleContext(moduleMetadata.moduleName);
  }, []);

  // unregister the component from the module onDestroy
  useOnDestroy(() => {
    if (isRoot) scope.destroy();
  });

  return moduleMetadata;
}

// export function useNonReactiveModule<
//   TModule,
//   TSelectorResult,
//   TResult extends TMerge<TModuleView<TModule>, TSelectorResult>
//   >
// (ModuleClass: new(...args: any[]) => TModule, selectorFn: (view: TModuleView<TModule>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
//   const moduleMetadata = useProvider(ModuleClass);
//   const result = moduleMetadata.view as TResult;
//   return result;
// }
