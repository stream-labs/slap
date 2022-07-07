import { TModuleConstructorMap, TModuleCreator, GetModuleInstanceFor, TModuleLocatorType, TProviderFor } from './interfaces';
import { Provider, ProviderOptions } from './provider';
interface ScopeSettings {
    parentScope: Scope | null;
    autoregister: boolean;
    providerOptions?: Partial<ProviderOptions>;
}
/**
 * A Dependency injection container
 */
export declare class Scope {
    id: string;
    /**
     * Keeps all registered providers
     */
    providers: Record<string, Provider<any>>;
    /**
     * Keeps all registered child scopes
     */
    childScopes: Record<string, Scope>;
    settings: ScopeSettings;
    constructor(dependencies?: TModuleConstructorMap, settings?: Partial<ScopeSettings>);
    registerMany(dependencies: TModuleConstructorMap): void;
    register<T extends TModuleCreator>(ModuleCreator: T, name?: string, options?: Partial<ProviderOptions>): TProviderFor<T>;
    getProvider<T extends TModuleLocatorType>(moduleLocator: T): TProviderFor<T> | null;
    resolveProvider<T extends TModuleLocatorType>(moduleLocator: T): TProviderFor<T>;
    getInstance<T extends TModuleLocatorType>(locator: T): GetModuleInstanceFor<T> | null;
    resolve<T extends TModuleLocatorType>(locator: T): GetModuleInstanceFor<T>;
    unregister<T extends TModuleLocatorType>(locator: T): void;
    isRegistered(moduleLocator: TModuleLocatorType): boolean;
    hasInstance(moduleLocator: TModuleLocatorType): boolean;
    /**
     * Instantiate a registered module
     * TODO type for args
     */
    init<T extends TModuleLocatorType>(locator: T, ...args: any[]): GetModuleInstanceFor<T>;
    /**
     * create the instance and resolve injections
     * every time returns a new instance
     */
    create<TLocator extends TModuleLocatorType>(locator: TLocator, ...args: any): GetModuleInstanceFor<TLocator>;
    createChildScope(dependencies?: TModuleConstructorMap, settings?: Omit<Partial<ScopeSettings>, 'parentScope'>): Scope;
    /**
     * Register a child scope
     */
    registerScope(dependencies?: TModuleConstructorMap, settings?: Partial<Scope['settings']>): Scope;
    /**
     * Unregister a child scope
     */
    unregisterScope(scopeId: string): void;
    getRootScope(): Scope;
    /**
     * Destroy current scope and all providers
     */
    dispose(): void;
    /**
     * Could be usefull for debugging
     */
    getScheme(): any;
    /**
     * Returns true if it doesn't have parent scopes
     */
    get isRoot(): boolean;
    get parent(): Scope | null;
    events: import("nanoevents").Emitter<ScopeEvents>;
}
export interface ScopeEvents {
    onModuleRegister: (provider: Provider<any>) => void;
    onModuleInit: (provider: Provider<any>) => void;
    onModuleLoad: (provider: Provider<any>) => void;
}
export declare function getCurrentScope(): Scope | null;
export declare function getCurrentProvider(): Provider<any, []> | null;
export {};
