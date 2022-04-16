export declare type GetMerge<T1, T2> = T2 & Omit<T1, keyof T2>;
/**
 * copy props from source to targets
 */
export declare function copyProps<TSource, TTarget = {}>(source: TSource, target?: TTarget): GetMerge<TSource, TTarget>;
/**
 * Create and merged object
 * Property descriptors will be preserved
 * Prototype properties will be included
 */
export declare function merge<T1, T2, TResult = GetMerge<T1, T2>>(obj1: T1, obj2: T2): TResult;
