import { ReduxModuleManager, TInstances, TServiceConstructorMap } from './store';

export class Service {
  dependencies!: TServiceConstructorMap;

  protected deps!: TInstances<this['dependencies']>;

  constructor(private moduleManager: ReduxModuleManager) {
  }

  beforeInit() {
    if (this.dependencies) this.deps = this.inject(this.dependencies);
  }

  inject<T>(injectedObject: T) {
    return this.moduleManager.inject(injectedObject);
  }

  get injector() {
    return this.moduleManager;
  }
}
