import { Subject } from 'rxjs';
import {
  generateId,
  TInstances,
  TModuleConstructorMap,
} from './store';

export class Scope {
  constructor(
    public dependencies: TModuleConstructorMap = {},
    public readonly parentScope: Scope | null = null,
    public id?: string,
  ) {
    if (!id) this.id = generateId();
  }

  instances = {} as TInstances<this['dependencies']>;

  resolve<T extends TModuleClass>(ModuleClass: T): InstanceType<T> {
    const scope = this.getModuleScope(ModuleClass);
    const moduleName = ModuleClass.name;
    const instance = scope?.instances[moduleName];

    if (instance) return instance;
    return this.instantiate(ModuleClass);
  }

  getModuleScope(ModuleClass: TModuleClass): Scope | null {
    const moduleName = ModuleClass.name;
    if (this.dependencies[moduleName]) return this;
    if (this.parentScope) return this.parentScope.getModuleScope(ModuleClass);
    return null;
  }

  registerDependency(ModuleClass: TModuleClass) {
    const moduleName = ModuleClass.name;
    if (this.dependencies[moduleName]) {
      throw new Error(`${moduleName} already registered`);
    }
    this.dependencies[moduleName] = ModuleClass;
    // this.onRegister.next(ModuleClass);
  }

  isRegistered(ModuleClass: TModuleClass): boolean {
    return !!this.getModuleScope(ModuleClass);
  }

  hasInstance(ModuleClass: TModuleClass): boolean {
    if (!this.isRegistered(ModuleClass)) return false;
    return !!this.getModuleScope(ModuleClass);
  }

  getInstance<T extends TModuleClass>(ModuleClass: T): InstanceType<T> | null {
    const moduleName = ModuleClass.name;
    return this.getModuleScope(ModuleClass)?.instances[moduleName];
  }

  instantiate<
    TServiceClass extends new (...args: any) => any,
    >(ModuleClass: TServiceClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass> {
    const moduleName = ModuleClass.name;
    const instance = new ModuleClass(...args);
    (this.instances as any)[moduleName] = instance;
    instance.scope = this;

    // inject lazy dependencies
    const dependencies = instance.dependencies;
    if (dependencies) {
      const depsProxy = {};
      Object.keys(dependencies).forEach(moduleName => {
        const ModuleClass = dependencies[moduleName];
        Object.defineProperty(depsProxy, moduleName, {
          get: () => {
            return instance.scope.resolve(ModuleClass);
          },
        });
      });
      instance.deps = depsProxy;
    }
    this.onInstantiate.next({ instance, moduleName, ModuleClass });
    return instance;
  }

  removeInstance<
    TServiceClass extends new (...args: any) => any
    >(ModuleClass: TServiceClass) {
    const moduleName = ModuleClass.name;
    const instance = this.instances[moduleName];
    delete this.instances[moduleName];
    // this.onRemove.next({ instance, ModuleClass, moduleName });
  }

  // onRegister = new Subject<typeof ReduxModule>();
  //
  onInstantiate = new Subject<{ instance: ReduxModule, moduleName: string, ModuleClass: typeof ReduxModule }>();
  //
  // onRemove = new Subject<{ instance: ReduxModule, moduleName: string, ModuleClass: typeof ReduxModule }>();

  destroy() {
    this.onInstantiate.unsubscribe();
  }
}

export class ReduxModule {
  dependencies: TModuleConstructorMap = {};

  protected deps!: TInstances<this['dependencies']>;

  scope!: Scope;

  createModule<TModuleClass extends new (...args: any) => any>
  (ModuleClass: TModuleClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TModuleClass> {
    const scope = new Scope({ }, this.scope);
    // @ts-ignore
    return scope.instantiate(ModuleClass, ...args);
  }
}

export class Service extends ReduxModule {}

export type TModuleClass = new (...args: any) => any;
