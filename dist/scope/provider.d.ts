import { Scope } from './scope';
import { Dict } from './utils';
import { GetModuleInstanceFor, InjectableModuleTyped, TModuleCreator, TProviderFor } from './interfaces';
export declare class Provider<TInstance, TInitParams extends [] = []> {
    scope: Scope;
    creator: (new (...args: TInitParams) => TInstance) | ((...args: TInitParams) => TInstance) | TInstance;
    name: string;
    options: Partial<ProviderOptions>;
    id: string;
    instance: TInstance | null;
    metadata: Dict<any>;
    factory: (args: TInitParams) => TInstance;
    isInited: boolean;
    isDestroyed: boolean;
    childScope: Scope | null;
    childModules: Dict<InjectableModuleTyped<any, any, any>>;
    injectedModules: Dict<InjectableModuleTyped<any, any, any>>;
    constructor(scope: Scope, creator: (new (...args: TInitParams) => TInstance) | ((...args: TInitParams) => TInstance) | TInstance, name?: string, options?: Partial<ProviderOptions>);
    createInstance(args: TInitParams): TInstance;
    mountModule(): void;
    getMetadata(pluginName: string): any;
    setMetadata(pluginName: string, data: any): any;
    destroy(): void;
    destroyInstance(): void;
    get instanceId(): string;
    resolveChildScope(): Scope;
    resolveChildProvider<T extends TModuleCreator>(ModuleCreator: T, name: string): TProviderFor<T>;
    injectModule<T extends TModuleCreator>(ModuleLocator: T): GetModuleInstanceFor<T>;
    injectChildModule<T extends TModuleCreator>(ModuleCreator: T, ...args: any): any;
    events: import("nanoevents").Emitter<ProviderEvents>;
}
export declare function createInstanceMetadata(instance: any, provider: Provider<any, any>): void;
export declare function getInstanceMetadata(instance: any): {
    provider: Provider<any, []>;
    id: string;
};
export declare const moduleSystemProps: Dict<boolean>;
export interface ProviderEvents {
    onBeforeInit: (provider: Provider<any>) => unknown;
    onAfterInit: (provider: Provider<any>) => unknown;
}
export declare type ProviderOptions = {
    /**
     * Should call lifecycle hooks: init, load, onLoad
     */
    shouldCallHooks: boolean;
    /**
     * Keeps parentProvider if the module has been injected as a child module
     */
    parentProvider: Provider<any>;
};
