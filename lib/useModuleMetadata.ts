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
    const moduleMetadata = moduleManager.injectModule(ModuleClass, isService, createView);
    const moduleName = moduleMetadata.moduleName;

    const contextId = moduleMetadata.contextId;
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
