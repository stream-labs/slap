import { createNanoEvents } from 'nanoevents';
import {
  TModuleClass,
  TModuleConstructorMap, TModuleCreator, GetModuleInstanceFor,
  TModuleLocatorType,
  TProviderFor,
} from './interfaces';
import { generateId } from './utils';
import { Provider, ProviderOptions } from './provider';

let currentScope: Scope | null = null;
let currentProvider: Provider<any> | null = null;
let unmountedModulesCount = 0;

interface ScopeSettings {
  parentScope: Scope | null,
  autoregister: boolean,
  providerOptions?: Partial<ProviderOptions>
}

const defaultScopeSettings = {
  parentScope: null,
  autoregister: false,
};

/**
 * A Dependency injection container
 */
export class Scope {
  id!: string;

  /**
   * Keeps all registered providers
   */
  providers: Record<string, Provider<any>> = {};

  /**
   * Keeps all registered child scopes
   */
  childScopes: Record<string, Scope> = {};

  settings: ScopeSettings;

  constructor(
    dependencies: TModuleConstructorMap = {},
    settings: Partial<ScopeSettings> = {},
  ) {
    const uid = generateId();
    const parentScope = settings?.parentScope;

    this.id = parentScope ? `${parentScope.id}__${uid}` : `root_${uid}`;

    this.settings = parentScope
      ? { ...parentScope.settings, ...settings }
      : { ...defaultScopeSettings, ...settings };

    dependencies && this.registerMany(dependencies);
  }

  registerMany(dependencies: TModuleConstructorMap) {
    Object.keys(dependencies).forEach(depName => this.register(dependencies[depName], depName));
  }

  register<T extends TModuleCreator>(ModuleCreator: T, name?: string, options?: Partial<ProviderOptions>): TProviderFor<T> {
    const moduleName = name || ModuleCreator.name || `AnonymousModule_${generateId()}`;
    if (this.providers[moduleName]) {
      throw new Error(`${moduleName} already registered in the given Scope`);
    }

    const provider = new Provider(this, ModuleCreator, moduleName, options);
    this.providers[moduleName] = provider;

    this.events.emit('onModuleRegister', provider);
    return provider;
  }

  getProvider<T extends TModuleLocatorType>(moduleLocator: T): TProviderFor<T> | null {
    const moduleName = typeof moduleLocator === 'string' ? moduleLocator : moduleLocator.name;
    if (!moduleName) return null;

    const provider = this.providers[moduleName];
    if (provider) return provider;
    if (!this.parent) return null;

    return this.parent.getProvider(moduleName);
  }

  resolveProvider<T extends TModuleLocatorType>(moduleLocator: T): TProviderFor<T> {
    const provider = this.getProvider(moduleLocator);
    if (provider) return provider;

    const shouldRegister = this.settings.autoregister && typeof moduleLocator !== 'string';
    if (shouldRegister) return this.register(moduleLocator);

    throw new Error(`Provider not found ${moduleLocator}`);
  }

  getInstance<T extends TModuleLocatorType>(locator: T) {
    const provider = this.getProvider(locator);
    return provider ? provider.instance : null;
  }

  resolve<T extends TModuleLocatorType>(locator: T): GetModuleInstanceFor<T> {
    const provider = this.resolveProvider(locator);
    if (provider.instance) return provider.instance;
    return this.init(locator, ...[] as any);
  }

  unregister<T extends TModuleLocatorType>(locator: T) {
    const provider = this.getProvider(locator);
    if (!provider) return;
    provider.destroy();
    delete this.providers[provider.name];
  }

  // helper methods

  isRegistered(moduleLocator: TModuleLocatorType): boolean {
    return !!this.getProvider(moduleLocator);
  }

  hasInstance(moduleLocator: TModuleLocatorType): boolean {
    const provider = this.resolveProvider(moduleLocator);
    return !!provider?.instance;
  }

  /**
   * Instantiate a registered module
   * TODO type for args
   */
  init<T extends TModuleLocatorType>(locator: T, ...args: any[]): GetModuleInstanceFor<T> {
    const provider = this.resolveProvider(locator);

    if (provider.instance) {
      throw new Error(`The module ${provider.name} is already inited in the given scope`);
    }
    let instance: GetModuleInstanceFor<T>;

    unmountedModulesCount++;
    try {
      instance = this.create(locator, ...args);
    } finally {
      unmountedModulesCount--;
    }
    if (!unmountedModulesCount) provider.mountModule();

    return instance;
  }

  /**
   * create the instance and resolve injections
   * every time returns a new instance
   */
  // TODO add type for args
  create<TLocator extends TModuleLocatorType>(locator: TLocator, ...args: any): GetModuleInstanceFor<TLocator> {
    const prevScope = currentScope;
    currentScope = this;

    let provider: TProviderFor<TLocator>;

    const isRegistered = this.isRegistered(locator);
    if (isRegistered) {
      provider = this.resolveProvider(locator);
    } else {
      provider = new Provider(this, locator);
    }

    const prevProvider = currentProvider;
    currentProvider = provider;

    const instance = provider.createInstance(args);
    currentScope = prevScope;
    currentProvider = prevProvider;

    return instance;
  }

  createChildScope(
    dependencies?: TModuleConstructorMap,
    settings?: Omit<Partial<ScopeSettings>, 'parentScope'>,
  ) {
    return new Scope(dependencies, { ...settings, parentScope: this });
  }

  /**
   * Register a child scope
   */
  registerScope(dependencies?: TModuleConstructorMap, settings?: Partial<Scope['settings']>) {
    const scope = this.createChildScope({}, settings);
    this.childScopes[scope.id] = scope;
    scope.events = this.events;
    dependencies && scope.registerMany(dependencies);
    return scope;
  }
  /**
   * Unregister a child scope
   */
  unregisterScope(scopeId: string) {
    const scope = this.childScopes[scopeId];
    if (!scope) throw new Error(`Can not unregister Scope ${scopeId} - Scope not found`);
    scope.dispose();
    delete this.childScopes[scopeId];
  }

  getRootScope(): Scope {
    if (!this.parent) return this;
    return this.parent.getRootScope();
  }

  /**
   * Destroy current scope and all providers
   */
  dispose() {
    // destroy child scopes
    Object.keys(this.childScopes).forEach(scopeId => {
      this.unregisterScope(scopeId);
    });

    // destroy providers
    Object.keys(this.providers).forEach(providerName => {
      this.providers[providerName].destroy();
      delete this.providers[providerName];
    });

    // unsubscribe events
    if (!this.parent) this.events.events = {};
  }

  /**
   * Could be usefull for debugging
   */
  getScheme(): any {
    return {
      id: this.id,
      registry: this.providers,
      parentScope: this.parent ? this.parent.getScheme() : null,
    };
  }

  /**
   * Returns true if it doesn't have parent scopes
   */
  get isRoot() {
    return !!this.parent;
  }

  get parent() {
    return this.settings.parentScope;
  }

  events = createNanoEvents<ScopeEvents>();
}

export interface ScopeEvents {
  onModuleRegister: (provider: Provider<any>) => void
  onModuleInit: (provider: Provider<any>) => void,
  onModuleLoad: (provider: Provider<any>) => void,
}

export function getCurrentScope() {
  return currentScope;
}

export function getCurrentProvider() {
  return currentProvider;
}
