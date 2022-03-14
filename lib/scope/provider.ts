import { createNanoEvents } from 'nanoevents';
import { Scope } from './scope';
import { Dict, generateId } from './utils';
import { Injector, TInjectorLoadingStatus } from './injector';

export class Provider<TInstance> {
  instance: TInstance | null = null;
  metadata: Dict<any> = {};
  injectors: Dict<Injector<unknown>> = {};

  injectionCompleted = false;
  loadMethodCompleted = false;
  isLoaded = false;

  initParams: any[] = [];

  constructor(
    public scope: Scope,
    public factory: new (...args: any[]) => TInstance,
    public name = '',
  ) {
    if (!this.name) this.name = `AnonymousProvider_${generateId()}`;
  }

  createInstance(...args: any[]) {
    // eslint-disable-next-line new-cap
    const instance = new this.factory(...args) as any;
    this.instance = instance;
    this.initParams = args;
    instance.__provider = this;
    instance.init && instance.init();
    this.resolveInjectors();
  }

  /**
   * Resolve injectors for just created object
   *
   *  WARNING!
   *  this code is executed for every object creation
   *  and should care about performance
   */
  private resolveInjectors() {
    const provider = this;
    const instance = provider.instance;
    const descriptors = Object.getOwnPropertyDescriptors(instance);
    let hasAsyncInjectors = false;

    // traverse injectors
    Object.keys(descriptors).forEach(propName => {
      const descriptor = descriptors[propName];
      if (descriptor.get) return; // don't execute getters
      const propValue = descriptor.value;
      if (!(propValue instanceof Injector)) return;
      const injector = propValue as Injector<unknown>;
      provider.injectors[injector.id] = injector;
      injector.setPropertyName(propName);
    });

    // call init() for injectors
    Object.values(this.injectors).forEach(injector => {
      injector.init();
      if (injector.loadingStatus !== 'done') hasAsyncInjectors = true;
    });

    if (!hasAsyncInjectors) this.handleInjectionsCompleted();
  }

  getMetadata(pluginName: string) {
    return this.metadata[pluginName];
  }

  setMetadata(pluginName: string, data: any) {
    this.metadata[pluginName] = data;
  }

  destroy() {
    // destroy provider
    // unsubscribe events
    this.events.events = {};
  }

  destroyInstance() {
    const instance = this.instance as any;
    if (!instance) return;

    // destroy instance
    instance.destroy && instance.destroy();
    this.initParams = [];

    // destroy injectors
    Object.keys(this.injectors).forEach(injectorName => {
      this.injectors[injectorName].destroy();
    });

    this.instance = null;
  }

  handleInjectorStatusChange(
    injector: Injector<unknown>,
    currentStatus: TInjectorLoadingStatus,
    prevStatus: TInjectorLoadingStatus,
  ) {
    this.events.emit('onInjectorStatusChange', injector, currentStatus, prevStatus);
    this.checkInjectionIsCompleted();
  }

  protected checkInjectionIsCompleted() {
    if (!this.injectionCompleted) {
      const injectors = Object.values(this.injectors);
      for (const injector of injectors) {
        if (injector.loadingStatus !== 'done') return;
      }
    }
    this.handleInjectionsCompleted();
  }

  protected handleInjectionsCompleted() {
    this.injectionCompleted = true;
    const instance = this.instance as any;
    const loadResult = instance.load && instance.load();
    if (loadResult?.then) {
      loadResult.then(() => {
        this.loadMethodCompleted = true;
        this.checkModuleIsLoaded();
      });
    } else {
      this.loadMethodCompleted = true;
      this.checkModuleIsLoaded();
    }
  }

  protected checkModuleIsLoaded() {
    if (!this.injectionCompleted) return;
    if (!this.loadMethodCompleted) return;
    const instance = this.instance as any;
    instance.onLoad && instance.onLoad();
    this.isLoaded = true;
    this.events.emit('onModuleLoaded');
  }

  events = createNanoEvents<ProviderEvents>();
}

export interface ProviderEvents {
  onInjectorStatusChange: (
    injector: Injector<unknown>,
    current: TInjectorLoadingStatus,
    prev: TInjectorLoadingStatus
  ) => unknown;
  onModuleLoaded: () => unknown,
}
