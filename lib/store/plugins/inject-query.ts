import { generateId, InjectableModule, injectProvider } from '../../scope';
import { TStateViewForStateConfig } from '../Store';
import { StateView } from '../StateView';
import { injectState } from './inject-state';
import { injectWatch } from './inject-watch';
import { injectChild } from './inject-child';
import { createStateView } from './createStateView';

/**
 * Injects DataQuery
 * Inspired by https://react-query.tanstack.com/reference/useQuery
 */
export function injectQuery<TQueryArgs extends QueryArgs>(...args: TQueryArgs) {
  return injectChild(QueryModule as any as QueryModule<TQueryArgs>, ...args);
}

/**
 * Describes a reactive state for DataQuery
 */
export class QueryStateConfig<TData, TParams, TError> {

  state: QueryState<TData, TParams, TError> = {
    /**
     * current status of the DataQuery
     */
    status: 'idle' as QueryStatus,
    /**
     * keeps fetched data on success
     */
    data: null as unknown as TData,
    /**
     * keeps error on fail
     */
    error: null as unknown as TError,

    // TODO: remove from state
    params: null as unknown as TParams,
  };

  // define state mutations

  setData(data: TData) {
    this.state.status = 'success';
    this.state.data = data;
  }

  setError(error: TError) {
    this.state.status = 'error';
    this.state.error = error;
  }

  // define state getters

  get isLoading() {
    return this.state.status === 'loading';
  }
}

/**
 * A stateful module for working with DataQueries
 * Inspired by https://react-query.tanstack.com/
 */
