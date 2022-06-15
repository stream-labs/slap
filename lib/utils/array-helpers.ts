export function removeItems<TItem>(arr: TItem[], query: ArraySearchQuery<TItem>) {
  const searchFn = getSearchFunction(arr, query);
  let i = arr.length;
  while (i--) {
    if (searchFn(arr[i])) arr.splice(i, 1);
  }
}

export function updateItems<TItem>(arr: TItem[], query: ArraySearchQuery<TItem>, updateQuery: ArrayUpdateQuery<TItem>) {
  const searchFn = getSearchFunction(arr, query);
  const updateFn = getUpdateFunction(updateQuery);
  for (const item of arr) {
    if (searchFn(item)) updateFn(item);
  }
}

export function find<TItem>(arr: TItem[], query: ArraySearchQuery<TItem>): TItem | undefined {
  const searchFn = getSearchFunction(arr, query);
  return arr.find(searchFn);
}

export function getSearchFunction<TItem>(arr: TItem[], query: ArraySearchQuery<TItem>): (item: TItem) => boolean {
  if (typeof query === 'function') return query as (item: TItem) => boolean;
  if (typeof query === 'object') {
    const objQuery = query as any;
    const keys = Object.keys(objQuery);
    return (item: TItem) => {
      for (const key of keys) {
        if (objQuery[key] !== (item as any)[key]) return false;
      }
      return true;
    };
  }
  return (item: TItem) => (item as any)?.id === query;
}

export function getUpdateFunction<TItem>(query: ArrayUpdateQuery<TItem>): (item: TItem) => unknown {
  if (typeof query === 'function') return query as (item: TItem) => boolean;
  const patch = query as object;
  return (item: TItem) => {
    Object.assign(item, patch);
  };
}

export type ArraySearchQuery<TItem> = ((item: TItem) => boolean) | (Partial<TItem>) | (TItem extends {id: infer TId } ? TId : never);
export type ArrayUpdateQuery<TItem> = ((item: TItem) => unknown) | Partial<TItem>;
