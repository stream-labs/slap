import { Scope } from './scope';
import { Dict } from './utils';
import { Injector } from './injector';
import { TLoadingStatus, TModuleCreator, TProviderFor } from './interfaces';
export declare class Provider<TInstance, TInitParams extends [] = []> {
    scope: Scope;
    name: string;
    options: Partial<ProviderOptions>;
    id: string;
    instance: TInstance | null;
    metadata: Dict<any>;
    injectors: Dict<Injector<unknown, unknown, unknown>>;
    factory: (args: TInitParams) => TInstance;
    isInited: boolean;
    injectionCompleted: boolean;
    loadMethodCompleted: boolean;
    isAsync: boolean;
    isLoaded: boolean;
    private resolveLoad;
    waitForLoad: Promise<unknown>;
    initParams?: TInitParams;
    childScope: Scope | null;
    constructor(scope: Scope, creator: (new (...args: TInitParams) => TInstance) | ((...args: TInitParams) => TInstance) | TInstance, name?: string, options?: Partial<ProviderOptions>);
    createInstance(args: TInitParams): TInstance;
    setInited(): void;
    /**
     * Resolve injectors for just created object
     *
     *  WARNING!
     *  this code is executed for every object creation
     *  and should care about performance
     */
    private resolveInjectors;
    getMetadata(pluginName: string): any;
    setMetadata(pluginName: string, data: any): any;
    destroy(): void;
    destroyInstance(): void;
    handleInjectorStatusChange(injector: Injector<unknown, unknown, unknown>, currentStatus: TLoadingStatus, prevStatus: TLoadingStatus): void;
    protected checkInjectionIsCompleted(): void;
    protected handleInjectionsCompleted(): void;
    protected checkModuleIsLoaded(): void;
    get instanceId(): string;
    resolveChildScope(): Scope;
    resolveChildProvider<T extends TModuleCreator>(ModuleCreator: T, name: string): TProviderFor<T>;
    events: import("nanoevents").Emitter<ProviderEvents>;
}
export declare function createInstanceMetadata(instance: any, provider: Provider<any, any>): void;
export declare function getInstanceMetadata(instance: any): {
    provider: Provider<any, []>;
    id: string;
};
export interface ProviderEvents {
    onInjectorStatusChange: (injector: Injector<unknown, unknown, unknown>, current: TLoadingStatus, prev: TLoadingStatus) => unknown;
    onModuleInit: () => unknown;
    onModuleLoaded: () => unknown;
}
export declare type ProviderOptions = {
    shouldCallHooks: boolean;
    parentProvider: Provider<any>;
};
