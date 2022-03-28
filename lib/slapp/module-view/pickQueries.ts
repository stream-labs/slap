import { StateView } from './state-view';
import { Query } from '../query';
import { defineGetter } from '../../scope';
import { useModule } from '../../useModule';
import { useCallback, useMemo, useState } from 'react';

export function pickQueries<TModule, TView>(builder: StateView<TModule, TView>) {
  //
  // const module = builder.module as any;
  // const view = builder.props as any;
  //
  // Object.keys(builder.moduleDescriptors).forEach(propName => {
  //   if (!propName.endsWith('Query')) return;
  //
  //   const queryName = propName.split('Query')[0];
  //   const query = module[propName] as Query<any, any>;
  //
  //   defineGetter(view, propName, () => module[propName]);
  //   defineGetter(view, queryName, () => query.state.value);
  //   defineGetter(view, `${queryName}Loading`, () => query.state.isLoading);
  //   defineGetter(view, `${queryName}Error`, () => query.state.error);
  //   defineGetter(view, `${queryName}Refetch`, () => query.fetch());
  // });
  //
  // return view as TView & PickQueries<TModule>;
}

type GetQueryName<TStr> = TStr extends `${infer TName}Query` ? TName : never;
type PickQueryValues<T> = {[K in keyof T as GetQueryName<K>]: T[K] extends Query<infer TValue, any> ? TValue : never }
type PickQueryErrors<T> = {[K in keyof T as `${GetQueryName<K>}Error`]: T[K] extends Query<any, infer TError> ? TError : never }
type PickQueryLoading<T> = {[K in keyof T as `${GetQueryName<K>}Loading`]: T[K] extends Query<any, any> ? boolean : never }
type PickQueryRefetch<T> = {[K in keyof T as `${GetQueryName<K>}Refetch`]: T[K] extends Query<infer TValue, any> ? () => Promise<TValue> : never }

export type PickQueries<T> = PickQueryValues<T> & PickQueryLoading<T> & PickQueryErrors<T> & PickQueryRefetch<T>;
//
// function MyComponent() {
//
//   const { users, getUsersCount, sayHello } = useModule({
//
//     state: injectState({
//       users: [],
//     }),
//
//     get usersCount() {
//       return this.users.length;
//     },
//
//     greetingMessage: 'Hello',
//
//     sayHello() {
//       alert('Hello world');
//     },
//
//   });
//
// }
//
//
//
//
// function MyComponent2() {
//
//   const [users, setUsers] = useState([]);
//   const getUsersCount = useCallback(() => users.length, [users]);
//   const greetingMessage = useMemo('greetingMessage');
//   const sayHello = useCallback(greetingMessage)
//
//
// }
