import { TInstances, TModuleConstructorMap } from './store';
export declare type TProvider = {
    factory: TModuleClass;
    instance: InstanceType<TModuleClass>;
    name: string;
    initParams: any[];
    scope: Scope;
    readonly pluginData: Record<string, any>;
};
export declare type TModuleClass = new (...args: any) => any;
export declare class Scope {
    id: string;
    parent: Scope | null;
    constructor(dependencies?: TModuleConstructorMap, parentScope?: Scope | null);
    childScopes: Record<string, Scope>;
    registry: Record<string, TProvider>;
    resolve<T extends TModuleClass>(moduleClassOrName: T | string): InstanceType<T>;
    register(ModuleClass: TModuleClass, name?: string): void;
    registerMany(dependencies: TModuleConstructorMap): void;
    unregister(ModuleClass: TModuleClass): void;
    isRegistered(moduleClassOrName: TModuleClass | string): boolean;
    hasInstance(moduleClassOrName: TModuleClass | string): boolean;
    /**
     * Instantiate a registered module
     */
    init<TServiceClass extends new (...args: any) => any>(moduleClassOrName: TServiceClass | string, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass>;
    create<TServiceClass extends new (...args: any) => any>(ModuleClass: TServiceClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass>;
    private exec;
    createScope(dependencies?: TModuleConstructorMap): Scope;
    registerScope(dependencies?: TModuleConstructorMap): Scope;
    unregisterScope(scopeId: string): void;
    getRootScope(): Scope;
    destroy(): void;
    resolveProvider(moduleClasOrName: TModuleClass | string): TProvider | null;
    setPluginData(moduleClasOrName: TModuleClass | string, pluginName: string, data: any): void;
    getScheme(): any;
    removeInstance(moduleClassOrName: TModuleClass | string): void;
    get isRoot(): boolean;
    events: import("nanoevents").Emitter<ScopeEvents>;
}
export interface ScopeEvents {
    onModuleInit: (provider: TProvider) => void;
    onModuleRegister: (provider: TProvider) => void;
}
export declare function inject<T extends TModuleConstructorMap>(dependencies: T): TInstances<T>;
export declare function injectState<TModuleClass extends new (...args: any) => any>(StatefulModule: TModuleClass): InstanceType<TModuleClass>['state'];
export declare function injectScope(): Scope;
export declare function assertInjectIsAllowed(): void;
