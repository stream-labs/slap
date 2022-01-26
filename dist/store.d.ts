import { Store } from 'redux';
/**
 * ReduxModuleManager helps to organize code splitting with help of Redux Modules
 * Each Redux Module controls its own chunk of state in the global Redux store
 * Redux Modules are objects that contain initialState, actions, mutations and getters
 */
export declare class ReduxModuleManager {
    store: Store;
    modulesSlice: any;
    appId: string;
    immerState: any;
    registeredModules: Record<string, Record<string, IReduxModuleMetadata>>;
    currentContext: Record<string, string>;
    actions: any;
    constructor(store: Store, modulesSlice: any, appId: string);
    /**
     * Register a new Redux Module and initialize it
     * @param module the module object
     * @param initParams params that will be passed in the `.init()` handler after initialization
     */
    registerModule<TInitParams>(ModuleClass: any, initParams?: TInitParams, moduleName?: string, isService?: boolean, contextId?: string): IReduxModuleMetadata;
    initModule(moduleName: string, contextId: string): void;
    /**
       * Unregister the module and erase its state from Redux
       */
    unregisterModule(moduleName: string, contextId: string): void;
    registerServices<T extends {
        [key: string]: new (...args: any) => any;
    }>(serviceClasses: T): TInstances<T>;
    /**
     * Get the Module by name
     */
    getModule<TModule extends IReduxModule<any, any>>(moduleName: string, contextId: string): TModule;
    /**
     * Get the Service by name
     * Initialized the service if not initialized
     */
    getService(serviceName: string): IReduxModule<any, any> | undefined;
    /**
       * Register a component that is using the module
       */
    registerComponent(moduleName: string, contextId: string, componentId: string): void;
    /**
       * Un-register a component that is using the module.
       * If the module doesnt have registered components it will be destroyed
       */
    unRegisterComponent(moduleName: string, contextId: string, componentId: string): void;
    /**
       * When Redux is running mutation it replaces the state object with a special Proxy object from
       * the Immer library. Keep this object in the `immerState` property
       */
    setImmerState(immerState: unknown): void;
    /**
       * Run watcher functions registered in modules
       */
    runWatchers(): void;
    setModuleContext(moduleName: string, contextId: string): void;
    resetModuleContext(moduleName: string): void;
}
export declare function createModuleManager(): ReduxModuleManager;
export declare function destroyModuleManager(appId: string): void;
/**
 * The ModuleManager is a singleton object accessible in other files
 * via the `getModuleManager()` call
 */
export declare function getModuleManager(appId: string): ReduxModuleManager;
/**
 * A decorator that registers the object method as an mutation
 */
export declare function mutation(): (target: any, methodName: string) => void;
/**
 * This `useSelector` is a wrapper for the original `useSelector` method from Redux
 * - Optimizes component re-rendering via batched updates from Redux and Vuex
 * - Uses isDeepEqual with depth 2 as a default comparison function
 */
export declare function useSelector<T extends Object>(fn: () => T): T;
/**
 * Wraps the given object in a Proxy for watching read operations on this object
 *
 * @example
 *
 * const myObject = { foo: 1, bar: 2, qux: 3};
 * const { watcherProxy, getDependentFields } = createDependencyWatcher(myObject);
 * const { foo, bar } = watcherProxy;
 * getDependentFields(); // returns ['foo', 'bar'];
 *
 */
export declare function createDependencyWatcher<T extends object>(watchedObject: T): {
    watcherProxy: T;
    getDependentFields: () => string[];
    getDependentValues: () => Partial<T>;
};
export declare function assertIsDefined<T>(val: T): asserts val is NonNullable<T>;
export declare function getDefined<T>(val: T): NonNullable<T>;
/**
 * Watch changes on a reactive state in the module
 */
export declare function watch<T>(module: IReduxModule<any, any>, selector: () => T, onChange: (newVal: T, prevVal: T) => unknown, contextId: string, appId: string): void;
interface IWatcher<T> {
    selector: () => T;
    onChange: (newVal: T, prevVal: T) => unknown;
    prevValue: T;
}
export interface IReduxModule<TInitParams, TState> {
    state: TState;
    name?: string;
    init?: (initParams: TInitParams) => unknown;
    destroy?: () => unknown;
}
interface IReduxModuleMetadata {
    moduleName: string;
    componentIds: string[];
    initParams: any;
    module?: IReduxModule<any, any>;
    ModuleClass?: any;
    watchers: IWatcher<unknown>[];
    isService: boolean;
    contextId: string;
}
export declare function generateId(): string;
declare type TInstances<T extends {
    [key: string]: new (...args: any) => any;
}> = {
    [P in keyof T]: InstanceType<T[P]>;
};
export {};
