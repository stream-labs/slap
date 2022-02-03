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
import { traverseClassInstance } from './traverseClassInstance';

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

    traverseClassInstance(dataSourceObj!, (propName => {
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

export type TMerge<
  T1,
  T2,
  TObj1 = T1 extends (...args: any[]) => infer R1 ? R1 : T1,
  TObj2 = T2 extends (...args: any[]) => infer R2 ? R2 : T2,
  R extends object = Omit<TObj1, keyof TObj2> & TObj2
  > = R;

export type TMerge3<T1, T2, T3> = TMerge<TMerge<T1, T2>, T3>;
export type TMerge4<T1, T2, T3, T4> = TMerge<TMerge3<T1, T2, T3>, T4>;
