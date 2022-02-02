import {
  ReduxModuleManager,
  TInstances,
  TServiceConstructorMap,
} from './store';

export abstract class ReduxModule {
  dependencies: TServiceConstructorMap = {};

  protected deps!: TInstances<this['dependencies']>;

  // getters!: (keyof this)[];

  private moduleManager?: ReduxModuleManager;

  beforeInit(moduleManager?: ReduxModuleManager) {
    this.moduleManager = moduleManager;
    if (this.dependencies) this.deps = this.inject(this.dependencies);
  }

  inject<T>(injectedObject: T) {
    return this.moduleManager!.inject(injectedObject);
  }

  createModule<TModuleClass extends new (...args: any) => any>
  (ModuleClass: TModuleClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TModuleClass> {
    // @ts-ignore
    const module = new ModuleClass(...args);
    module.beforeInit && module.beforeInit(this.moduleManager);
    return module;
  }
}

export class Service extends ReduxModule {

}
