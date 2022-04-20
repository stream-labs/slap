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
    childScopes: Record<string, Scope>;
    providers: Record<string, Provider<any>>;
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
    registerScope(dependencies?: TModuleConstructorMap, settings?: Partial<Scope['settings']>): Scope;
    unregisterScope(scopeId: string): void;
    getRootScope(): Scope;
    dispose(): void;
    getScheme(): any;
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
