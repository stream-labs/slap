import { InjectedProp } from '../scope';
import { Store, TStateControllerFor, TStateViewForStateConfig } from './Store';
import { StateView } from './StateView';
declare class QueryStateConfig<TData, TError> {
    state: QueryState<TData, TError>;
    setData(data: TData): void;
    setError(error: TError): void;
}
/**
 * Alternative for https://react-query.tanstack.com/reference/useQuery
 */
export declare class Query<TData, TParams, TError> {
    store: Store;
    moduleName: string;
    state: TStateControllerFor<QueryStateConfig<TData, TError>>;
    fetchingPromise: Promise<TData> | null;
    params: TParams;
    enabled: boolean;
    options: QueryOptions;
    stateView: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TError>>>;
    constructor(store: Store, moduleName: string, propName: string, constructorOptions: QueryConstructorOptions);
    exec(): Promise<TData>;
    fetch(): Promise<TData>;
    setEnabled(enabled: boolean): void;
    destroy(): void;
}
export declare const QueryInjectorType: unique symbol;
export declare function injectQuery<TOptions extends QueryConstructorOptions, TQuery = Query<GetQueryDataType<TOptions>, unknown, unknown>, TQueryView = StateView<TStateViewForStateConfig<QueryStateConfig<GetQueryDataType<TOptions>, unknown>>>>(options: TOptions): InjectedProp<TQuery, TQueryView>;
declare type QueryRequiredOptions = {
    fetch: (...args: any) => any;
};
declare type QueryOptionalOptions = {
    enabled: boolean;
    initialData: any;
    getParams: (() => any) | null;
};
declare type QueryOptions = QueryOptionalOptions & QueryRequiredOptions;
declare type QueryConstructorOptions = QueryRequiredOptions & Partial<QueryOptionalOptions>;
declare type QueryState<TData, TError> = {
    status: QueryStatus;
    data: TData;
    error: TError;
};
declare type QueryStatus = 'idle' | 'loading' | 'error' | 'success';
export declare type GetQueryDataType<TQueryOptions> = TQueryOptions extends {
    initialData: infer TInitialData;
} ? TInitialData extends never[] ? GetDataTypeFromFetchType<TQueryOptions> : TInitialData : GetDataTypeFromFetchType<TQueryOptions>;
declare type GetDataTypeFromFetchType<TQueryOptions> = TQueryOptions extends {
    fetch: (...args: any) => infer TFunctionResult;
} ? TFunctionResult extends Promise<infer TPromiseData> ? TPromiseData : TFunctionResult : never;
export {};
