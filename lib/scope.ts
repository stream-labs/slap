import { Subject } from 'rxjs';
import {
  generateId,
  TInstances,
  TModuleConstructorMap,
} from './store';

let currentScope: Scope | null = null;

export class Scope {
  public id!: string;

  constructor(
    public dependencies: TModuleConstructorMap = {},
    public readonly parentScope: Scope | null = null,
    id?: string,
  ) {
    if (!id) {
      this.id = parentScope ? `${parentScope.id}__${generateId()}` : 'root';
    } else {
      this.id = id;
    }
  }

  childScopes: Record<string, Scope> = {};

  instances = {} as TInstances<this['dependencies']>;

  resolve<T extends TModuleClass>(ModuleClass: T): InstanceType<T> {
    const scope = this.getScope(ModuleClass);
    const moduleName = ModuleClass.name;
    const instance = scope?.instances[moduleName];

    if (instance) return instance;
    if (!scope) this.register(ModuleClass);
    return this.initRegisteredModule(ModuleClass);
  }

  getScope(ModuleClass: TModuleClass): Scope | null {
    const moduleName = ModuleClass.name;
    if (this.dependencies[moduleName]) return this;
    if (this.parentScope) return this.parentScope.getScope(ModuleClass);
    return null;
  }

  register(ModuleClass: TModuleClass) {
    const moduleName = ModuleClass.name;
    if (this.dependencies[moduleName]) {
      throw new Error(`${moduleName} already registered`);
    }
    this.dependencies[moduleName] = ModuleClass;
    this.afterRegister.next({ ModuleClass, moduleName, scopeId: this.id });
  }

  registerMany(dependencies: TModuleConstructorMap) {
    Object.keys(dependencies).forEach(depName => this.register(dependencies[depName]));
  }

  unregister(ModuleClass: TModuleClass) {
    // TODO
  }

  isRegistered(ModuleClass: TModuleClass): boolean {
    return !!this.getScope(ModuleClass);
  }

  hasInstance(ModuleClass: TModuleClass): boolean {
    if (!this.isRegistered(ModuleClass)) return false;
    return !!this.getScope(ModuleClass);
  }

  initRegisteredModule<
    TServiceClass extends new (...args: any) => any,
    >(ModuleClass: TServiceClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass> {
    const moduleName = ModuleClass.name;
    const instance = this.createModule(ModuleClass, ...args);

    (this.instances as any)[moduleName] = instance;
    instance.init && instance.init();
    this.afterInit.next({ instance, moduleName, ModuleClass, scopeId: this.id });
    return instance;
  }

  createModule<
    TServiceClass extends new (...args: any) => any,
    >(ModuleClass: TServiceClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass> {
    const instance = this.exec(() => new ModuleClass(...args));
    instance._scope = this;
    instance.scope = this;
    return instance;
  }

  exec(cb: Function) {
    const prevScope = currentScope;
    currentScope = this;
    const result = cb();
    currentScope = prevScope;
    return result;
  }

  createScope(dependencies?: TModuleConstructorMap, id?: string) {
    return new Scope(dependencies, this, id);
  }

  registerScope(dependencies?: TModuleConstructorMap, id?: string) {
    const scope = this.createScope({}, id);
    this.childScopes[scope.id] = scope;
    scope.afterRegister = this.afterRegister;
    scope.afterInit = this.afterInit;
    dependencies && scope.registerMany(dependencies);
    return scope;
  }

  unregisterScope(id: string) {
    const childScope = this.childScopes[id];
    childScope.destroy();
    delete this.childScopes[id];
  }

  destroy() {
    this.afterInit.unsubscribe();
    this.afterRegister.unsubscribe();
    // TODO unregister
  }

  afterInit = new Subject<{ instance: any, moduleName: string, ModuleClass: any, scopeId: string }>();

  afterRegister = new Subject<{ ModuleClass: any, moduleName: string, scopeId: string}>();

  removeInstance<
    TServiceClass extends new (...args: any) => any
    >(ModuleClass: TServiceClass) {
    const moduleName = ModuleClass.name;
    const instance = this.instances[moduleName];
    delete this.instances[moduleName];
  }

  // destroy() {
  //   this.onInstantiate.unsubscribe();
  // }
}

export type TModuleClass = new (...args: any) => any;

export function inject<T extends TModuleConstructorMap>(dependencies: T): TInstances<T> {
  const scope: Scope = currentScope!;
  const depsProxy = { _scope: currentScope };
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
  return currentScope!;
}
