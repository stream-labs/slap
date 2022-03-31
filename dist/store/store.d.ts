import { Scope, Dict } from '../scope';
/**
 * All React related code should be handled in ReactAdapter
 * Framework agnostic store
 */
export declare class Store {
    rootState: Dict<any>;
    modulesMetadata: Dict<StatefulModule>;
    currentMutation: Mutation | null;
    moduleRevisions: Dict<number>;
    createState<TConfigCreator extends TStateConfigCreator>(stateName: string, configCreator: TConfigCreator): TStateControllerFor<TConfigCreator>;
    dispatchMutation(mutation: Mutation): void;
    getMetadata(stateName: string): StatefulModule;
    toJSON(): void;
    currentScope: Record<string, Scope>;
    setModuleScope(moduleName: string, scope: Scope): void;
    resetModuleScope(moduleName: string): void;
    destroyState(stateName: string): void;
    isRecordingAccessors: boolean;
    affectedModules: Record<string, number>;
    listenAffectedModules(cb: Function): Record<string, number>;
    currentContext: Record<string, Scope>;
    setModuleContext(moduleName: string, scope: Scope): void;
    resetModuleContext(moduleName: string): void;
    events: import("nanoevents").Emitter<StoreEvents>;
}
export interface StoreEvents {
    onMutation: (mutation: Mutation, store: Store) => void;
}
export declare class ModuleStateController {
    store: Store;
    stateName: string;
    draftState: any;
    constructor(store: Store, stateName: string, config: TStateConfig);
    registerMutation(mutationName: string, mutationMethod: Function): void;
    applyMutation(mutation: Mutation): void;
    get state(): any;
    set state(val: any);
    get metadata(): StatefulModule;
}
/**
 * A decorator that registers the object method as an mutation
 */
export declare function mutation(): (target: any, methodName: string) => void;
export interface Mutation {
    id: number;
    stateName: string;
    mutationName: string;
    payload: any;
}
export declare const defaultStateConfig: Partial<TStateConfig>;
export declare type TStateConfigCreator = (new (...args: any) => TStateConfig) | TStateConfig;
export declare type TStateConfig = {};
export interface StatefulModule {
    rev: number;
    config: TStateConfig;
    controller: ModuleStateController;
    mutations: Dict<Function>;
}
export declare type TConfigFor<TConfigCreator> = TConfigCreator extends new (...args: any) => infer TConfig ? TConfig extends TStateConfig ? TConfig : never : TConfigCreator extends TStateConfig ? TConfigCreator : never;
export declare type TStateConfigFor<TConfigCreator> = TConfigCreator extends new (...args: any) => infer TConfig ? TConfig extends TStateConfig ? TConfig : never : TConfigCreator extends TStateConfig ? TConfigCreator : never;
export declare type TStateControllerFor<TConfigCreator, TConfig = TStateConfigFor<TConfigCreator>> = TConfig extends TStateConfig ? WritablePart<TConfig> & ModuleStateController & PickGeneratedMutations<TConfig> & Omit<TConfig, keyof TStateConfig> : never;
declare type GetSetterName<TPropName> = TPropName extends string ? `set${Capitalize<TPropName>}` : never;
export declare type PickGeneratedMutations<TConfig extends TStateConfig> = {
    [K in keyof TConfig as GetSetterName<K>]: (value: TConfig[K]) => unknown;
};
export declare type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
declare type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P, never>;
}[keyof T];
declare type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
export declare function createConfig<TConfig>(configCreator: TConfig | (new (...args: any) => TConfig)): TConfig;
export {};
