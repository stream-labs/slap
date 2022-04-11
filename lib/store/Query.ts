import { Simulate } from 'react-dom/test-utils';
import { createInjector, InjectedProp } from '../scope';
import { Store, TStateControllerFor, TStateViewForStateConfig } from './Store';
import error = Simulate.error;
import { StateView } from './StateView';
import { TUser } from '../../demo/stars-editor/components/pages/UsersPage';

export class QueryStateConfig<TData, TError> {

  state: QueryState<TData, TError> = {
    status: 'idle' as QueryStatus,
    data: null as unknown as TData,
    error: null as unknown as TError,
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
export class Query<TData, TParams, TError> {

  state: TStateControllerFor<QueryStateConfig<TData, TError>>;
  fetchingPromise: Promise<TData> | null = null;
  params: TParams;
  enabled = true;
  options: QueryOptions;
  stateView: StateView<TStateViewForStateConfig<QueryStateConfig<TData, TError>>>;

  constructor(public store: Store, public moduleName: string, propName: string, constructorOptions: QueryConstructorOptions) {
    const options = {
      enabled: true,
      params: null,
      initialData: null,
      getParams: null,
      ...constructorOptions,
    };

    this.options = options;
    this.enabled = !!options.enabled;
    this.params = options.getParams ? options.getParams() : {};
    const stateConfig = new QueryStateConfig<TData, TError>();
    stateConfig.state.data = options.initialData;
    this.state = this.store.createState(moduleName, propName, stateConfig);
    this.stateView = this.state.createView() as any as StateView<TStateViewForStateConfig<QueryStateConfig<TData, TError>>>;
  }

  exec(): Promise<TData> {
    if (this.fetchingPromise) return this.fetchingPromise;
    return this.fetch();
  }

  fetch(): Promise<TData> {
    const fetchResult = this.options.fetch(this);
    if (fetchResult?.then) {
      this.fetchingPromise = fetchResult;
      return fetchResult.then((data: TData) => {
        if (!this.enabled) return;
        this.fetchingPromise = null;
        this.state.setData(data);
      })
        .catch((e: unknown) => {
          if (!this.enabled) return;
          this.fetchingPromise = null;
          this.state.setError(error as any);
        });
    }
    return Promise.resolve(fetchResult);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  destroy() {
    // prevent unfinished fetching
    this.setEnabled(false);
  }
}

export const QueryInjectorType = Symbol('queryInjector');

// async function fetchOnlineUsers() {
//   return new Promise<TUser[]>(r => {
//     setTimeout(() => r([{ id: 'online1', name: 'Online User 1' }, { id: 'online2', name: 'Online User 2' }]), 3000);
//   });
// }

export function injectQuery<
  TOptions extends QueryConstructorOptions,
  TQuery = Query<GetQueryDataType<TOptions>, unknown, unknown>,
  TQueryView = StateView<TStateViewForStateConfig<QueryStateConfig<GetQueryDataType<TOptions>, unknown>>>,
  >(options: TOptions): InjectedProp<TQuery, TQueryView> {
  return createInjector(injector => {

    let query!: Query<unknown, unknown, unknown>;

    return {
      type: QueryInjectorType,
      load: () => {
        const propName = injector.propertyName;
        const moduleName = injector.provider.id;
        const store = injector.provider.scope.resolve(Store);
        query = new Query(store, moduleName, propName, options);
        query.exec();
      },
      getValue() {
        return query as any as TQuery;
      },
      getViewValue() {
        return query.stateView as any as TQueryView;
      },
      destroy() {
        query.destroy();
      },
    };
  });
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

export type QueryState<TData, TError> = {
  status: QueryStatus,
  data: TData,
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
