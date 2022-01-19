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
export declare function merge<T1 extends Object, T2 extends Object, T3 extends Object, T4 extends Object, FN3 extends () => T3, FN4 extends () => T4, TReturnType = FN4 extends undefined ? FN3 extends undefined ? TMerge<T1, T2> : TMerge3<T1, T2, T3> : TMerge4<T1, T2, T3, T4>>(...functions: [() => T1, () => T2, FN3?, FN4?]): TReturnType;
export declare type TMerge<T1, T2, TObj1 = T1 extends (...args: any[]) => infer R1 ? R1 : T1, TObj2 = T2 extends (...args: any[]) => infer R2 ? R2 : T2, R extends object = Omit<TObj1, keyof TObj2> & TObj2> = R;
export declare type TMerge3<T1, T2, T3> = TMerge<TMerge<T1, T2>, T3>;
export declare type TMerge4<T1, T2, T3, T4> = TMerge<TMerge3<T1, T2, T3>, T4>;
