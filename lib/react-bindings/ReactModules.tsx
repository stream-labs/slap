import React, {
  ReactNode, useContext,
} from 'react';
import { useOnCreate } from './hooks';
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
  const modulesScope = rootScope.createChildScope({}, { autoregister: true });

  rootScope.init(ReactStoreAdapter);

  return { servicesScope: rootScope, modulesScope };
}

export function ReactModules(p: {children: ReactNode | ReactNode[], app?: TAppContext}) {
  const appScope = useOnCreate(() => p.app || createApp());

  return (
    <SlapContext.Provider value={appScope}>
      {p.children}
    </SlapContext.Provider>
  );
}
