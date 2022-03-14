import { createNanoEvents } from 'nanoevents';
import {
  TInstances, TModuleClass, TModuleConstructorMap,
} from './interfaces';
import { generateId } from './utils';
import { Provider } from './provider';
import { Store } from '../store';

let currentScope: Scope | null = null;
let currentProvider: Provider<any> | null = null;

export class Scope {
  id!: string;

  parent: Scope | null = null;

  childScopes: Record<string, Scope> = {};

  providers: Record<string, Provider<any>> = {};

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
    if (provider.instance) return provider.instance as InstanceType<T>;
    return this.init(moduleClassOrName, ...[] as any);
  }

  getInstance<T extends TModuleClass>(moduleClassOrName: T | string): InstanceType<T> | null {
    const provider = this.getProvider(moduleClassOrName);
    return provider ? provider.instance : null;
  }

  register(ModuleClass: TModuleClass, name?: string) {
    const moduleName = name || ModuleClass.name;
    if (this.providers[moduleName]) {
      throw new Error(`${moduleName} already registered in the given Scope`);
    }
    console.log('register new class', moduleName);

    const provider = new Provider(this, ModuleClass, moduleName);
    this.providers[moduleName] = provider;

    this.events.emit('onModuleRegister', provider);
  }

  registerMany(dependencies: TModuleConstructorMap) {
    Object.keys(dependencies).forEach(depName => this.register(dependencies[depName], depName));
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
    >(moduleClassOrName: TServiceClass | string, ...args: ConstructorParameters<InstanceType<TServiceClass>>): InstanceType<TServiceClass> {
    const provider = this.resolveProvider(moduleClassOrName);
    if (!provider) throw new Error(`Can not init "${moduleClassOrName}", provider not found`);

    if (provider.instance) {
      throw new Error(`The module ${provider.name} is already inited in the given scope`);
    }

    const instance = this.create(provider.factory, ...args);
    return instance;
  }

  /**
   * Register and instantiate a module
   */
  start<
    TServiceClass extends new (...args: any) => any,
    >(moduleClass: TServiceClass, ...args: ConstructorParameters<TServiceClass>): InstanceType<TServiceClass> {
    this.register(moduleClass);
    const instance = this.init(moduleClass, ...args as any);
    return instance;
  }

  // TODO optimize
  create<
    TServiceClass extends new (...args: any) => any,
    >(ModuleClass: TServiceClass, ...args: ConstructorParameters<TServiceClass>): InstanceType<TServiceClass> {
    console.log('create new class', ModuleClass.name);


    const prevScope = currentScope;
    currentScope = this;
    let provider: Provider<TServiceClass>;

    const isRegistered = this.isRegistered(ModuleClass);
    if (isRegistered) {
      provider = this.resolveProvider(ModuleClass);
    } else {
      provider = new Provider(this, ModuleClass);
    }

    const prevProvider = currentProvider;
    currentProvider = provider;

    provider.createInstance(...args as any);
    currentScope = prevScope;
    currentProvider = prevProvider;

    if (isRegistered) {
      this.events.emit('onModuleInit', provider);
      provider.events.on('onModuleLoaded', () => {
        this.events.emit('onModuleLoad', provider);
      });
    }

    return provider.instance as InstanceType<TServiceClass>;
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
    });

    // unsubscribe events
    if (!this.parent) this.events.events = {};
  }

  resolveProvider<T extends TModuleClass>(moduleClasOrName: T | string): Provider<InstanceType<T>> {
    const provider = this.getProvider(moduleClasOrName);
    if (!provider) {
      throw new Error(`Provider not found ${moduleClasOrName}`);
    }
    return provider;
  }

  getProvider<T extends TModuleClass>(moduleClasOrName: T | string): Provider<InstanceType<T>> | null {
    const moduleName = typeof moduleClasOrName === 'string' ? moduleClasOrName : moduleClasOrName.name;
    const provider = this.providers[moduleName];
    if (provider) return provider;
    if (!this.parent) return null;
    return this.parent.getProvider(moduleName);
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
