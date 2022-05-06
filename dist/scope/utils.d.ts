export declare function generateId(): string;
export declare type Dict<T> = Record<string, T>;
export declare function forEach<TDict, TKey extends keyof TDict>(dict: TDict, cb: (val: TDict[TKey], key: TKey) => unknown): void;
export declare function defineGetter(target: object, methodName: string, getter: () => any, descriptor?: Partial<PropertyDescriptor>): void;
export declare function defineSetter(target: object, methodName: string, setter: (val: any) => boolean, descriptor?: Partial<PropertyDescriptor>): void;
export declare function capitalize(srt: string): string;
export declare function isClass(object: any): any;
