import { Provider, ReactReduxContext } from 'react-redux';
import React, {
  ReactNode, useEffect, useState,
} from 'react';
import {
  createModuleManager, destroyModuleManager,
  generateId,
  ReduxModuleManager,
} from './store';
import { useOnCreate, useOnDestroy } from './hooks';
import { useModuleManager } from './useModule';

export function RedumbxApp(p: {children: ReactNode | ReactNode[], moduleManager?: ReduxModuleManager}) {
  const [moduleManager] = useState(() => p.moduleManager || createModuleManager());
  const { store } = moduleManager;

  useOnDestroy(() => {
    destroyModuleManager(moduleManager.appId);
  });

  return <Provider store={store} context={ReactReduxContext}>{p.children}</Provider>;
}

export function ModuleRoot(p: {children: ReactNode | ReactNode[], module: any }) {
  const moduleManager = useModuleManager();

  const { moduleName, contextId } = useOnCreate(() => {
    const contextId = generateId();
    const moduleName = p.module.prototype.constructor.name;
    moduleManager.registerModule(p.module, null, moduleName, contextId);
    return { contextId, moduleName };
  });

  moduleManager.setModuleContext(moduleName, contextId);
  useEffect(() => {
    moduleManager.resetModuleContext(moduleName);
  });
  return <>{p.children}</>;
}
