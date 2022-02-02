export declare function traverseClassInstance<T extends object>(instance: T, cb: (propName: string, descriptor: PropertyDescriptor) => unknown): void;
