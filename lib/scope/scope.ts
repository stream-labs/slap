import { createNanoEvents } from 'nanoevents';
import {
  TInstances, TModuleClass, TModuleConstructorMap, TProvider,
} from './interfaces';
import { generateId } from './utils';

let currentScope: Scope | null = null;

export class Scope {
  id!: string;

  parent: Scope | null = null;

  childScopes: Record<string, Scope> = {};

  registry: Record<string, TProvider> = {};

  settings = {

  };

  constructor(
    dependencies: TModuleConstructorMap = {},
    parentScope: Scope | null = null,
    settings: Partial<Scope['settings']> | null = null,
  ) {
    const uid = generateId();
    this.id = parentScope ? `${parentScope.id}__${uid}` : `root_${uid}`;
    if (settings) Object.assign(this.settings, settings);
    if (parentScope) this.parent = parentScope;
    dependencies && this.registerMany(dependencies);
  }

  resolve<T extends TModuleClass>(moduleClassOrName: T | string): InstanceType<T> {
    const provider = this.resolveProvider(moduleClassOrName);
    if (provider.instance) return provider.instance;
    return this.init(moduleClassOrName);
  }

  getInstance<T extends TModuleClass>(moduleClassOrName: T | string): InstanceType<T> | null {
    const provider = this.getProvider(moduleClassOrName);
    return provider ? provider.instance : null;
  }

  register(ModuleClass: TModuleClass, name?: string, options?: Partial<IProviderOptions>) {
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
      cache: {},
      data: null,
      options: {
        initMethod: 'init',
        ...(options || {}),
      } as IProviderOptions,
    };

    this.registry[moduleName] = provider;

    this.events.emit('onModuleRegister', provider);
  }

  registerMany(dependencies: TModuleConstructorMap, options?: Partial<IProviderOptions>) {
    Object.keys(dependencies).forEach(depName => this.register(dependencies[depName], undefined, options));
  }

  unregister(ModuleClass: TModuleClass) {
    // TODO
  }

  isRegistered(moduleClassOrName: TModuleClass | string): boolean {
    return !!this.getProvider(moduleClassOrName);
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

    this.events.emit('onModuleInit', provider);
    return instance;
  }


  /**
   * Register and instantiate a module
   */
  start<
    TServiceClass extends new (...args: any) => any,
    >(moduleClass: TServiceClass, ...args: ConstructorParameters<TServiceClass>): InstanceType<TServiceClass> {
    const provider = this.resolveProvider(moduleClass);
    if (!provider) this.register(moduleClass);
    const instance = this.init(moduleClass, ...args as any);
    return instance;
  }

  create<
    TServiceClass extends new (...args: any) => any,
    >(ModuleClass: TServiceClass, ...args: ConstructorParameters<TServiceClass>): InstanceType<TServiceClass> {
    const instance = this.exec(() => new ModuleClass(...args as any));
    let initMethodName = 'init';
    if (this.isRegistered(ModuleClass)) {
      const provider = this.resolveProvider(ModuleClass);
      initMethodName = provider.options.initMethod;
    }
    initMethodName && instance[initMethodName] && instance[initMethodName]();
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

  createScope(dependencies?: TModuleConstructorMap, settings?: Partial<Scope['settings']>) {
    return new Scope(dependencies, this, settings);
  }

  registerScope(dependencies?: TModuleConstructorMap, settings?: Partial<Scope['settings']>) {
    const scope = this.createScope({}, settings);
    this.childScopes[scope.id] = scope;
    scope.events = this.events;
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

  resolveProvider(moduleClasOrName: TModuleClass | string): TProvider {
    const provider = this.getProvider(moduleClasOrName);
    if (!provider) {
      throw new Error(`Provider not found ${moduleClasOrName}`);
    }
    return provider;
  }

  getProvider(moduleClasOrName: TModuleClass | string): TProvider | null {
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

export function getCurrentScope() {
  return currentScope;
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

export function injectScope(): Scope {
  assertInjectIsAllowed();
  return currentScope!;
}

export function assertInjectIsAllowed() {
  if (currentScope) return;
  throw new Error('Injections a not allowed for objects outside the Scope. Create this object via Scope.create() or Scope.init() or Scope.resolve()');
}

export interface IProviderOptions {
  initMethod: string;
}
