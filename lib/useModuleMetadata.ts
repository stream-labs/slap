import { useComponentId, useOnCreate, useOnDestroy } from './hooks';
import { useModuleManager } from './useModule';

export function useModuleMetadata<TModule>
(ModuleClass: new(...args: any[]) => TModule, isService: boolean, createView: (module: TModule) => any) {
  const componentId = useComponentId();
  const moduleManager = useModuleManager();

  // register the component in the ModuleManager upon component creation
  const {
    moduleMetadata,
  } = useOnCreate(() => {
    const moduleName = ModuleClass.name;
    const contextId = isService ? 'service' : moduleManager.currentContext[moduleName] || 'default';
    const module = moduleManager.resolve(ModuleClass, contextId);
    let moduleMetadata = moduleManager.getModuleMetadata(ModuleClass, contextId);
    if (!moduleMetadata.view) {
      moduleMetadata = moduleManager.updateModuleMetadata(moduleName,contextId, { createView, view: createView(module) })
    }

    if (!isService) moduleManager.registerComponent(moduleName, contextId, componentId);

    return {
      moduleMetadata,
    };
  });

  // unregister the component from the module onDestroy
  useOnDestroy(() => {
    if (!isService) moduleManager.unRegisterComponent(moduleMetadata.moduleName, moduleMetadata.contextId, componentId);
  });

  return moduleMetadata;
}
