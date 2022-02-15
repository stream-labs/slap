import { useEffect } from 'react';
import { useComponentId, useOnCreate, useOnDestroy } from './hooks';
import { useModuleManager } from './useModule';
import { ReactiveStore } from './store';

export function useModuleMetadata<TModule>
(ModuleClass: new(...args: any[]) => TModule, isService: boolean, createView: (module: TModule) => any) {
  const componentId = useComponentId();
  const moduleManager = useModuleManager();

  // register the component in the ModuleManager upon component creation
  const {
    moduleMetadata,
    scope,
    isRoot,
    store,
  } = useOnCreate(() => {
    const moduleName = ModuleClass.name;
    const store = moduleManager.resolve(ReactiveStore);

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
    let moduleMetadata = store.getModuleMetadata(ModuleClass, scope.id)!;
    if (!moduleMetadata.view) {
      moduleMetadata = store.updateModuleMetadata(moduleName, scope.id, { createView, view: createView(moduleInstance) });
    }

    // if (!isService) moduleManager.registerComponent(moduleName, contextId, componentId);

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
