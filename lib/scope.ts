import {
  generateId,
  TInstances,
  TModuleConstructorMap,
} from './store';
import { createNanoEvents } from 'nanoevents';

let currentScope: Scope | null = null;

export type TProvider = {
  factory: TModuleClass,
  instance: InstanceType<TModuleClass>,
  name: string,
  initParams: any[],
  scope: Scope,
  readonly pluginData: Record<string, any>,
}

export type TModuleClass = new (...args: any) => any;

export class Scope {
  public id!: string;

  public parent: Scope | null = null;

  constructor(
    dependencies: TModuleConstructorMap = {},
    parentScope: Scope | null = null,
  ) {
    const uid = generateId();
    this.id = parentScope ? `${parentScope.id}__${uid}` : `root_${uid}`;
    if (parentScope) this.parent = parentScope;
    dependencies && this.registerMany(dependencies);
  }

  childScopes: Record<string, Scope> = {};

  registry: Record<string, TProvider> = {};

  resolve<T extends TModuleClass>(moduleClassOrName: T | string): InstanceType<T> {
    const provider = this.resolveProvider(moduleClassOrName);
    if (!provider) throw Error(`Provider not found for ${moduleClassOrName}`);
    if (provider.instance) return provider.instance;
    return this.init(moduleClassOrName);
  }

  register(ModuleClass: TModuleClass, name?: string) {
    const moduleName = name || ModuleClass.name;
    if (this.registry[moduleName]) {
      throw new Error(`${moduleName} already registered in the given Scope`);
    }
    const provider = {
      factory: ModuleClass,
      name: moduleName,
      scope: this,
      instance: null,
      initParams: [],
      pluginData: {},
      data: null,
    };

    this.registry[moduleName] = provider;

    this.events.emit('onModuleRegister', provider);
    // this.afterRegister.next(provider);
  }

  registerMany(dependencies: TModuleConstructorMap) {
    Object.keys(dependencies).forEach(depName => this.register(dependencies[depName]));
  }

  unregister(ModuleClass: TModuleClass) {
    // TODO
  }

  isRegistered(moduleClassOrName: TModuleClass | string): boolean {
    return !!this.resolveProvider(moduleClassOrName);
  }

  hasInstance(moduleClassOrName: TModuleClass | string): boolean {
    const provider = this.resolveProvider(moduleClassOrName);
    return !!provider?.instance;
  }

