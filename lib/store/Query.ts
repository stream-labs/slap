import { Simulate } from 'react-dom/test-utils';
import { createInjector, generateId, InjectedProp } from '../scope';
import { Store, TStateControllerFor, TStateViewForStateConfig } from './Store';
import error = Simulate.error;
import { StateView } from './StateView';
import { TUser } from '../../demo/stars-editor/components/pages/UsersPage';
import { injectState } from './injectState';
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
}

/**
 * Alternative for https://react-query.tanstack.com/reference/useQuery
 */
export class QueryModule<TData, TParams, TError> {

  state = injectState(QueryStateConfig);
  watcher = injectWatch(this.getParams, this.refetch);

  fetchingPromise: Promise<TData> | null = null;
  promiseId = '';
  enabled = true;
  options: QueryOptions;
  stateView!: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TParams, TError>>>;

  constructor(constructorOptions: QueryConstructorOptions) {
    const options = {
      enabled: true,
      params: null,
      initialData: null,
      getParams: null,
      ...constructorOptions,
    };

    this.options = options;
    this.enabled = !!options.enabled;
  }


  load() {
    this.stateView = this.state.createView() as any;
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
    const fetchResult = this.options.fetch(this);
    if (fetchResult?.then) {
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
          this.state.setError(error as any);
        });
    }
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

  getView() {
    return this.stateView;
  }
}

export const QueryInjectorType = Symbol('queryInjector');

// async function fetchOnlineUsers() {
//   return new Promise<TUser[]>(r => {
//     setTimeout(() => r([{ id: 'online1', name: 'Online User 1' }, { id: 'online2', name: 'Online User 2' }]), 3000);
//   });
// }

export function injectQuery<TOptions extends QueryConstructorOptions>(options: TOptions) {
  return injectChild(QueryModule as any as QueryModule<GetQueryDataType<TOptions>, any, any>, options);
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

export type GetQueryDataType<TQueryOptions> =
  TQueryOptions extends { initialData: infer TInitialData } ?
    TInitialData extends never[] ?
      GetDataTypeFromFetchType<TQueryOptions> :
        TInitialData:
          GetDataTypeFromFetchType<TQueryOptions>

type GetDataTypeFromFetchType<TQueryOptions> = TQueryOptions extends { fetch: (...args: any) => infer TFunctionResult } ?
  TFunctionResult extends Promise<infer TPromiseData> ?
    TPromiseData :
      TFunctionResult:
        never;
