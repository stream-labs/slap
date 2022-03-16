import { ModuleViewBuilder } from './module-view-builder';
import { Query } from '../query';
import { defineGetter } from '../../scope';

export function pickQueries<TModule, TView>(builder: ModuleViewBuilder<TModule, TView>) {

  const module = builder.module as any;
  const view = builder.view as any;

  Object.keys(builder.moduleDescriptors).forEach(propName => {
    if (!propName.endsWith('Query')) return;

    const queryName = propName.split('Query')[0];
    const query = module[propName] as Query<any, any>;

    defineGetter(view, propName, () => module[propName]);
    defineGetter(view, queryName, () => query.state.value);
    defineGetter(view, `${queryName}Loading`, () => query.state.isLoading);
    defineGetter(view, `${queryName}Error`, () => query.state.error);
    defineGetter(view, `${queryName}Refetch`, () => query.fetch());
  });

  return view as TView & PickQueries<TModule>;
}

type GetQueryName<TStr> = TStr extends `${infer TName}Query` ? TName : never;
type PickQueryValues<T> = {[K in keyof T as GetQueryName<K>]: T[K] extends Query<infer TValue, any> ? TValue : never }
type PickQueryErrors<T> = {[K in keyof T as `${GetQueryName<K>}Error`]: T[K] extends Query<any, infer TError> ? TError : never }
type PickQueryLoading<T> = {[K in keyof T as `${GetQueryName<K>}Loading`]: T[K] extends Query<any, any> ? boolean : never }
type PickQueryRefetch<T> = {[K in keyof T as `${GetQueryName<K>}Refetch`]: T[K] extends Query<infer TValue, any> ? () => Promise<TValue> : never }

export type PickQueries<T> = PickQueryValues<T> & PickQueryLoading<T> & PickQueryErrors<T> & PickQueryRefetch<T>;



