import { TLoadingStatus, TModuleClass } from './interfaces';
import { generateId } from './utils';
import { getCurrentProvider, getCurrentScope } from './scope';
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


// TODO: remove
export class Injector<TValue, TViewValue, TInjectedViewExtra = null> {
  id = generateId();
  params!: InjectorParams<TValue, TViewValue, TInjectedViewExtra>;
  loadingStatus: TLoadingStatus = 'not-started';
  propertyName = '';
  isDestroyed = false;


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


export function inject<T extends TModuleClass>(ModuleClass: T) {
  const provider = injectProvider();
  const module = provider.injectModule(ModuleClass);
  return module;
}

export function injectScope() {
  return getCurrentScope()!;
}

export function injectProvider(): Provider<any> {
  return getCurrentProvider()!;
}

export type InjectedProp<TValue, TView, TExtraView> = TValue & { __injector: Injector<TValue, TView, TExtraView> }

export type InjectorComponentData<TView, TExtraView> = {
  self: TView,
  extra: TExtraView,
}
