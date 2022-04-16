import { traverse } from './traverse';

export type GetMerge<T1, T2> = T2 & Omit<T1, keyof T2>;

/**
 * copy props from source to targets
 */
export function copyProps<TSource, TTarget = {}>(source: TSource, target?: TTarget): GetMerge<TSource, TTarget> {
  if (!target) target = {} as TTarget;
  traverse(source as any as object, (propName, descriptor) => {
    Object.defineProperty(target, propName, descriptor);
  });
  return target as GetMerge<TSource, TTarget>;
}

/**
 * Create and merged object
 * Property descriptors will be preserved
 * Prototype properties will be included
 */
export function merge<T1, T2, TResult = GetMerge<T1, T2>>(obj1: T1, obj2: T2): TResult {
  const result = {};

  copyProps(obj1, result);
  copyProps(obj2, result);

  return result as TResult;
}
