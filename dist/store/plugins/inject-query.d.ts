import { InjectableModule, Provider } from '../../scope';
import { TStateViewForStateConfig } from '../Store';
import { StateView } from '../StateView';
/**
 * Injects DataQuery
 * Inspired by https://react-query.tanstack.com/reference/useQuery
 */
export declare function injectQuery<TQueryArgs extends QueryArgs>(...args: TQueryArgs): import("../../scope").InjectedProp<QueryModule<TQueryArgs, GetQueryDataTypeFromOptions<GetQueryOptions<TQueryArgs>>, GetQueryParamsTypeFromOptions<GetQueryOptions<TQueryArgs>>, unknown>, import("./createModuleView").GetModuleStateView<QueryModule<TQueryArgs, GetQueryDataTypeFromOptions<GetQueryOptions<TQueryArgs>>, GetQueryParamsTypeFromOptions<GetQueryOptions<TQueryArgs>>, unknown>>, {}>;
/**
 * Describes a reactive state for DataQuery
 */
export declare class QueryStateConfig<TData, TParams, TError> {
    state: QueryState<TData, TParams, TError>;
    setData(data: TData): void;
    setError(error: TError): void;
    get isLoading(): boolean;
}
/**
 * A stateful module for working with DataQueries
 * Inspired by https://react-query.tanstack.com/
 */
export declare class QueryModule<TConstructorArgs extends Array<any>, TData = GetQueryData<TConstructorArgs>, TParams = GetQueryParams<TConstructorArgs>, TError = unknown> implements InjectableModule {
    state: import("../../scope").InjectedProp<import("../Store").GetStateControllerFor<typeof QueryStateConfig, QueryStateConfig<unknown, unknown, unknown>, QueryState<unknown, unknown, unknown>>, import("./inject-state").GetStateViewFor<typeof QueryStateConfig>, import("./inject-state").GetStateViewFor<typeof QueryStateConfig>>;
    provider: Provider<any, []>;
    watcher: import("../../scope").InjectedProp<import("./inject-watch").WatchModule<unknown>, import("./createModuleView").GetModuleStateView<typeof import("./inject-watch").WatchModule>, {}>;
    fetchingPromise: Promise<TData> | null;
    promiseId: string;
    enabled: boolean;
    options: QueryOptions;
    isInitialFetch: boolean;
    queryView: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>> & {
        refetch: () => Promise<TData>;
    }>;
    constructor(...args: TConstructorArgs);
    init(): void;
    /**
     * Start fetching if not started yet and return fetching promise
     */
    exec(): Promise<TData>;
    /**
     * Start fetching
     * You most likely should call ".exec()" instead this method to avoid redundant fetching
     */
    fetch(): Promise<TData>;
    /**
     * Returns "this" context for the "getParams()" callback
     * QueryModule usually injected as a child module via `injectQuery`
     * So take "this" context of the parent module
     */
    get thisContext(): any;
    /**
     * Call the "getParams" callback
     * Query will be re-fetched if params changed
     */
    getParams(): TParams;
    refetch(): Promise<TData> | undefined;
    stopFetching(): void;
    setEnabled(enabled: boolean): void;
    events: import("nanoevents").Emitter<QueryEvents<TData>>;
    destroy(): void;
    /**
     * Export data and methods for a component selector
     */
    exportSelectorValue(): StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>> & {
        refetch: () => Promise<TData>;
    }>;
    onChange(cb: (newVal: TData, prevVal: TData | null) => unknown): import("nanoevents").Unsubscribe;
}
export interface QueryEvents<TData> {
    onChange: (newVal: TData, prevVal: TData | null) => void;
}
export declare type QueryRequiredOptions = {
    fetch: (...args: any) => any;
};
export declare type QueryOptionalOptions = {
    enabled: boolean;
    initialData: any;
    getParams: (() => any) | null;
    onSuccess: (() => any) | null;
    onError: (() => any) | null;
};
export declare type QueryOptions = QueryOptionalOptions & QueryRequiredOptions;
export declare type QueryConstructorOptions = QueryRequiredOptions & Partial<QueryOptionalOptions>;
export declare type QueryState<TData, TParams, TError> = {
    status: QueryStatus;
    data: TData;
    params: TParams;
    error: TError;
};
declare type QueryStatus = 'idle' | 'loading' | 'error' | 'success';
export declare type QueryArgs = [QueryConstructorOptions] | [(...any: any) => any] | [any, (...any: any) => any] | [any, (...any: any) => any, (...any: any) => any];
/**
 * converts Query constructor agrs to QueryOptions
 * @param args
 */
export declare function getQueryOptionsFromArgs<TQueryArgs extends Array<any>, TResult = GetQueryOptions<TQueryArgs>>(args: TQueryArgs): TResult;
export declare type GetQueryData<TQueryArgs> = GetQueryDataTypeFromOptions<GetQueryOptions<TQueryArgs>>;
export declare type GetQueryParams<TQueryArgs> = GetQueryParamsTypeFromOptions<GetQueryOptions<TQueryArgs>>;
export declare type GetQueryDataTypeFromOptions<TQueryOptions> = TQueryOptions extends {
    initialData: infer TInitialData;
} ? TInitialData extends never[] ? GetDataTypeFromFetchType<TQueryOptions> : TInitialData : GetDataTypeFromFetchType<TQueryOptions>;
export declare type GetQueryParamsTypeFromOptions<TQueryOptions> = TQueryOptions extends {
    getParams: (...args: any) => infer TParams;
} ? TParams : never;
export declare type GetDataTypeFromFetchType<TQueryOptions> = TQueryOptions extends {
    fetch: (...args: any) => infer TFunctionResult;
} ? TFunctionResult extends Promise<infer TPromiseData> ? TPromiseData : TFunctionResult : never;
export declare type GetQueryOptions<TQueryArgs> = TQueryArgs extends [infer arg1, infer arg2, infer arg3] ? GetQueryOptionsFor3Args<arg1, arg2, arg3> : TQueryArgs extends [infer arg1, infer arg2] ? GetQueryOptionsFor2Args<arg1, arg2> : TQueryArgs extends [infer arg1] ? GetQueryOptionsFor1Arg<arg1> : GetQueryOptionsFor1Arg<TQueryArgs>;
export declare type GetQueryOptionsFor3Args<TInitialData, TFetch, TGetProps> = {
    fetch: TFetch;
    initialData: TInitialData;
    getProps: TGetProps;
};
export declare type GetQueryOptionsFor2Args<Arg1, Arg2> = Arg1 extends (...args: any) => any ? {
    fetch: Arg1;
    getParams: Arg2;
} : {
    initialData: Arg1;
    fetch: Arg2;
};
export declare type GetQueryOptionsFor1Arg<Arg> = Arg extends (...args: any) => any ? {
    fetch: Arg;
} : Arg;
export {};
