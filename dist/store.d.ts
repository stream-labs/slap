export declare class ReactiveStore {
    readonly storeId: string;
    constructor(storeId: string);
    state: {
        storeId: string;
        modules: Record<string, Record<string, any>>;
    };
    initModule(moduleName: string, contextId: string, initialState: any): void;
    destroyModule(moduleName: string, contextId: string): void;
    mutateModule(moduleName: string, contextId: string, mutation: Function): void;
}
/**
 * ReduxModuleManager helps to organize code splitting with help of Redux Modules
 * Each Redux Module controls its own chunk of state in the global Redux store
 * Redux Modules are objects that contain initialState, actions, mutations and getters
 */
export declare class ReduxModuleManager {
    store: ReactiveStore;
    plugins: any[];
    registeredModules: Record<string, Record<string, IReduxModuleMetadata>>;
    currentContext: Record<string, string>;
    isMutationRunning: boolean;
    isRecordingAccessors: boolean;
    recordedAccessors: Record<string, number>;
    modulesRevisions: Record<string, number>;
    constructor(store: ReactiveStore, plugins?: any[]);
    /**
     * Register a new Redux Module and initialize it
     * @param module the module object
     * @param initParams params that will be passed in the `.init()` handler after initialization
     */
    registerModule<TInitParams>(ModuleClass: any, initParams?: TInitParams, moduleName?: string, contextId?: string): IReduxModuleMetadata;
    initModule(moduleName: string, contextId: string): void;
    /**
       * Unregister the module and erase its state from Redux
       */
    unregisterModule(moduleName: string, contextId: string): void;
    registerServices<T extends TServiceConstructorMap>(serviceClasses: T): TInstances<T>;
    runAndSaveAccessors(cb: Function): Record<string, number>;
    /**
     * Get the Module by name
     */
    getModule<TModule extends IReduxModule<any, any>>(moduleName: string, contextId: string): TModule;
    /**
     * Get the Service by name
     * Initialized the service if not initialized
     */
    getService(serviceName: string): IReduxModule<any, any> | undefined;
    inject<T>(injectedObject: T): GetInjectReturnType<T>;
    private injectOneService;
    injectModule<TModuleClass extends new (...args: any) => any>(ModuleClass: TModuleClass, isService?: boolean, createView?: (module: InstanceType<TModuleClass>) => any): IReduxModuleMetadata;
    private injectManyServices;
    /**
       * Register a component that is using the module
       */
    registerComponent(moduleName: string, contextId: string, componentId: string): void;
    /**
       * Un-register a component that is using the module.
       * If the module doesnt have registered components it will be destroyed
       */
    unRegisterComponent(moduleName: string, contextId: string, componentId: string): void;
    watchers: Record<string, Function>;
    watchersOrder: string[];
    createWatcher(cb: Function): string;
    removeWatcher(watcherId: string): void;
    runWatchers(): void;
    replaceMethodsWithMutations(module: IReduxModule<unknown, unknown>, contextId: string): void;
    immerState: any;
    setModuleContext(moduleName: string, contextId: string): void;
    resetModuleContext(moduleName: string): void;
}
export declare function createModuleManager(Services?: TServiceConstructorMap, plugins?: TModuleManagerHooks[]): ReduxModuleManager;
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
export interface IReduxModuleMetadata {
    moduleName: string;
    componentIds: string[];
    initParams: any;
    module?: IReduxModule<any, any>;
    view: any;
    ModuleClass?: any;
    watchers: IWatcher<unknown>[];
    isService: boolean;
    contextId: string;
}
export declare function generateId(): string;
export declare type TInstances<T extends {
    [key: string]: new (...args: any) => any;
}> = {
    [P in keyof T]: InstanceType<T[P]>;
};
export declare type GetInjectReturnType<Type> = Type extends new (...args: any) => any ? InstanceType<Type> : Type extends {
    [key: string]: new (...args: any) => any;
} ? TInstances<Type> : never;
export declare type TInjector = <T>(injectedObject: T) => GetInjectReturnType<T>;
export declare type TServiceConstructor = new (...args: any) => any;
export declare type TServiceConstructorMap = {
    [key: string]: TServiceConstructor;
};
/**
 * Makes all functions return a Promise and sets other types to never
 */
export declare type TPromisifyFunctions<T> = {
    [P in keyof T]: T[P] extends (...args: any[]) => any ? TPromisifyFunction<T[P]> : never;
};
/**
 * Wraps the return type in a promise if it doesn't already return a promise
 */
export declare type TPromisifyFunction<T> = T extends (...args: infer P) => infer R ? T extends (...args: any) => Promise<any> ? (...args: P) => R : (...args: P) => Promise<R> : T;
declare type TModuleManagerHooks = {
    onModuleRegister(context: any): void;
    onModuleInit(context: any): void;
    onModuleDestroy(context: any): void;
    onMutation(context: any): void;
    onMethod(context: any): void;
};
export {};
