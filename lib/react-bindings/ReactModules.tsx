import React, {
  ReactNode, useContext,
} from 'react';
import { useOnCreate, useOnDestroy } from './hooks';
import { Scope, TModuleConstructorMap } from '../scope';
import { ReactStoreAdapter } from './react-store-adapter';
import { Store } from '../store';

export type TAppContext = {
  servicesScope: Scope; // keeps singleton services in the root scope
  modulesScope: Scope; // keeps non-singleton modules
}

export const SlapContext = React.createContext<TAppContext|null>(null);

export function useAppContext() {
  return useContext(SlapContext)!;
}

export function createApp(Services: TModuleConstructorMap = {}): TAppContext {
  const rootScope = new Scope({ ...Services, Store, ReactStoreAdapter });
  const modulesScope = rootScope.registerScope({}, { autoregister: true });

  rootScope.init(ReactStoreAdapter);
  const app = { id: rootScope.id, servicesScope: rootScope, modulesScope };

  registerAppForDevtools(app);
  return app;
}

export function ReactModules(p: {children: ReactNode | ReactNode[], app?: TAppContext}) {
  const appScope = useOnCreate(() => p.app || createApp());
  useOnDestroy(() => {
    unregisterAppFromDevtools(appScope.servicesScope.id);
  });

  return (
    <SlapContext.Provider value={appScope}>
      {p.children}
    </SlapContext.Provider>
  );
}

function registerAppForDevtools(app: TAppContext) {
  const apps = (window as any).ReactModulesApps = (window as any).ReactModulesApps || {};
  apps[app.servicesScope.id] = app;
}

function unregisterAppFromDevtools(appId: string) {
  const apps = (window as any).ReactModulesApps[appId];
  delete apps[appId];
}
