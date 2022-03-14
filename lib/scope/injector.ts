import { TModuleClass } from './interfaces';
import { generateId } from './utils';
import { getCurrentProvider } from './scope';
import { Provider } from './provider';

export type TInjectorParams<T> = {
  type: Symbol;
  loadingStatus?: TInjectorLoadingStatus,
  init?(injector: Injector<T>): unknown;
  load?(injector: Injector<T>): unknown;
  getValue?(): T;
  destroy?(currentInjector: Injector<T>): unknown;
}

export type TInjectorLoadingStatus = 'not-started' | 'loading' | 'done' | 'error';

export class Injector<T> {
  id = generateId();
  params!: TInjectorParams<T>;
  loadingStatus: TInjectorLoadingStatus = 'not-started';
  propertyName = '';
  constructor(public provider: Provider<any>) {
  }

  init() {
    this.params.init && this.params.init(this);
    const getValue = this.params.getValue;
    if (getValue) {
      Object.defineProperty(this.provider.instance, this.propertyName, {
        get() {
          return getValue();
        },
        enumerable: true,
      });
    }

    const load = this.params.load;
    const loadResult = load && load(this) as any;
    if (loadResult && loadResult.then) {
      this.setLoadingStatus('loading');
      loadResult.then(() => {
        this.setLoadingStatus('done');
      });
    } else if (load) {
      this.loadingStatus = 'not-started';
    } else {
      this.loadingStatus = 'done';
    }

  }

  setPropertyName(propertyName: string) {
    this.propertyName = propertyName;
  }

  setLoadingStatus(loadingStatus: TInjectorLoadingStatus) {
    const prevStatus = this.loadingStatus;
    this.loadingStatus = loadingStatus;
    this.provider.handleInjectorStatusChange(this, this.loadingStatus, prevStatus);
  }

  destroy() {
    this.params.destroy && this.params.destroy(this);
  }

  resolveValue(): T {
    return this.provider.instance[this.propertyName];
  }

  get type() {
    return this.params.type;
  }
}

export function createInjector<TParams extends TInjectorParams<any>, TValue = TParams extends { getValue(): infer R} ? R : unknown>(paramsCreator: (injector: Injector<any>) => TParams) {
  const provider = getCurrentProvider();
  if (!provider) {
    throw new Error('Injections a not allowed for objects outside the Scope. Create this object via Scope.resolve() or Scope.init() or Scope.create()');
  }
  const injector = new Injector<TValue>(provider);
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
