import { TLoadingStatus, TModuleClass } from './interfaces';
import { Provider } from './provider';
export declare type TInjectorParams<TValue, TViewValue> = {
    type: Symbol;
    loadingStatus?: TLoadingStatus;
    init?(injector: Injector<TValue, TViewValue>): TViewValue;
    load?(injector: Injector<TValue, TViewValue>): unknown;
    getValue?(): TValue;
    getViewValue?(): TViewValue;
    destroy?(currentInjector: Injector<TValue, TViewValue>): unknown;
};
export declare class Injector<TValue, TViewValue> {
    provider: Provider<any>;
    id: string;
    params: TInjectorParams<TValue, TViewValue>;
    loadingStatus: TLoadingStatus;
    propertyName: string;
    isDestroyed: boolean;
    constructor(provider: Provider<any>);
    init(): void;
    setPropertyName(propertyName: string): void;
    setLoadingStatus(loadingStatus: TLoadingStatus): void;
    destroy(): void;
    resolveValue(): TValue;
    hasViewValue(): boolean;
    resolveViewValue(): TViewValue;
    get type(): Symbol;
}
export declare function createInjector<TParams extends TInjectorParams<any, any>, TValue = TParams extends {
    getValue(): infer R;
} ? R : unknown, TViewValue = TParams extends {
    getViewValue(): infer R;
} ? R : unknown>(paramsCreator: (injector: Injector<any, any>) => TParams): InjectedProp<TValue, TViewValue>;
export declare const ModuleInjectorType: unique symbol;
export declare function inject<T extends TModuleClass>(ModuleClass: T): InjectedProp<import("./interfaces").TModuleInstanceFor<T>, unknown>;
export declare const ScopeInjectorType: unique symbol;
export declare function injectScope(): InjectedProp<import("./scope").Scope, unknown>;
export declare type InjectedProp<TInjectedValue, TInjectedView> = TInjectedValue & {
    __injector: Injector<TInjectedValue, TInjectedView>;
};
