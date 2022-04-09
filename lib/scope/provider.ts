import { createNanoEvents } from 'nanoevents';
import { isPlainObject } from 'is-plain-object';
import { Scope } from './scope';
import { defineGetter, Dict, generateId, isClass } from './utils';
import { Injector } from './injector';
import { TLoadingStatus } from './interfaces';

export class Provider<TInstance, TInitParams extends [] = []> {
  id: string;
  instance: TInstance | null = null;
  metadata: Dict<any> = {};
  injectors: Dict<Injector<unknown, unknown>> = {}; // dict of injectors by id
  injectorsByProp: Dict<Injector<unknown, unknown>> = {}; // dict of injectors by propName
  factory: (args: TInitParams) => TInstance;

  isInited = false; // instance is added to Scope
  // private resolveInit!: Function;
  // waitForInit = new Promise(resolve => { this.resolveInit = resolve });

  injectionCompleted = false;
  loadMethodCompleted = false;
  isAsync = false;

  isLoaded = false;
  private resolveLoad!: Function;
  waitForLoad = new Promise(resolve => { this.resolveLoad = resolve; });

  initParams?: TInitParams; // TODO

  constructor(
    public scope: Scope,
    creator: (new (...args: TInitParams) => TInstance) | ((...args: TInitParams) => TInstance) | TInstance,
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

  createInstance(args: TInitParams): TInstance {
    const instance = this.factory(args) as any;
    this.instance = instance;
    this.initParams = args;
    createInstanceMetadata(instance, this);

    if (this.options.shouldCallHooks) {
      instance.init && instance.init();
    }

    this.resolveInjectors();
    return instance;
  }

  setInited() {
    this.isInited = true;
    this.events.emit('onModuleInit');
    this.checkModuleIsLoaded();
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

    // register injectors
    Object.keys(descriptors).forEach(propName => {
      const descriptor = descriptors[propName];
      if (descriptor.get) return; // don't execute getters
      const propValue = descriptor.value;
      if (!(propValue instanceof Injector)) return;
      const injector = propValue as Injector<unknown, unknown>;
      provider.injectors[injector.id] = injector;
      provider.injectorsByProp[propName] = injector;
      injector.setPropertyName(propName);
    });

    // call init() for injectors
    Object.values(this.injectors).forEach(injector => {
      injector.init();
      if (injector.loadingStatus !== 'done') hasAsyncInjectors = true;
    });

    if (hasAsyncInjectors) {
      this.isAsync = true;
    } else {
      this.handleInjectionsCompleted();
    }
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
    this.initParams = [] as any;

    // destroy injectors
    Object.keys(this.injectors).forEach(injectorName => {
      this.injectors[injectorName].destroy();
    });

    this.instance = null;
    this.isInited = false;
  }

  handleInjectorStatusChange(
    injector: Injector<unknown, unknown>,
    currentStatus: TLoadingStatus,
    prevStatus: TLoadingStatus,
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

    if (this.options.shouldCallHooks) {
      const instance = this.instance as any;
      const loadResult = instance.load && instance.load();
      if (loadResult?.then) {
        this.isAsync = true;
        loadResult.then(() => {
          this.loadMethodCompleted = true;
          this.checkModuleIsLoaded();
        });
        return;
      }
    }

    this.loadMethodCompleted = true;
    this.checkModuleIsLoaded();
  }

  protected checkModuleIsLoaded() {
    if (!this.isInited) return;
    if (!this.injectionCompleted) return;
    if (!this.loadMethodCompleted) return;

    if (this.options.shouldCallHooks) {
      const instance = this.instance as any;
      instance.onLoad && instance.onLoad();
    }

    this.isLoaded = true;
    this.resolveLoad();
    this.events.emit('onModuleLoaded');
  }

  get instanceId() {
    return getInstanceMetadata(this.instance).id;
  }

  events = createNanoEvents<ProviderEvents>();
}

function createInstanceMetadata(instance: any, provider: Provider<any, any>) {
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

export interface ProviderEvents {
  onInjectorStatusChange: (
    injector: Injector<unknown, unknown>,
    current: TLoadingStatus,
    prev: TLoadingStatus
  ) => unknown;
  onModuleInit: () => unknown,
  onModuleLoaded: () => unknown,
}

export type ProviderOptions = {
  shouldCallHooks: boolean;
}
