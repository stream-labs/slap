import { Scope } from './scope';
import { Dict } from './utils';
import { Injector } from './injector';
import { TLoadingStatus } from './interfaces';
export declare class Provider<TInstance, TInitParams extends [] = []> {
    scope: Scope;
    name: string;
    id: string;
    instance: TInstance | null;
    metadata: Dict<any>;
    injectors: Dict<Injector<unknown, unknown>>;
    factory: (args: TInitParams) => TInstance;
    isInited: boolean;
    injectionCompleted: boolean;
    loadMethodCompleted: boolean;
    isLoaded: boolean;
    private resolveLoad;
    waitForLoad: Promise<unknown>;
    initParams?: TInitParams;
    constructor(scope: Scope, creator: (new (...args: TInitParams) => TInstance) | ((...args: TInitParams) => TInstance) | TInstance, name?: string);
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
export declare function getInstanceMetadata(instance: any): {
    provider: Provider<any, []>;
    id: string;
};
export interface ProviderEvents {
    onInjectorStatusChange: (injector: Injector<unknown, unknown>, current: TLoadingStatus, prev: TLoadingStatus) => unknown;
    onModuleLoaded: () => unknown;
}
