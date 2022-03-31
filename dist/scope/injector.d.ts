import { TLoadingStatus, TModuleClass } from './interfaces';
import { Provider } from './provider';
export declare type TInjectorParams<TValue, TInitValue> = {
    type: Symbol;
    loadingStatus?: TLoadingStatus;
    init?(injector: Injector<TValue, TInitValue>): TInitValue;
    load?(injector: Injector<TValue, TInitValue>): unknown;
    getValue?(): TValue;
    destroy?(currentInjector: Injector<TValue, TInitValue>): unknown;
};
export declare class Injector<TValue, TInitValue> {
    provider: Provider<any>;
    id: string;
    params: TInjectorParams<TValue, TInitValue>;
    loadingStatus: TLoadingStatus;
    propertyName: string;
    constructor(provider: Provider<any>);
    init(): void;
    setPropertyName(propertyName: string): void;
    setLoadingStatus(loadingStatus: TLoadingStatus): void;
    destroy(): void;
    resolveValue(): TValue;
    get type(): Symbol;
}
export declare function createInjector<TParams extends TInjectorParams<any, any>, TValue = TParams extends {
    getValue(): infer R;
} ? R : unknown, TInitParams = TParams extends {
    init(): infer R;
} ? R : unknown>(paramsCreator: (injector: Injector<any, any>) => TParams): TValue;
export declare const ModuleInjectorType: unique symbol;
export declare function inject<T extends TModuleClass>(ModuleClass: T): import("./interfaces").TModuleInstanceFor<T>;
export declare const ScopeInjectorType: unique symbol;
export declare function injectScope(): import("./scope").Scope;
