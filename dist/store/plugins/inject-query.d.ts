import { TStateViewForStateConfig } from '../Store';
import { StateView } from '../StateView';
export declare class QueryStateConfig<TData, TParams, TError> {
    state: QueryState<TData, TParams, TError>;
    setData(data: TData): void;
    setError(error: TError): void;
    get isLoading(): boolean;
}
/**
 * Alternative for https://react-query.tanstack.com/reference/useQuery
 */
export declare class QueryModule<TConstructorArgs extends Array<any>, TData = GetQueryData<TConstructorArgs>, TParams = GetQueryParams<TConstructorArgs>, TError = unknown> {
    state: import("../../scope").InjectedProp<import("../Store").GetStateControllerFor<typeof QueryStateConfig, QueryStateConfig<unknown, unknown, unknown>, QueryState<unknown, unknown, unknown>>, import("./inject-state").GetStateViewFor<typeof QueryStateConfig>, import("./inject-state").GetStateViewFor<typeof QueryStateConfig>>;
    provider: import("../../scope").Provider<any, []>;
    watcher: import("../../scope").InjectedProp<import("./inject-watch").WatchModule<unknown>, import("../StateView").GetModuleStateView<typeof import("./inject-watch").WatchModule>, {}>;
    fetchingPromise: Promise<TData> | null;
    promiseId: string;
    enabled: boolean;
    options: QueryOptions;
    stateView: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>>>;
    isInitialFetch: boolean;
    queryView: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>> & {
        refetch: () => Promise<TData>;
    }>;
    constructor(...args: TConstructorArgs);
    init(): void;
    exec(): Promise<TData>;
    fetch(): Promise<TData>;
    get thisContext(): any;
    getParams(): TParams;
    refetch(): Promise<TData> | undefined;
    stopFetching(): void;
    setEnabled(enabled: boolean): void;
    onDestroy(): void;
    exportComponentData(): {
        self: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>> & {
            refetch: () => Promise<TData>;
        }>;
        extra: null;
    };
}
export declare function injectQuery<TQueryArgs extends QueryArgs>(...args: TQueryArgs): import("../../scope").InjectedProp<QueryModule<TQueryArgs, GetQueryDataTypeFromOptions<GetQueryOptions<TQueryArgs>>, GetQueryParamsTypeFromOptions<GetQueryOptions<TQueryArgs>>, unknown>, import("../StateView").GetModuleStateView<QueryModule<TQueryArgs, GetQueryDataTypeFromOptions<GetQueryOptions<TQueryArgs>>, GetQueryParamsTypeFromOptions<GetQueryOptions<TQueryArgs>>, unknown>>, {}>;
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
 * convers Query constructor agrs to QueryOptions
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
