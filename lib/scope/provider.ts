import { createNanoEvents } from 'nanoevents';
import { isPlainObject } from 'is-plain-object';
import { Scope } from './scope';
import {
  defineGetter, Dict, generateId, isClass,
} from './utils';
import {
  GetModuleInstanceFor,
  InjectableModuleTyped,
  TModuleCreator, TProviderFor,
} from './interfaces';

/**
 * Providers initialize modules and keeps their metadata
 */
export class Provider<TInstance, TInitParams extends [] = []> {

  /**
   * Uniq id for the provider
   */
  id: string;

  /**
   * Keeps module's instance
   */
  instance: TInstance | null = null;

  /**
   * keeps user's metadata
   */
  metadata: Dict<any> = {};

  /**
   * function that constructs a new module
   */
  factory: (args: TInitParams) => TInstance;

  /**
   * true if instance is initialized and added to the Scope
   */
  isInited = false;

  /**
   * true if instance is initialized and added to the Scope
   */
  isDestroyed = false;

  /**
   * Keeps information about all injected modules
   */
  injectedModules: Dict<{ instance: InjectableModuleTyped<any, any, any>, options: InjectedPropOptions }> = {};

  /**
   * Keeps information about all child modules.
   * Child modules are kind of injected modules with the same lifecycle of the parent module
   */
  childModules: Dict<InjectableModuleTyped<any, any, any>> = {};

  /**
   * Keeps a child scope if the provider has created one
   */
  childScope: Scope | null = null;

  constructor(
    public scope: Scope,
    public creator: (new (...args: TInitParams) => TInstance) | ((...args: TInitParams) => TInstance) | TInstance,
    public name = '',
    public options: Partial<ProviderOptions> = {},
  ) {
    if (!this.name) this.name = `AnonymousProvider__${generateId()}`;
    this.id = `${this.name}__${this.scope.id}__${generateId()}`;

    // setup default provider options
    this.options = { shouldCallHooks: true, ...this.options };

    if (typeof creator === 'function') {

      if (isClass(creator)) {
        this.factory = (args: TInitParams) => new (creator as any)(...args);
        return;
      }

      // creator is a function
      this.factory = args => (creator as (...args: TInitParams) => TInstance)(...args);
      return;
    }

    // creator is an object
    if (isPlainObject(creator)) {
      this.factory = () => creator;
      return;
    }

    throw new Error(`Can not construct the object ${creator}`);
  }

  /**
   * Creates a module instance
   * @param args
   */
  createInstance(args: TInitParams): TInstance {
    const instance = this.factory(args) as any;
    this.instance = instance;
    createInstanceMetadata(instance, this);
    return instance;
  }

  /**
   * Init all injected modules
   */
  mountModule() {
    Object.keys(this.injectedModules).forEach(injectedName => {
      const childModuleProvider = getInstanceMetadata(this.injectedModules[injectedName].instance).provider;
      if (!childModuleProvider.isInited) childModuleProvider.mountModule();
    });
    if (this.options.shouldCallHooks) {
      const instance = this.instance as any as InjectableModuleTyped<any, any, any>;
      const provider = this as Provider<any, any>;
      this.events.emit('onBeforeInit', provider);
      instance.init && instance.init();
      this.events.emit('onAfterInit', provider);
    }
    this.isInited = true;
  }

  getMetadata(pluginName: string) {
    return this.metadata[pluginName];
  }

  setMetadata(pluginName: string, data: any) {
    this.metadata[pluginName] = data;
    return data;
  }

  // destroy provider
  destroy() {
    this.destroyInstance();
    // unsubscribe events
    this.events.events = {};
  }

  destroyInstance() {
    const instance = this.instance as any;
    if (!instance) return;

    // destroy instance
    instance.destroy && instance.destroy();

    // destroy child modules
    this.childScope?.dispose();
    this.childModules = {};
    this.isDestroyed = true;

    this.instance = null;
    this.isInited = false;
  }

  get instanceId() {
    return getInstanceMetadata(this.instance).id;
  }

  /**
   * Returns a child scope. Creates a new one if not exist
   */
  resolveChildScope() {
    if (!this.childScope) this.childScope = this.scope.createChildScope();
    return this.childScope;
  }

  /**
   * Resolves a provider for the module in the child scope
   */
  resolveChildProvider<T extends TModuleCreator>(ModuleCreator: T, name: string): TProviderFor<T> {
    const childScope = this.resolveChildScope();
    if (!childScope.isRegistered(name)) {
      childScope.register(ModuleCreator, name);
    }
    return childScope.resolveProvider(name) as TProviderFor<T>;
  }

  /**
   * Inject a module into the current module
   */
  injectModule<T extends TModuleCreator>(ModuleLocator: T, options: InjectedPropOptions = {}) {
    const module = this.scope.resolve(ModuleLocator);
    const moduleProvider = getInstanceMetadata(module).provider;
    this.injectedModules[moduleProvider.name] = { instance: module, options };
    const returnValue = module.exportInjectorValue ? module.exportInjectorValue() : module;
    return returnValue as GetModuleInstanceFor<T>; // TODO: resolve injected value
  }
  /**
   * Inject a child module into the current module
   */
  injectChildModule<T extends TModuleCreator>(ModuleCreator: T, ...args: any) {
    const childScope = this.resolveChildScope();
    const name = `${this.id}__child__${ModuleCreator.name || ''}_${generateId()}`;
    childScope.register(ModuleCreator, name, { parentProvider: this as Provider<any, any> });
    const childModule = childScope.init(name, ...args) as InjectableModuleTyped<any, any, any>;
    this.childModules[name] = childModule;
    this.injectedModules[name] = { instance: childModule, options: {} };
    const returnValue = childModule.exportInjectorValue ? childModule.exportInjectorValue() : childModule;
    return returnValue;
  }

  events = createNanoEvents<ProviderEvents>();
}

/**
 * Attaches a metadata for the module instance
 */
export function createInstanceMetadata(instance: any, provider: Provider<any, any>) {
  const id = `${provider.id}__${generateId()}`;
  const descriptor = { enumerable: false, configurable: false };

  defineGetter(instance, '__instanceId', () => id, descriptor);
  defineGetter(instance, '__provider', () => provider, descriptor);
}

export function getInstanceMetadata(instance: any) {
  const provider: Provider<any> = instance.__provider;

  if (!provider) {
    throw new Error(`Provider non found for a given instance ${instance}`);
  }

  return {
    provider,
    id: instance.__instanceId as string,
  };
}

export const moduleSystemProps: Dict<boolean> = {
  __provider: true,
  __instanceId: true,
};

export interface ProviderEvents {
  onBeforeInit: (provider: Provider<any>) => unknown,
  onAfterInit: (provider: Provider<any>) => unknown,
}

export type ProviderOptions = {

  /**
   * Should call lifecycle hooks: init, load, onLoad
   */
  shouldCallHooks: boolean;

  /**
   * Keeps parentProvider if the module has been injected as a child module
   */
  parentProvider: Provider<any>;
}

export type InjectedPropOptions = {

  /**
   * true if should expose props in the component selector when injected as a property
   */
  isExposed?: boolean;
}
