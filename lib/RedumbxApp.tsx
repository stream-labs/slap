import React, {
  ReactNode, useEffect, useState,
} from 'react';
import {
  Store,
} from './store';
import { useOnCreate } from './hooks';
import { StoreContext, useModuleManager } from './useModule';
import { Scope } from './scope/scope';
import { TModuleConstructorMap } from './scope/interfaces';

export function RedumbxApp(p: {children: ReactNode | ReactNode[], moduleManager?: Scope, services?: TModuleConstructorMap}) {
  const [moduleManager] = useState(() => {
    const { moduleManager, services } = p;

    if (moduleManager) {
      if (services) moduleManager.registerMany(services);
      return moduleManager;
    }
    return services ? new Scope(services) : new Scope();
  });

  return (
    <StoreContext.Provider value={moduleManager.id}>
      {p.children}
    </StoreContext.Provider>
  );
}

export function ModuleRoot(p: {children: ReactNode | ReactNode[], module: any }) {
  const moduleManager = useModuleManager();

  const { moduleName, scope, store } = useOnCreate(() => {
    const store = moduleManager.resolve(Store);
    const moduleName = p.module.prototype.constructor.name;
    const scope = moduleManager.registerScope({ [moduleName]: p.module });
    return { scope, moduleName, store };
  });

  store.setModuleContext(moduleName, scope);
  useEffect(() => {
    store.resetModuleContext(moduleName);
  });
  return <>{p.children}</>;
}

// export function Module(p: {children: ReactNode | ReactNode[], module: any }) {
//   useModule(p.module);
//   return <>{p.children}</>;
// }
