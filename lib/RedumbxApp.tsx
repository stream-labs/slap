import React, {
  ReactNode, useEffect, useState,
} from 'react';
import {
  Store,
} from './store';
import { useOnCreate } from './hooks';
import { AppScope, useScope } from './useModule';
import { Scope } from './scope/scope';
import { TModuleConstructorMap } from './scope/interfaces';
import { createModuleManager } from './module-manager';

export function RedumbxApp(p: {children: ReactNode | ReactNode[], moduleManager?: Scope, services?: TModuleConstructorMap, fallback?: ReactNode}) {
  const [moduleManager] = useState(() => {
    const { moduleManager, services } = p;

    if (moduleManager) {
      if (services) moduleManager.registerMany(services);
      return moduleManager;
    }
    return createModuleManager(services);
  });

  return (
    <AppScope.Provider value={moduleManager}>
      <StatefulApp fallback={p.fallback}>
        {p.children}
      </StatefulApp>
    </AppScope.Provider>
  );
}

function StatefulApp(p: {children: ReactNode | ReactNode[], fallback?: ReactNode}) {
  const fallback = p.fallback || 'Loading...';
  const store = useScope().resolve(Store);
  const [isReady, setIsReady] = useState(store.isReady);

  useEffect(() => {
    const sub = store.onReady.subscribe(setIsReady);
    return () => sub.unsubscribe();
  }, []);

  return (
    <>
      {!isReady && fallback}
      {isReady && p.children}
    </>
  );

  // return (
  //   <>
  //     {p.children}
  //   </>
  // );
}

export function ModuleRoot(p: {children: ReactNode | ReactNode[], module: any }) {
  const moduleManager = useScope();

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
