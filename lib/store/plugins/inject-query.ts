import { generateId } from '../../scope';
import { TStateViewForStateConfig } from '../Store';
import { StateView } from '../StateView';
import { injectState } from './inject-state';
import { injectWatch } from './inject-watch';
import { injectChild } from './inject-child';

export class QueryStateConfig<TData, TParams, TError> {

  // constructor(public state: QueryState<TData, TParams, TError>) {}

  state: QueryState<TData, TParams, TError> = {
    status: 'idle' as QueryStatus,
    data: null as unknown as TData,
    error: null as unknown as TError,
    params: null as unknown as TParams,
  };

  setData(data: TData) {
    this.state.status = 'success';
    this.state.data = data;
    console.log('query fetched', data);
  }

  setError(error: TError) {
    this.state.status = 'error';
    this.state.error = error;
  }

  get isLoading() {
    return this.state.status === 'loading';
  }
}

/**
 * Alternative for https://react-query.tanstack.com/reference/useQuery
 */
export class QueryModule<
  TConstructorArgs extends Array<any>,
  TData = GetQueryData<TConstructorArgs>,
  TParams = GetQueryParams<TConstructorArgs>,
  TError = unknown,
  > {

  state = injectState(QueryStateConfig);
  watcher = injectWatch(this.getParams, this.refetch);

  fetchingPromise: Promise<TData> | null = null;
  promiseId = '';
  enabled = true;
  options: QueryOptions;
  stateView!: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>>>;
  isInitialFetch = true;
  queryView!: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>> & { refetch: () => Promise<TData>}>;

  constructor(...args: TConstructorArgs) {

    const computedOptions = getQueryOptionsFromArgs(args);
    const options = {
      enabled: true,
      params: null,
      initialData: null,
      getParams: null,
      fetch: () => {},
      ...computedOptions,
    };

    this.options = options;
    this.enabled = !!options.enabled;
  }

  load() {
    this.stateView = this.state.createView() as any;
    const queryMethods = new StateView();
    queryMethods.defineProp({
      type: 'QueryMethod',
      name: 'refetch',
      reactive: false,
      getValue: () => {
        return () => this.refetch();
      },
    });
    this.queryView = this.stateView.mergeView(queryMethods);
    const data = this.options.initialData;
    this.state.nonReactiveUpdate({
      params: this.getParams(),
      data,
    });
    this.exec();
  }

  exec(): Promise<TData> {
    if (this.fetchingPromise) return this.fetchingPromise;
    return this.fetch();
  }

  fetch(): Promise<TData> {
    const fetchResult = this.options.fetch();
    if (fetchResult?.then) {
      if (this.isInitialFetch) {
        this.state.nonReactiveUpdate({
          status: 'loading',
        });
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
        });
    }
    // result is not a promise, set the data
    this.state.setData(fetchResult);

    return Promise.resolve(fetchResult);
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

  getParams() {
    return this.options.getParams ? this.options.getParams() : null;
  }

  destroy() {
    // prevent unfinished fetching
    this.setEnabled(false);
  }

  exportComponentData() {
    return {
      self: this.queryView,
      extra: null,
    };
  }
}

export function injectQuery<TQueryArgs extends QueryArgs>(...args: TQueryArgs) {
  return injectChild(QueryModule as any as QueryModule<TQueryArgs>, ...args);
}

export type QueryRequiredOptions = {
  fetch: (...args: any) => any,
}

export type QueryOptionalOptions = {
  enabled: boolean,
  initialData: any,
  getParams: (() => any) | null,
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
 * convers Query constructor agrs to QueryOptions
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

export type GetQueryOptionsFor2Args<TInitialData, TFetch> = {
  fetch: TFetch,
  initialData: TInitialData,
}

export type GetQueryOptionsFor1Arg<Arg> = Arg extends (...args: any) => any ?
  { fetch: Arg } :
  Arg;
