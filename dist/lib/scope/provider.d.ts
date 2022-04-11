import { Scope } from './scope';
import { Dict } from './utils';
import { Injector } from './injector';
import { TLoadingStatus } from './interfaces';
export declare class Provider<TInstance, TInitParams extends [] = []> {
    scope: Scope;
    name: string;
    options: Partial<ProviderOptions>;
    id: string;
    instance: TInstance | null;
    metadata: Dict<any>;
    injectors: Dict<Injector<unknown, unknown>>;
    injectorsByProp: Dict<Injector<unknown, unknown>>;
    factory: (args: TInitParams) => TInstance;
    isInited: boolean;
    injectionCompleted: boolean;
    loadMethodCompleted: boolean;
    isAsync: boolean;
    isLoaded: boolean;
    private resolveLoad;
    waitForLoad: Promise<unknown>;
    initParams?: TInitParams;
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
    setMetadata(pluginName: string, data: any): void;
    destroy(): void;
    destroyInstance(): void;
    handleInjectorStatusChange(injector: Injector<unknown, unknown>, currentStatus: TLoadingStatus, prevStatus: TLoadingStatus): void;
    protected checkInjectionIsCompleted(): void;
    protected handleInjectionsCompleted(): void;
    protected checkModuleIsLoaded(): void;
    get instanceId(): string;
    events: import("nanoevents").Emitter<ProviderEvents>;
}
export declare function createInstanceMetadata(instance: any, provider: Provider<any, any>): void;
export declare function getInstanceMetadata(instance: any): {
    provider: Provider<any, []>;
    id: string;
};
export interface ProviderEvents {
    onInjectorStatusChange: (injector: Injector<unknown, unknown>, current: TLoadingStatus, prev: TLoadingStatus) => unknown;
    onModuleInit: () => unknown;
    onModuleLoaded: () => unknown;
}
export declare type ProviderOptions = {
    shouldCallHooks: boolean;
};
