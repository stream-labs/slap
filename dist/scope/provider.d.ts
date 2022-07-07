import { Scope } from './scope';
import { Dict } from './utils';
import { GetModuleInstanceFor, InjectableModuleTyped, TModuleCreator, TProviderFor } from './interfaces';
/**
 * Providers initialize modules and keeps their metadata
 */
export declare class Provider<TInstance, TInitParams extends [] = []> {
    scope: Scope;
    creator: (new (...args: TInitParams) => TInstance) | ((...args: TInitParams) => TInstance) | TInstance;
    name: string;
    options: Partial<ProviderOptions>;
    /**
     * Uniq id for the provider
     */
    id: string;
    /**
     * Keeps module's instance
     */
    instance: TInstance | null;
    /**
     * keeps user's metadata
     */
    metadata: Dict<any>;
    /**
     * function that constructs a new module
     */
    factory: (args: TInitParams) => TInstance;
    /**
     * true if instance is initialized and added to the Scope
     */
    isInited: boolean;
    /**
     * true if instance is initialized and added to the Scope
     */
    isDestroyed: boolean;
    /**
     * Keeps information about all injected modules
     */
    injectedModules: Dict<{
        instance: InjectableModuleTyped<any, any, any>;
        options: InjectedPropOptions;
    }>;
    /**
     * Keeps information about all child modules.
     * Child modules are kind of injected modules with the same lifecycle of the parent module
     */
    childModules: Dict<InjectableModuleTyped<any, any, any>>;
    /**
     * Keeps a child scope if the provider has created one
     */
    childScope: Scope | null;
    constructor(scope: Scope, creator: (new (...args: TInitParams) => TInstance) | ((...args: TInitParams) => TInstance) | TInstance, name?: string, options?: Partial<ProviderOptions>);
    /**
     * Creates a module instance
     * @param args
     */
    createInstance(args: TInitParams): TInstance;
    /**
     * Init all injected modules
     */
    mountModule(): void;
    getMetadata(pluginName: string): any;
    setMetadata(pluginName: string, data: any): any;
    destroy(): void;
    destroyInstance(): void;
    get instanceId(): string;
    /**
     * Returns a child scope. Creates a new one if not exist
     */
    resolveChildScope(): Scope;
    /**
     * Resolves a provider for the module in the child scope
     */
    resolveChildProvider<T extends TModuleCreator>(ModuleCreator: T, name: string): TProviderFor<T>;
    /**
     * Inject a module into the current module
     */
    injectModule<T extends TModuleCreator>(ModuleLocator: T, options?: InjectedPropOptions): GetModuleInstanceFor<T>;
    /**
     * Inject a child module into the current module
     */
    injectChildModule<T extends TModuleCreator>(ModuleCreator: T, ...args: any): any;
    events: import("nanoevents").Emitter<ProviderEvents>;
}
/**
 * Attaches a metadata for the module instance
 */
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
export declare type InjectedPropOptions = {
    /**
     * true if should expose props in the component selector when injected as a property
     */
    isExposed?: boolean;
};
