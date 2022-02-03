import { generateId, ReactiveStore, TModuleConstructorMap } from './store';
import { Scope, TModuleClass } from './service';

const moduleManagers: Record<string, ModuleManager> = {};

// TODO: remove
(window as any).mm = moduleManagers;

export function createModuleManager(Services?: TModuleConstructorMap) {
  const appId = generateId();
  const moduleManager = new ModuleManager(appId, Services);
  moduleManagers[appId] = moduleManager;
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

export class ModuleManager {
  modulesMetadata: Record<string, Record<string, IModuleMetadata>> = {};

  currentContext: Record<string, string> = {};

  store: ReactiveStore;

  scopes!: {
    services: Scope,
    default: Scope,
    [key: string]: Scope
  };

  constructor(public id: string, Services?: TModuleConstructorMap) {
    if (Services) this.registerServices(Services);

    this.store = new ReactiveStore(id);

    this.scopes = {
      services: this.createScope('services', Services),
      default: this.createScope('default'),
    };
  }

  registerServices(Services: TModuleConstructorMap) {
    Object.keys(Services).forEach(serviceName => {
      this.createModuleMetadata(serviceName, 'service');
    });
  }

  private createScope(id: string, Services?: TModuleConstructorMap): Scope {
    const scope = new Scope(Services, null, id);

    scope.onInstantiate.subscribe(moduleInfo => {
      const instance = moduleInfo.instance as any;
      const contextId = instance.scope.id;
      const metadata = this.getModuleMetadata(moduleInfo.ModuleClass, contextId);
      metadata.instance = instance;
      instance.init && instance.init();
      const stateDescriptor = typeof Object.getOwnPropertyDescriptor(instance, 'state')?.get;
      const isStatefull = stateDescriptor && typeof stateDescriptor !== 'function';

      if (isStatefull) this.store.initModule(instance, metadata.moduleName, contextId);

      return instance;
    });
    return scope;
  }

  resolve<T extends TModuleClass>
  (ModuleClass: T, contextId: string): InstanceType<T> {
    const scope = this.resolveScope(contextId);
    if (!scope.isRegistered(ModuleClass)) {
      this.registerDependency(ModuleClass, contextId);
    }
    return scope.resolve(ModuleClass);
  }

  getService<T extends TModuleClass>
  (ModuleClass: T): InstanceType<T> {
    return this.resolve(ModuleClass, 'service');
  }

  resolveScope(contextId: string) {
    if (!this.scopes[contextId]) {
      this.scopes[contextId] = this.createScope(contextId);
    }
    return this.scopes[contextId];
  }

  private createModuleMetadata(moduleName: string, contextId: string) {
    if (!this.modulesMetadata[moduleName]) {
      this.modulesMetadata[moduleName] = {};
    }
    this.modulesMetadata[moduleName][contextId] = {
      contextId,
      moduleName,
      instance: null,
      createView: null,
      view: null,
      componentIds: [],
    };
  }

  updateModuleMetadata(moduleName: string, contextId: string, patch: Partial<IModuleMetadata>) {
    const metadata = this.modulesMetadata[moduleName][contextId];
    return Object.assign(metadata, patch);
  }

  registerDependency(ModuleClass: TModuleClass, contextId: string) {
    const scope = this.resolveScope(contextId);
    scope.registerDependency(ModuleClass);
    const moduleName = ModuleClass.name;
    this.createModuleMetadata(moduleName, contextId);
  }

  getModuleMetadata(ModuleClass: TModuleClass, contextId: string): IModuleMetadata {
    const moduleName = ModuleClass.name;
    return this.modulesMetadata[moduleName][contextId];
  }

  setModuleContext(moduleName: string, contextId: string) {
    this.currentContext[moduleName] = contextId;
  }

  resetModuleContext(moduleName: string) {
    delete this.currentContext[moduleName];
  }

  /**
     * Register a component that is using the module
     */
  registerComponent(moduleName: string, contextId: string, componentId: string) {
    this.modulesMetadata[moduleName][contextId].componentIds.push(componentId);
  }

  /**
     * Un-register a component that is using the module.
     * If the module doesnt have registered components it will be destroyed
     */
  unRegisterComponent(moduleName: string, contextId: string, componentId: string) {
    const moduleMetadata = this.modulesMetadata[moduleName][contextId];
    moduleMetadata.componentIds = moduleMetadata.componentIds.filter((id) => id !== componentId);
    if (!moduleMetadata.componentIds.length) this.removeInstance(moduleName, contextId);
  }

  removeInstance(moduleName: string, contextId: string) {
    const metadata = this.modulesMetadata[moduleName][contextId];
    const instance = metadata.instance;
    instance.destroy && instance.destroy();
    // this.store.destroyModule(moduleName, contextId);
    delete this.modulesMetadata[moduleName][contextId];
    if (contextId !== 'default' && contextId !== 'service') {
      this.scopes[contextId].destroy();
      delete this.scopes[contextId];
    }
  }
}

export interface IModuleMetadata {
  moduleName: string;
  contextId: string; // TODO: rename to scopeId
  instance: any;
  createView: any;
  view: any;
  componentIds: string[];
}
