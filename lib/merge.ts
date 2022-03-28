/**
 * Merges multiple sources of data into a single Proxy object
 * The result object is read-only
 *
 * @example
 *
 * const mergedObject = merge(
 *   () => ({ foo: 1 }),
 *   () => ({ bar: 2 }),
 *   () => ({ bar: 3 }),
 * )
 *
 * mergedObject.bar // 3
 * mergedObject.foo // 1
 */
import { traverse } from './traverse';

export function merge<
  T1 extends Object,
  T2 extends Object,
  T3 extends Object,
  T4 extends Object,
  TReturnType = T4 extends undefined
    ? T3 extends undefined
      ? TMerge<T1, T2>
      : TMerge3<T1, T2, T3>
    : TMerge4<T1, T2, T3, T4>
  >(dataSources: [T1, T2, T3?, T4?]): TReturnType {
  const mergeResult = {};

  dataSources.forEach((dataSource, ind) => {
    const dataSourceFunction = typeof dataSource === 'function' && (dataSource as Function);
    const dataSourceObj = dataSourceFunction ? dataSourceFunction() : dataSource;

    traverse(dataSourceObj!, (propName => {
      Object.defineProperty(mergeResult, propName, {
        configurable: true,
        enumerable: true,
        get() {
          return dataSourceFunction
            ? (dataSources[ind] as any)()[propName]
            : (dataSources[ind] as any)[propName];
        },
      });
    }));
  });

  return mergeResult as TReturnType;
}

export function unwrapState<TState, T extends {state: any}>(obj: T): TMerge<T['state'], T> {
  const state = obj.state;

  if (!state) throw new Error(`State not found for object ${obj}`);

  Object.keys(state).forEach(stateKey => {
    if (stateKey in obj) return;

    Object.defineProperty(obj, stateKey, {
      configurable: true,
      enumerable: true,
      get() {
        return (obj.state as any)[stateKey];
      },
    });
  });
  return obj as TMerge<TState, T>;
}

// export type TMerge<
//   T1,
//   T2,
//   TObj1 = T1 extends (...args: any[]) => infer R1 ? R1 : T1,
//   TObj2 = T2 extends (...args: any[]) => infer R2 ? R2 : T2,
//   R extends object = Omit<TObj1, keyof TObj2> & TObj2
//   > = R;

// export type TMerge<
//   T1,
//   T2,
//   TObj1 = T1 extends {} ? T1 : {},
//   TObj2 = T2 extends {} ? T2 : {},
//   > = Omit<TObj1, keyof TObj2> & TObj2

export type TMerge<
  T1,
  T2,
  TObj1 = T1 extends {} ? T1 : {},
  TObj2 = T2 extends {} ? T2 : {},
  > = Omit<TObj1, keyof TObj2> & TObj2

export type TMerge3<T1, T2, T3> = TMerge<TMerge<T1, T2>, T3>;
export type TMerge4<T1, T2, T3, T4> = TMerge<TMerge3<T1, T2, T3>, T4>;
