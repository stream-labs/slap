import { TLoadingStatus, TModuleClass } from './interfaces';
import { defineGetter, generateId } from './utils';
import { getCurrentProvider } from './scope';
import { Provider } from './provider';

// TODO allow only StateView instances for TViewValue

export type TInjectorParams<TValue, TViewValue> = {
  type: Symbol;
  loadingStatus?: TLoadingStatus,
  init?(injector: Injector<TValue, TViewValue>): TViewValue;
  load?(injector: Injector<TValue, TViewValue>): unknown;
  getValue?(): TValue;
  getViewValue?(): TViewValue;
  destroy?(currentInjector: Injector<TValue, TViewValue>): unknown;
}

export class Injector<TValue, TViewValue> {
  id = generateId();
  params!: TInjectorParams<TValue, TViewValue>;
  loadingStatus: TLoadingStatus = 'not-started';
  propertyName = '';
  isDestroyed = false;

  constructor(public provider: Provider<any>) {
  }

  init() {
    this.params.init && this.params.init(this);
    const getValue = this.params.getValue;
    if (getValue) {
      defineGetter(this.provider.instance, this.propertyName, getValue);
    }

    const load = this.params.load;
    const loadResult = load && load(this) as any;
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
  }

  setLoadingStatus(loadingStatus: TLoadingStatus) {
    if (this.isDestroyed) return;
    const prevStatus = this.loadingStatus;
    this.loadingStatus = loadingStatus;
    this.provider.handleInjectorStatusChange(this, this.loadingStatus, prevStatus);
  }

  destroy() {
    this.params.destroy && this.params.destroy(this);
    this.isDestroyed = true;
  }

  resolveValue(): TValue {
    return this.provider.instance[this.propertyName];
  }

  hasViewValue() {
    return !!this.params.getViewValue;
  }

  resolveViewValue(): TViewValue {
    return this.params.getViewValue
      ? this.params.getViewValue()
      : this.resolveValue() as any;
  }

  get type() {
    return this.params.type;
  }
}

export function createInjector<
  TParams extends TInjectorParams<any, any>,
  TValue = TParams extends { getValue(): infer R} ? R : unknown,
  TViewValue = TParams extends { getViewValue(): infer R} ? R : unknown,
  >
(paramsCreator: (injector: Injector<any, any>) => TParams) {
  const provider = getCurrentProvider();
  if (!provider) {
    throw new Error('Injections a not allowed for objects outside the Scope. Create this object via Scope.resolve() or Scope.init() or Scope.create()');
  }
  const injector = new Injector<TValue, TViewValue>(provider);
  injector.params = paramsCreator(injector);
  return injector as any as InjectedProp<TValue, TViewValue>;
}

// DEFINE BUILT-IN INJECTORS

export const ModuleInjectorType = Symbol('moduleInjector');

export function inject<T extends TModuleClass>(ModuleClass: T) {
  return createInjector(injector => ({
    type: ModuleInjectorType,
    getValue: () => injector.provider.scope.resolve(ModuleClass),
  }));
}

export const ScopeInjectorType = Symbol('scopeInjector');

export function injectScope() {
  return createInjector(injector => ({
    type: ScopeInjectorType,
    getValue: () => injector.provider.scope,
  }));
}

export type InjectedProp<TInjectedValue, TInjectedView> = TInjectedValue & { __injector: Injector<TInjectedValue, TInjectedView> }
