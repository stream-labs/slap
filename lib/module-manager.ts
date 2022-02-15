import { Store } from './store';
import { Scope } from './scope/scope';
import { TModuleConstructorMap } from './scope/interfaces';

const moduleManagers: Record<string, Scope> = {};

// TODO: remove
// (window as any).mm = moduleManagers;

export function createModuleManager(Services: TModuleConstructorMap = {}) {
  // const moduleManager = new ModuleManager(Services);
  const moduleManager = new Scope({ ...Services, Store });
  moduleManagers[moduleManager.id] = moduleManager;
  moduleManager.init(Store);
  return moduleManager;
}

/**
 * The ModuleManager is a singleton object accessible in other files
 * via the `getModuleManager()` call
 */
export function getModuleManager(appId: string) {
  return moduleManagers[appId];
}

export function destroyModuleManager(appId: string) {
  delete moduleManagers[appId];
}

export interface IModuleMetadata {
  moduleName: string;
  scopeId: string;
  instance: any;
  createView: any;
  view: any;
  componentIds: string[];
}
