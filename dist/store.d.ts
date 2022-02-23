import { IModuleMetadata } from './module-manager';
import { Scope, Subject } from './scope';
export declare class Store {
    settings: typeof defaultStoreSettings;
    constructor(settings: typeof defaultStoreSettings);
    state: {
        modules: Record<string, Record<string, any>>;
    };
    scope: Scope;
    isMutationRunning: boolean;
    modulesRevisions: Record<string, number>;
    immerState: any;
    watchers: StoreWatchers;
    modulesMetadata: Record<string, Record<string, IModuleMetadata>>;
    init(): void;
    registerModuleFromClass(ModuleClass: any, moduleName?: string, scopeId?: string): void;
    registerModuleFromInstance(module: any, moduleName: string, scopeId?: string): void;
    createModule(moduleName: string, state: any, mutations: Record<string, Function>, getters: Record<string, Function>, scopeId: string, instance?: any): any;
    injectReactiveState(module: any, moduleName: string, scopeId: string): void;
    destroyModule(moduleName: string, contextId: string): void;
    setBulkState(bulkState: Record<string, any>): void;
    mutateModule(moduleName: string, contextId: string, mutation: Function): void;
    isRecordingAccessors: boolean;
    recordedAccessors: Record<string, number>;
    runAndSaveAccessors(cb: Function): Record<string, number>;
    private createModuleMetadata;
    updateModuleMetadata(moduleName: string, scopeId: string, patch: Partial<IModuleMetadata>): IModuleMetadata & Partial<IModuleMetadata>;
    getModuleMetadata(moduleName: string, scopeId: string): IModuleMetadata | null;
    currentContext: Record<string, Scope>;
    setModuleContext(moduleName: string, scope: Scope): void;
    resetModuleContext(moduleName: string): void;
    injectMutations(module: any, moduleName: string, scopeId: string, mutations: Record<string, Function>): void;
    mutate(mutation: Mutation, scopeId?: string): void;
    onMutation: Subject<Mutation>;
}
declare class StoreWatchers {
    watchers: Record<string, Function>;
    watchersOrder: string[];
    create(cb: Function): string;
    remove(watcherId: string): void;
    run(): void;
}
/**
 * A decorator that registers the object method as an mutation
 */
export declare function mutation(): (target: any, methodName: string) => void;
export declare function getModuleMutations(module: any): Record<string, Function>;
/**
 * Add try/catch that silently stops all method calls for a destroyed module
 */
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
export declare function injectState<TModuleClass extends new (...args: any) => any>(StatefulModule: TModuleClass): InstanceType<TModuleClass>['state'];
export interface Mutation {
    id: number;
    type: string;
    payload: any;
}
export declare class StoreStatus {
    private settings?;
    constructor(settings?: {
        isRemote: boolean;
    } | undefined);
    state: {
        isRemote: boolean;
        isConnected: boolean;
    };
    get isReady(): boolean;
    setConnected(isConnected: boolean): void;
}
export declare const defaultStoreSettings: {
    isRemote: boolean;
};
export declare type TStoreSettings = typeof defaultStoreSettings;
export {};
