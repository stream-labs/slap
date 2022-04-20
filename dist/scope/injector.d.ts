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
    provider: Provider<any>;
    id: string;
    params: InjectorParams<TValue, TViewValue, TInjectedViewExtra>;
    loadingStatus: TLoadingStatus;
    propertyName: string;
    isDestroyed: boolean;
    constructor(provider: Provider<any>);
    init(): void;
    load(): void;
    setPropertyName(propertyName: string): void;
    setLoadingStatus(loadingStatus: TLoadingStatus): void;
    resolveValue(): TValue;
    getComponentData(): InjectorComponentData<TViewValue, TInjectedViewExtra>;
    get type(): Symbol;
}
export declare type GetInjectedProp<TParams, TValue = TParams extends {
    getValue(): infer R;
} ? R : unknown, TView = TParams extends {
    exportComponentData(): {
        self: infer R;
    };
} ? R : unknown, TViewExtra = TParams extends {
    exportComponentData(): {
        extra: infer R;
    };
} ? R : unknown> = InjectedProp<TValue, TView, TViewExtra>;
export declare function createInjector<TParams extends InjectorParams<any, any, any>>(paramsCreator: (injector: Injector<any, any, any>) => TParams): GetInjectedProp<TParams>;
export declare const ModuleInjectorType: unique symbol;
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
