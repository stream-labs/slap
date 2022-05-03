import { TLoadingStatus, TModuleClass } from './interfaces';
import { Provider } from './provider';
export declare type InjectorParams<TValue, TView, TExtraView> = {
    type: Symbol;
    loadingStatus?: TLoadingStatus;
    init?(): TView;
    load?(): unknown;
    getValue?(): TValue;
    exportComponentData?(): InjectorComponentData<TView, TExtraView>;
    onDestroy?(): unknown;
};
export declare class Injector<TValue, TViewValue, TInjectedViewExtra = null> {
    id: string;
    params: InjectorParams<TValue, TViewValue, TInjectedViewExtra>;
    loadingStatus: TLoadingStatus;
    propertyName: string;
    isDestroyed: boolean;
    resolveValue(): TValue;
    getComponentData(): InjectorComponentData<TViewValue, TInjectedViewExtra>;
    get type(): Symbol;
}
export declare function inject<T extends TModuleClass>(ModuleClass: T): import("./interfaces").GetModuleInstanceFor<T>;
export declare function injectScope(): import("./scope").Scope;
export declare function injectProvider(): Provider<any>;
export declare type InjectedProp<TValue, TView, TExtraView> = TValue & {
    __injector: Injector<TValue, TView, TExtraView>;
};
export declare type InjectorComponentData<TView, TExtraView> = {
    self: TView;
    extra: TExtraView;
};