export class QueryModule<
  TConstructorArgs extends Array<any>,
  TData = GetQueryData<TConstructorArgs>,
  TParams = GetQueryParams<TConstructorArgs>,
  TError = unknown,
  > implements InjectableModule {

  // create a reactive state for this module
  state = injectState(QueryStateConfig);
  provider = injectProvider();

  // re-fetch query if params changed
  watcher = injectWatch(() => this.getParams(), this.refetch);

  // keep current fetching promise to avoid redundant fetches
  fetchingPromise: Promise<TData> | null = null;
  promiseId = '';

  // if enabled=false then no callbacks will be executed when fetching finished
  enabled = true;

  // keeps settings, such as "onSuccess" for the current query
  options: QueryOptions;
  isInitialFetch = true;

  // provides reactive data for selecting in components
  queryView!: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>> & { refetch: () => Promise<TData>}>;

  constructor(...args: TConstructorArgs) {
    // create initial options based on passed args
    const computedOptions = getQueryOptionsFromArgs(args);
    const options = {
      enabled: true,
      params: null,
      initialData: [],
      getParams: null,
      fetch: () => {},
      onSuccess: () => {},
      onError: () => {},
      ...computedOptions,
    };

    this.options = options;
    this.enabled = !!options.enabled;
  }

  init() {
    // define methods available in components
    const queryMethods = new StateView();
    queryMethods.defineProp({
      description: 'QueryMethod',
      name: 'refetch',
      reactive: false,
      getValue: () => {
        return () => this.refetch();
      },
    });
    const stateView = createStateView(this.state) as any;
    this.queryView = stateView.mergeView(queryMethods);
    const data = this.options.initialData;
    this.state.update({
      params: this.getParams(),
      data,
    });
    this.exec();
  }

  /**
   * Start fetching if not started yet and return fetching promise
   */
  exec(): Promise<TData> {
    if (this.fetchingPromise) return this.fetchingPromise;
    return this.fetch();
  }

  /**
   * Start fetching
   * You most likely should call ".exec()" instead this method to avoid redundant fetching
   */
  fetch(): Promise<TData> {
    let fetchResult: any;

    if (this.thisContext) {
      fetchResult = this.options.fetch.call(this.thisContext, this.getParams());
    } else {
      fetchResult = this.options.fetch(this.getParams());
    }

    if (fetchResult?.then) {
      if (this.isInitialFetch) {
        this.state.status = 'loading';
        this.isInitialFetch = false;
      } else {
        this.state.setStatus('loading');
      }
      const promiseId = generateId();
      this.promiseId = promiseId;
      this.fetchingPromise = fetchResult;
      return fetchResult.then((data: TData) => {
        if (!this.enabled || this.promiseId !== promiseId) return;
        this.fetchingPromise = null;
        this.promiseId = '';
        this.state.setData(data);
      })
        .catch((e: unknown) => {
          if (!this.enabled || this.promiseId !== promiseId) return;
          this.fetchingPromise = null;
          this.promiseId = '';
          this.state.setError(e as any);
          this.options.onError && this.options.onError();
        });
    }
    // result is not a promise, set the data
    this.state.setData(fetchResult);
    this.options.onSuccess && this.options.onSuccess();

    return Promise.resolve(fetchResult);
  }

  /**
   * Returns "this" context for the "getParams()" callback
   * QueryModule usually injected as a child module via `injectQuery`
   * So take "this" context of the parent module
   */
  get thisContext() {
    const parentProvider = this.provider.options.parentProvider;
    if (parentProvider) {
      return parentProvider.instance;
    }
  }

  /**
   * Call the "getParams" callback
   * Query will be re-fetched if params changed
   */
  getParams(): TParams {
    if (!this.options.getParams) return null as any;
    if (this.thisContext) {
      return this.options.getParams.call(this.thisContext);
    }

    return this.options.getParams();
  }

  refetch() {
    if (!this.enabled) return;
    this.stopFetching();
    return this.fetch();
  }

  stopFetching() {
    this.fetchingPromise = null;
    this.promiseId = '';
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  destroy() {
    // prevent unfinished fetching
    this.setEnabled(false);
  }

  /**
   * Export data and methods for a component selector
   */
  exportSelectorValue() {
    return this.queryView;
  }
}

export type QueryRequiredOptions = {
  fetch: (...args: any) => any,
}

export type QueryOptionalOptions = {
  enabled: boolean,
  initialData: any,
  getParams: (() => any) | null,
  onSuccess: (() => any) | null,
  onError: (() => any) | null,
}

export type QueryOptions = QueryOptionalOptions & QueryRequiredOptions;
export type QueryConstructorOptions = QueryRequiredOptions & Partial<QueryOptionalOptions>

export type QueryState<TData, TParams, TError> = {
  status: QueryStatus,
  data: TData,
  params: TParams,
  error: TError,
}

type QueryStatus = 'idle' | 'loading' | 'error' | 'success'

export type QueryArgs = [QueryConstructorOptions] | [(...any: any) => any] | [any, (...any: any) => any] | [any, (...any: any) => any, (...any: any) => any];

/**
 * converts Query constructor agrs to QueryOptions
 * @param args
 */
export function getQueryOptionsFromArgs<TQueryArgs extends Array<any>, TResult = GetQueryOptions<TQueryArgs>>(args: TQueryArgs): TResult {
  if (args.length === 1) {
    const arg = args[0];
    if (typeof arg === 'function') {
      return {
        fetch: arg,
      } as any as TResult;
    }
    return arg;
  }

  if (args.length === 2) {

    if (typeof args[0] === 'function') {
      return {
        fetch: args[0],
        getParams: args[1],
      } as any as TResult;
    }

    return {
      initialData: args[0],
      fetch: args[1],
    } as any as TResult;

  }

  return {
    initialData: args[0],
    fetch: args[1],
    getParams: args[2],
  } as any as TResult;
}

export type GetQueryData<TQueryArgs> = GetQueryDataTypeFromOptions<GetQueryOptions<TQueryArgs>>
export type GetQueryParams<TQueryArgs> = GetQueryParamsTypeFromOptions<GetQueryOptions<TQueryArgs>>

export type GetQueryDataTypeFromOptions<TQueryOptions> =
  TQueryOptions extends { initialData: infer TInitialData } ?
    TInitialData extends never[] ?
      GetDataTypeFromFetchType<TQueryOptions> :
        TInitialData:
          GetDataTypeFromFetchType<TQueryOptions>

export type GetQueryParamsTypeFromOptions<TQueryOptions> = TQueryOptions extends { getParams: (...args: any) => infer TParams } ? TParams : never;

export type GetDataTypeFromFetchType<TQueryOptions> = TQueryOptions extends { fetch: (...args: any) => infer TFunctionResult } ?
  TFunctionResult extends Promise<infer TPromiseData> ?
    TPromiseData :
      TFunctionResult:
        never;

export type GetQueryOptions<TQueryArgs> =
  TQueryArgs extends [infer arg1, infer arg2, infer arg3] ?
    GetQueryOptionsFor3Args<arg1, arg2, arg3> :
    TQueryArgs extends [infer arg1, infer arg2] ?
      GetQueryOptionsFor2Args<arg1, arg2> :
        TQueryArgs extends [infer arg1] ?
          GetQueryOptionsFor1Arg<arg1> :
           GetQueryOptionsFor1Arg<TQueryArgs>;

export type GetQueryOptionsFor3Args<TInitialData, TFetch, TGetProps> = {
  fetch: TFetch,
  initialData: TInitialData,
  getProps: TGetProps
}

export type GetQueryOptionsFor2Args<Arg1, Arg2> = Arg1 extends (...args: any) => any ? {
  fetch: Arg1,
  getParams: Arg2,
} : {
  initialData: Arg1,
  fetch: Arg2
}

export type GetQueryOptionsFor1Arg<Arg> = Arg extends (...args: any) => any ?
  { fetch: Arg } :
  Arg;
