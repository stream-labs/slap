import React, {
  ReactNode, useEffect, useState,
} from 'react';
import {
  generateId, TModuleConstructorMap,
} from './store';
import { useOnCreate, useOnDestroy } from './hooks';
import { useModuleManager, StoreContext } from './useModule';
import { createModuleManager, destroyModuleManager, ModuleManager } from './module-manager';

export function RedumbxApp(p: {children: ReactNode | ReactNode[], moduleManager?: ModuleManager, services?: TModuleConstructorMap}) {
  const [moduleManager] = useState(() => {
    const { moduleManager, services } = p;

    if (moduleManager) {
      if (services) moduleManager.registerServices(services);
      return moduleManager;
    }
    return services ? createModuleManager(services) : createModuleManager();
  });

  useOnDestroy(() => {
    destroyModuleManager(moduleManager.id);
  });

  return (
    <StoreContext.Provider value={moduleManager.id}>
      {p.children}
    </StoreContext.Provider>
  );
}

export function ModuleRoot(p: {children: ReactNode | ReactNode[], module: any }) {
  const moduleManager = useModuleManager();

  const { moduleName, contextId } = useOnCreate(() => {
    const contextId = generateId();
    const moduleName = p.module.prototype.constructor.name;
    moduleManager.registerDependency(p.module, contextId);
    return { contextId, moduleName };
  });

  moduleManager.setModuleContext(moduleName, contextId);
  useEffect(() => {
    moduleManager.resetModuleContext(moduleName);
  });
  return <>{p.children}</>;
}
