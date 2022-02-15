import { IModuleMetadata } from './module-manager';
import { Scope } from './scope/scope';
import { TModuleClass } from './scope/interfaces';
export declare class Store {
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
    initModule(module: any, moduleName: string, contextId: string): void;
    destroyModule(moduleName: string, contextId: string): void;
    mutateModule(moduleName: string, contextId: string, mutation: Function): void;
    isRecordingAccessors: boolean;
    recordedAccessors: Record<string, number>;
    runAndSaveAccessors(cb: Function): Record<string, number>;
    private createModuleMetadata;
    updateModuleMetadata(moduleName: string, scopeId: string, patch: Partial<IModuleMetadata>): IModuleMetadata & Partial<IModuleMetadata>;
    getModuleMetadata(ModuleClass: TModuleClass, scopeId: string): IModuleMetadata | null;
    currentContext: Record<string, Scope>;
    setModuleContext(moduleName: string, scope: Scope): void;
    resetModuleContext(moduleName: string): void;
    replaceMethodsWithMutations(module: any, moduleName: string, contextId: string): void;
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
export {};
