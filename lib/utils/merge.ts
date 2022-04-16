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
export function merge<T1, T2, TResult = GetMerge<T1, T2>>(obj1: any, obj2: any): TResult {
  const result = {};

  copyProps(result, obj1);
  copyProps(result, obj2);

  return result as TResult;
}
