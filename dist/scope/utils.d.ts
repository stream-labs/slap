export declare function generateId(): string;
export declare function assertIsDefined<T>(val: T): asserts val is NonNullable<T>;
export declare function getDefined<T>(val: T): NonNullable<T>;
export declare function hasGetter(instance: any, getterName: string): boolean;
export declare type Dict<T> = Record<string, T>;
export declare function forEach<TDict, TKey extends keyof TDict>(dict: TDict, cb: (val: TDict[TKey], key: TKey) => unknown): void;
export declare function defineGetter(target: object, methodName: string, getter: () => any, descriptor?: Partial<PropertyDescriptor>): void;
export declare function defineSetter(target: object, methodName: string, setter: (val: any) => boolean, descriptor?: Partial<PropertyDescriptor>): void;
export declare function capitalize(srt: string): string;
