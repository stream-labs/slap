import { ReactiveStore, TModuleConstructorMap } from './store';
import { Scope, TModuleClass } from './service';
export declare function createModuleManager(Services?: TModuleConstructorMap): ModuleManager;
/**
 * The ModuleManager is a singleton object accessible in other files
 * via the `getModuleManager()` call
 */
export declare function getModuleManager(appId: string): ModuleManager;
export declare function destroyModuleManager(appId: string): void;
export declare class ModuleManager {
    id: string;
    modulesMetadata: Record<string, Record<string, IModuleMetadata>>;
    currentContext: Record<string, string>;
    store: ReactiveStore;
    scopes: {
        services: Scope;
        default: Scope;
        [key: string]: Scope;
    };
    constructor(id: string, Services?: TModuleConstructorMap);
    registerServices(Services: TModuleConstructorMap): void;
    private createScope;
    resolve<T extends TModuleClass>(ModuleClass: T, contextId: string): InstanceType<T>;
    getService<T extends TModuleClass>(ModuleClass: T): InstanceType<T>;
    resolveScope(contextId: string): Scope;
    private createModuleMetadata;
    updateModuleMetadata(moduleName: string, contextId: string, patch: Partial<IModuleMetadata>): IModuleMetadata & Partial<IModuleMetadata>;
    registerDependency(ModuleClass: TModuleClass, contextId: string): void;
    getModuleMetadata(ModuleClass: TModuleClass, contextId: string): IModuleMetadata;
    setModuleContext(moduleName: string, contextId: string): void;
    resetModuleContext(moduleName: string): void;
    /**
       * Register a component that is using the module
       */
    registerComponent(moduleName: string, contextId: string, componentId: string): void;
    /**
       * Un-register a component that is using the module.
       * If the module doesnt have registered components it will be destroyed
       */
    unRegisterComponent(moduleName: string, contextId: string, componentId: string): void;
    removeInstance(moduleName: string, contextId: string): void;
}
export interface IModuleMetadata {
    moduleName: string;
    contextId: string;
    instance: any;
    createView: any;
    view: any;
    componentIds: string[];
}
