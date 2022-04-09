import { Dict } from '../scope';
export declare function traverse<T extends object>(instance: T, cb: (propName: string, descriptor: PropertyDescriptor) => unknown): void;
export declare function getDescriptors<T>(instance: T): Dict<PropertyDescriptor>;
export declare function getKeys<T>(instance: T): (keyof T)[];
export declare function filterKeys(obj: object, filterFn: (key: string) => unknown): {
    [k: string]: any;
};
