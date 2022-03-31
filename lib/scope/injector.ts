import { TLoadingStatus, TModuleClass } from './interfaces';
import { defineGetter, generateId } from './utils';
import { getCurrentProvider } from './scope';
import { Provider } from './provider';

export type TInjectorParams<TValue, TInitValue> = {
  type: Symbol;
  loadingStatus?: TLoadingStatus,
  init?(injector: Injector<TValue, TInitValue>): TInitValue;
  load?(injector: Injector<TValue, TInitValue>): unknown;
  getValue?(): TValue;
  destroy?(currentInjector: Injector<TValue, TInitValue>): unknown;
}

export class Injector<TValue, TInitValue> {
  id = generateId();
  params!: TInjectorParams<TValue, TInitValue>;
  loadingStatus: TLoadingStatus = 'not-started';
  propertyName = '';

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
    const prevStatus = this.loadingStatus;
    this.loadingStatus = loadingStatus;
    this.provider.handleInjectorStatusChange(this, this.loadingStatus, prevStatus);
  }

  destroy() {
    this.params.destroy && this.params.destroy(this);
  }

  resolveValue(): TValue {
    return this.provider.instance[this.propertyName];
  }

  get type() {
    return this.params.type;
  }
}

export function createInjector<
  TParams extends TInjectorParams<any, any>,
  TValue = TParams extends { getValue(): infer R} ? R : unknown,
  TInitParams = TParams extends { init(): infer R} ? R : unknown
  >
(paramsCreator: (injector: Injector<any, any>) => TParams) {
  const provider = getCurrentProvider();
  if (!provider) {
    throw new Error('Injections a not allowed for objects outside the Scope. Create this object via Scope.resolve() or Scope.init() or Scope.create()');
  }
  const injector = new Injector<TValue, TInitParams>(provider);
  injector.params = paramsCreator(injector);
  return injector as any as TValue;
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
