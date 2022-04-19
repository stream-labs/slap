import { TLoadingStatus, TModuleClass } from './interfaces';
import { defineGetter, generateId } from './utils';
import { getCurrentProvider } from './scope';
import { Provider } from './provider';

// TODO allow only StateView instances for TViewValue

export type InjectorParams<TValue, TView, TExtraView> = {
  type: Symbol;
  loadingStatus?: TLoadingStatus,
  init?(): TView;
  load?(): unknown;
  getValue?(): TValue;

  exportComponentData?(): InjectorComponentData<TView, TExtraView>;
  onDestroy?(): unknown;
}

export class Injector<TValue, TViewValue, TInjectedViewExtra = null> {
  id = generateId();
  params!: InjectorParams<TValue, TViewValue, TInjectedViewExtra>;
  loadingStatus: TLoadingStatus = 'not-started';
  propertyName = '';
  isDestroyed = false;

  constructor(public provider: Provider<any>) {
    provider.registerInjector(this);
  }

  init() {
    this.params.init && this.params.init();
  }

  load() {
    const load = this.params.load;
    const loadResult = load && load() as any;
    if (loadResult && loadResult.then) {
      this.setLoadingStatus('loading');
      loadResult.then(() => {
        this.setLoadingStatus('done');
      });
    } else {
      this.loadingStatus = 'done';
    }
  }

  setPropertyName(propertyName: string) {
    this.propertyName = propertyName;
    const getValue = this.params.getValue;
    if (getValue) {
      defineGetter(this.provider.instance, propertyName, getValue);
    }
  }

  setLoadingStatus(loadingStatus: TLoadingStatus) {
    if (this.isDestroyed) return;
    const prevStatus = this.loadingStatus;
    this.loadingStatus = loadingStatus;
    this.provider.handleInjectorStatusChange(this, this.loadingStatus, prevStatus);
  }

  onDestroy() {
    this.params.onDestroy && this.params.onDestroy();
    this.isDestroyed = true;
  }

  resolveValue(): TValue {
    return this.params.getValue!();
  }

  getComponentData(): InjectorComponentData<TViewValue, TInjectedViewExtra> {
    const componentData = this.params.exportComponentData && this.params.exportComponentData();
    if (!componentData) {
      return ({
        self: null as any,
        extra: null as any,
      });
    }
    return componentData;
  }

  get type() {
    return this.params.type;
  }
}

export type GetInjectedProp<
  TParams,
  TValue = TParams extends { getValue(): infer R } ? R : unknown,
  TView = TParams extends { exportComponentData(): { self: infer R }} ? R : unknown,
  TViewExtra = TParams extends { exportComponentData(): { extra: infer R }} ? R : unknown,
  > = InjectedProp<TValue, TView, TViewExtra>;

export function createInjector<TParams extends InjectorParams<any, any, any>>
(paramsCreator: (injector: Injector<any, any, any>) => TParams): GetInjectedProp<TParams> {
  const provider = getCurrentProvider();
  if (!provider) {
    throw new Error('Injections a not allowed for objects outside the Scope. Create this object via Scope.resolve() or Scope.init() or Scope.create()');
  }
  const injector = new Injector<unknown, unknown, unknown>(provider);
  injector.params = paramsCreator(injector);
  injector.init();
  const value = injector.resolveValue();
  const returnValue = value instanceof Object ? value : {};
  const injectorProxy = new Proxy(returnValue, {
    get(target, p) {
      return p === '__injector' ? injector : (target as any)[p];
    },
  });
  return injectorProxy as any as GetInjectedProp<TParams>;
}

// DEFINE BUILT-IN INJECTORS

export const ModuleInjectorType = Symbol('moduleInjector');

export function inject<T extends TModuleClass>(ModuleClass: T) {
  return createInjector(injector => ({
    type: ModuleInjectorType,
    getValue: () => injector.provider.scope.resolve(ModuleClass),
  }));
}

export const ScopeInjectorType = Symbol('providerInjector');

export function injectScope() {
  return createInjector(injector => ({
    type: ScopeInjectorType,
    getValue: () => injector.provider.scope,
  }));
}


export const ProviderInjectorType = Symbol('providerInjector');
export function injectProvider() {
  return createInjector(injector => ({
    type: ProviderInjectorType,
    getValue: () => injector.provider,
  }));
}


export type InjectedProp<TValue, TView, TExtraView> = TValue & { __injector: Injector<TValue, TView, TExtraView> }

export type InjectorComponentData<TView, TExtraView> = {
  self: TView,
  extra: TExtraView,
}
