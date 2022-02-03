export declare class ReactiveStore {
    readonly storeId: string;
    constructor(storeId: string);
    state: {
        storeId: string;
        modules: Record<string, Record<string, any>>;
    };
    isMutationRunning: boolean;
    modulesRevisions: Record<string, number>;
    immerState: any;
    initModule(module: any, moduleName: string, contextId: string): void;
    destroyModule(moduleName: string, contextId: string): void;
    mutateModule(moduleName: string, contextId: string, mutation: Function): void;
    watchers: Record<string, Function>;
    watchersOrder: string[];
    createWatcher(cb: Function): string;
    removeWatcher(watcherId: string): void;
    runWatchers(): void;
    isRecordingAccessors: boolean;
    recordedAccessors: Record<string, number>;
    runAndSaveAccessors(cb: Function): Record<string, number>;
    replaceMethodsWithMutations(module: any, moduleName: string, contextId: string): void;
}
/**
 * A decorator that registers the object method as an mutation
 */
export declare function mutation(): (target: any, methodName: string) => void;
export declare function assertIsDefined<T>(val: T): asserts val is NonNullable<T>;
export declare function getDefined<T>(val: T): NonNullable<T>;
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
export declare type TModuleConstructor = new (...args: any) => any;
export declare type TModuleConstructorMap = {
    [key: string]: TModuleConstructor;
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
