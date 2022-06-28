export declare function removeItems<TItem>(arr: TItem[], query: ArraySearchQuery<TItem>): void;
export declare function updateItems<TItem>(arr: TItem[], query: ArraySearchQuery<TItem>, updateQuery: ArrayUpdateQuery<TItem>): void;
export declare function find<TItem>(arr: TItem[], query: ArraySearchQuery<TItem>): TItem | undefined;
export declare function getSearchFunction<TItem>(arr: TItem[], query: ArraySearchQuery<TItem>): (item: TItem) => boolean;
export declare function getUpdateFunction<TItem>(query: ArrayUpdateQuery<TItem>): (item: TItem) => unknown;
export declare type ArraySearchQuery<TItem> = ((item: TItem) => boolean) | (Partial<TItem>) | (TItem extends {
    id: infer TId;
} ? TId : never);
export declare type ArrayUpdateQuery<TItem> = ((item: TItem) => unknown) | Partial<TItem>;