  /**
   * Instantiate a registered module
   */
  init<
    TServiceClass extends new (...args: any) => any,
    >(moduleClassOrName: TServiceClass | string, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass> {
    const provider = this.resolveProvider(moduleClassOrName);
    if (!provider) throw new Error(`Can not init "${moduleClassOrName}", provider not found`);

    if (provider.instance) {
      throw new Error(`The module ${provider.name} is already inited in the given scope`);
    }

    const instance = this.create(provider.factory, ...args);
    provider.instance = instance;
    provider.initParams = args;

    // this.afterInit.next(provider);
    this.events.emit('onModuleInit', provider);
    return instance;
  }

  create<
    TServiceClass extends new (...args: any) => any,
    >(ModuleClass: TServiceClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass> {
    const instance = this.exec(() => new ModuleClass(...args));
    instance.init && instance.init();
    instance._scope = this;
    return instance;
  }

  private exec(cb: Function) {
    const prevScope = currentScope;
    currentScope = this;
    const result = cb();
    currentScope = prevScope;
    return result;
  }

  createScope(dependencies?: TModuleConstructorMap) {
    return new Scope(dependencies, this);
  }

  registerScope(dependencies?: TModuleConstructorMap) {
    const scope = this.createScope({});
    this.childScopes[scope.id] = scope;
    scope.events = this.events;
    // scope.afterRegister = this.afterRegister;
    // scope.afterInit = this.afterInit;
    dependencies && scope.registerMany(dependencies);
    return scope;
  }

  unregisterScope(scopeId: string) {
    const scope = this.childScopes[scopeId];
    if (!scope) throw new Error(`Can not unregister Scope ${scopeId} - Scope not found`);
    scope.destroy();
    delete this.childScopes[scopeId];
  }

  getRootScope(): Scope {
    if (!this.parent) return this;
    return this.parent.getRootScope();
  }

  destroy() {
    // destroy child scopes
    Object.keys(this.childScopes).forEach(scopeId => {
      this.unregisterScope(scopeId);
    });

    // destroy instances
    Object.keys(this.registry).forEach(providerName => {
      const provider = this.registry[providerName];
      const instance = provider.instance;
      if (!instance) return;
      instance.destroy && instance.destroy();
      provider.initParams = [];
    });

    // unsubscribe events
    if (!this.parent) {
      // this.afterInit.unsubscribe();
      // this.afterRegister.unsubscribe();
      this.events.events = {};
    }
  }

  resolveProvider(moduleClasOrName: TModuleClass | string): TProvider | null {
    const moduleName = typeof moduleClasOrName === 'string' ? moduleClasOrName : moduleClasOrName.name;
    const metadata = this.registry[moduleName];
    if (metadata) return metadata;
    if (!this.parent) return null;
    return this.parent.resolveProvider(moduleName);
  }

  setPluginData(moduleClasOrName: TModuleClass | string, pluginName: string, data: any) {
    const provider = this.resolveProvider(moduleClasOrName);
    if (!provider) {
      throw new Error(`Can not set plugin data, provider not found: ${moduleClasOrName}`);
    }
    provider.pluginData[pluginName] = data;
  }

  getScheme(): any {
    return {
      id: this.id,
      registry: this.registry,
      parentScope: this.parent ? this.parent.getScheme() : null,
    };
  }
  //
  // afterInit = new Subject<TProvider>();
  //
  // afterRegister = new Subject<TProvider>();

  removeInstance(moduleClassOrName: TModuleClass | string) {
    const provider = this.resolveProvider(moduleClassOrName);
    if (!provider) throw new Error(`Can not remove instance ${moduleClassOrName} - provider not found`);
    const instance = provider.instance;

    if (!instance) throw new Error(`Can not remove instance ${moduleClassOrName} - instance not found`);
    instance.destroy && instance.destroy();
    delete provider.instance;
    provider.initParams = [];
  }

  get isRoot() {
    return !!this.parent;
  }

  events = createNanoEvents<ScopeEvents>();
}


export interface ScopeEvents {
  onModuleInit: (provider: TProvider) => void,
  onModuleRegister: (provider: TProvider) => void
}

export function inject<T extends TModuleConstructorMap>(dependencies: T): TInstances<T> {
  assertInjectIsAllowed();
  const scope: Scope = currentScope!;
  const depsProxy = { _scope: scope };
  Object.keys(dependencies).forEach(moduleName => {
    const ModuleClass = dependencies[moduleName];
    Object.defineProperty(depsProxy, moduleName, {
      get: () => {
        // @ts-ignore
        return scope.resolve(ModuleClass);
      },
    });
  });

  return depsProxy as any as TInstances<T>;
}

export function injectState<TModuleClass extends new (...args: any) => any>(StatefulModule: TModuleClass): InstanceType<TModuleClass>['state'] {
  assertInjectIsAllowed();
  const module = currentScope!.resolve(StatefulModule);
  const proxy = { _isStateProxy: true };
  Object.keys(module.state).forEach(stateKey => {
    Object.defineProperty(proxy, stateKey, {
      configurable: true,
      enumerable: true,
      get() {
        return module.state[stateKey];
      },
    });
  });
  return proxy;
}

export function injectScope(): Scope {
  assertInjectIsAllowed();
  return currentScope!;
}

export function assertInjectIsAllowed() {
  if (currentScope) return;
  throw new Error('Injections a not allowed for objects outside the Scope. Create this object via Scope.create() or Scope.init() or Scope.resolve()');
}
