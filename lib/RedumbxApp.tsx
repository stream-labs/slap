import { Provider } from 'react-redux';
import React, { ReactNode, useEffect } from 'react';
import { generateContextId, getModuleManager, store } from './store';
import { useOnCreate } from './hooks';

export function RedumbxApp(p: {children: ReactNode | ReactNode[]}) {
  return <Provider store={store}>{p.children}</Provider>;
}

export function ModuleRoot(p: {children: ReactNode | ReactNode[], module: any }) {
  const moduleManager = getModuleManager();

  const { moduleName, contextId } = useOnCreate(() => {
    const contextId = generateContextId();
    const moduleName = p.module.prototype.constructor.name;
    moduleManager.registerModule(p.module, null, moduleName, false, contextId);
    return { contextId, moduleName };
  });

  moduleManager.setModuleContext(moduleName, contextId);
  useEffect(() => {
    moduleManager.resetModuleContext(moduleName);
  });
  return <>{p.children}</>;
  //
  // moduleManager.setModuleContext(moduleName, contextId);
  // const $el = <>{p.children}</>;
  // moduleManager.resetModuleContext(moduleName);
  // return $el;

  // return <ModulesContext.Provider value={moduleManager.currentContext}>{p.children}</ModulesContext.Provider>;
}
