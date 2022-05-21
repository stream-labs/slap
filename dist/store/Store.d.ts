import { Scope, Dict, PickFunctionProperties } from '../scope';
/**
 * All React related code should be handled in ReactAdapter
 * Framework agnostic store
 */
export declare class Store {
    rootState: Dict<any>;
    modulesMetadata: Dict<StatefulModuleMetadata>;
    pendingMutations: number;
    moduleRevisions: Dict<number>;
    createState<TConfigCreator>(moduleName: string, configCreator: TConfigCreator): GetStateControllerFor<TConfigCreator>;
    dispatchMutation(mutation: Mutation): void;
    destroyModule(moduleName: string): void;
    recordingAccessors: number;
    affectedModules: Record<string, number>;
    listenAffectedModules(cb: Function): Record<string, number>;
    currentContext: Record<string, Scope>;
    setModuleContext(moduleName: string, scope: Scope): void;
    resetModuleContext(moduleName: string): void;
    getMetadata(moduleName: string): StatefulModuleMetadata;
    getController(moduleName: string): StateController<any>;
    events: import("nanoevents").Emitter<StoreEvents>;
}
export interface StoreEvents {
    onMutation: (mutation: Mutation | Function) => void;
    onReadyToRender: () => void;
}
export declare class StateController<TConfig = any> {
    store: Store;
    moduleName: string;
    draftState: any;
    constructor(store: Store, moduleName: string, config: TStateConfig);
    finishInitialization(): void;
    registerMutation(mutationName: string, mutationMethod: Function, mutationThisContext?: any): void;
    mutate(mutation: ((draft: this) => unknown) | Mutation): void;
    private registerDefaultMutations;
    get state(): TStateFor<TConfig>;
    getMetadata(): StatefulModuleMetadata;
    get getters(): TStateFor<TConfig>;
}
export interface Mutation {
    id: number;
    moduleName: string;
    mutationName: string;
    mutationContext?: any;
    payload: any;
}
export declare type TStateConfigCreator = (new (...args: any) => TStateConfigDraft) | TStateConfigDraft;
export declare type TStateConfig = {
    state: any;
    mutations: any;
    getters: any;
    getterMethods: any;
    [key: string]: any;
};
export declare type TStateConfigDraft = Partial<TStateConfig>;
export interface StatefulModuleMetadata {
    rev: number;
    config: TStateConfig;
    controller: StateController;
    isInitialized: boolean;
    getters: Dict<() => any>;
    subscriptions: (() => unknown)[];
}
export declare type TDraftConfigFor<TConfigCreator> = TConfigCreator extends new (...args: any) => infer TDraftConfigFromConstructor ? TDraftConfigFromConstructor : TConfigCreator extends (...args: any) => infer TDraftConfigFromFunction ? TDraftConfigFromFunction : TConfigCreator;
export declare type TStateFor<TConfigCreator, TDraftConfig = TDraftConfigFor<TConfigCreator>> = TDraftConfig extends {
    state: infer TState;
} ? TState : WritablePart<TDraftConfig>;
export declare type PickMethods<TDraftConfig, TRootMethods = PickFunctionProperties<TDraftConfig>, TExplicitGetters = TDraftConfig extends {
    getters: infer TGetters;
} ? TGetters : {}, TExplicitGetterMethods = TDraftConfig extends {
    getterMethods: infer TGetterMethods;
} ? TGetterMethods : {}, TExplicitMutations = TDraftConfig extends {
    mutations: infer TMutations;
} ? TMutations : {}> = TRootMethods & TExplicitGetters & TExplicitGetterMethods & TExplicitMutations;
export declare type GetHeuristicGetterName<TPropName> = TPropName extends string ? `${'get' | 'is' | 'should' | 'will'}${Capitalize<TPropName>}` : never;
export declare type PickHeuristicGetters<TDraftConfig> = {
    [K in keyof TDraftConfig as GetHeuristicGetterName<K>]: (value: TDraftConfig[K]) => unknown;
};
export declare type GetStateControllerFor<TConfigCreator, TDraftConfig = TDraftConfigFor<TConfigCreator>, TState = PickDefaultState<TDraftConfig>> = StateController<TConfigCreator> & TState & Omit<PickAutogeneratedMutations<TState>, keyof PickMethods<TDraftConfig>> & PickDefaultMutations<TState> & PickAutogeneratedEvents<TConfigCreator> & PickMethods<TDraftConfig> & Exclude<TDraftConfig, keyof TStateConfig>;
export declare type TStateViewForStateConfig<TConfigCreator> = Omit<GetStateControllerFor<TConfigCreator>, 'state'>;
export declare type GetSetterName<TPropName> = TPropName extends string ? `set${Capitalize<TPropName>}` : never;
export declare type PickDefaultState<TDraftConfig> = TDraftConfig extends {
    state: infer TState;
} ? TState : WritablePart<TDraftConfig>;
export declare type PickAutogeneratedMutations<TState> = {
    [K in keyof TState as GetSetterName<K>]: (value: TState[K]) => unknown;
};
export declare type GetChangeEventName<TPropName> = TPropName extends string ? `on${Capitalize<TPropName>}Change` : never;
export declare type PickAutogeneratedEvents<TConfigCreator, TState = TStateFor<TConfigCreator>> = {
    [K in keyof TState as GetChangeEventName<K>]: (cb: (newValue: TState[K], prevValue: TState[K]) => unknown) => () => unknown;
};
export declare type PickDefaultMutations<TState> = {
    update(patch: Partial<TState>): unknown;
};
export declare type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
declare type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P, never>;
}[keyof T];
export declare type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
export {};