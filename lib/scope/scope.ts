import { createNanoEvents } from 'nanoevents';
import {
  TModuleClass,
  TModuleConstructorMap, TModuleCreator, TModuleInstanceFor,
  TModuleLocatorType,
  TProviderFor,
} from './interfaces';
import { generateId } from './utils';
import { Provider, ProviderOptions } from './provider';

let currentScope: Scope | null = null;
let currentProvider: Provider<any> | null = null;

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

  childScopes: Record<string, Scope> = {};

  providers: Record<string, Provider<any>> = {};

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

  resolve<T extends TModuleLocatorType>(locator: T): TModuleInstanceFor<T> {
    const provider = this.resolveProvider(locator);
    if (provider.instance) return provider.instance;
    return this.init(locator, ...[] as any);
  }

  unregister<T extends TModuleLocatorType>(locator: T) {
    const provider = this.getProvider(locator);
    if (!provider) return;
    provider.destroyInstance();
    delete this.providers[provider.id];
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
  init<T extends TModuleLocatorType>(locator: T, ...args: any[]): TModuleInstanceFor<T> {
    const provider = this.resolveProvider(locator);

    if (provider.instance) {
      throw new Error(`The module ${provider.name} is already inited in the given scope`);
    }

    return this.create(locator, ...args);
  }

  // /**
  //  * Register and instantiate a module
  //  * TODO add type for args
  //  */
  // start<T extends TModuleCreator>(creator: T, ...args: any[]): TModuleInstanceFor<T> {
  //   this.register(creator);
  //   const instance = this.init(creator, ...args as any);
  //   return instance;
  // }

  /**
   * create the instance and resolve injections
   * every time returns a new instance
   */
  // TODO add type for args
  create<TLocator extends TModuleLocatorType>(locator: TLocator, ...args: any): TModuleInstanceFor<TLocator> {
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

    if (isRegistered) {
      provider.events.on('onModuleLoaded', () => {
        this.events.emit('onModuleLoad', provider);
      });
      this.events.emit('onModuleInit', provider);
      provider.setInited();
    }

    return instance;
  }

  createChildScope(
    dependencies?: TModuleConstructorMap,
    settings?: Omit<Partial<ScopeSettings>, 'parentScope'>,
  ) {
    return new Scope(dependencies, { ...settings, parentScope: this });
  }

  // TODO refactor
  registerScope(dependencies?: TModuleConstructorMap, settings?: Partial<Scope['settings']>) {
    const scope = this.createChildScope({}, settings);
    this.childScopes[scope.id] = scope;
    scope.events = this.events;
    dependencies && scope.registerMany(dependencies);
    return scope;
  }

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

  getScheme(): any {
    return {
      id: this.id,
      registry: this.providers,
      parentScope: this.parent ? this.parent.getScheme() : null,
    };
  }

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
