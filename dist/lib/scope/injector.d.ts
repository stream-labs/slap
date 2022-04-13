import { TLoadingStatus, TModuleClass } from './interfaces';
import { Provider } from './provider';
export declare type TInjectorParams<TValue, TView, TExtraView> = {
    type: Symbol;
    loadingStatus?: TLoadingStatus;
    init?(): TView;
    load?(): unknown;
    getValue?(): TValue;
    exportComponentData?(): InjectorComponentData<TView, TExtraView>;
    destroy?(currentInjector: Injector<TValue, TView, TExtraView>): unknown;
};
export declare class Injector<TValue, TViewValue, TInjectedViewExtra = null> {
    provider: Provider<any>;
    id: string;
    params: TInjectorParams<TValue, TViewValue, TInjectedViewExtra>;
    loadingStatus: TLoadingStatus;
    propertyName: string;
    isDestroyed: boolean;
    constructor(provider: Provider<any>);
    init(): void;
    setPropertyName(propertyName: string): void;
    setLoadingStatus(loadingStatus: TLoadingStatus): void;
    destroy(): void;
    resolveValue(): TValue;
    getComponentData(): InjectorComponentData<TViewValue, TInjectedViewExtra>;
    get type(): Symbol;
}
export declare function createInjector<TParams extends TInjectorParams<any, any, any>, TValue = TParams extends {
    getValue(): infer R;
} ? R : unknown, TView = TParams extends {
    getView(): infer R;
} ? R : unknown, TViewExtra = TParams extends {
    getExtraView(): infer R;
} ? R : null>(paramsCreator: (injector: Injector<any, any, any>) => TParams): InjectedProp<TValue, TView, TViewExtra>;
export declare const ModuleInjectorType: unique symbol;
export declare function inject<T extends TModuleClass>(ModuleClass: T): InjectedProp<import("./interfaces").TModuleInstanceFor<T>, unknown, null>;
export declare const ScopeInjectorType: unique symbol;
export declare function injectScope(): InjectedProp<import("./scope").Scope, unknown, null>;
export declare const ProviderInjectorType: unique symbol;
export declare function injectProvider(): InjectedProp<Provider<any, []>, unknown, null>;
export declare type InjectedProp<TValue, TView, TExtraView> = TValue & {
    __injector: Injector<TValue, TView, TExtraView>;
};
export declare type InjectorComponentData<TView, TExtraView> = {
    self: TView;
    extra: TExtraView;
};
