export declare type NonObjectKeysOf<T> = {
    [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K;
}[keyof T];
export declare type ValuesOf<T> = T[keyof T];
export declare type ObjectValuesOf<T extends Object> = Exclude<Exclude<Extract<ValuesOf<T>, object>, never>, Array<any>>;
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
export declare type Flatten<T> = Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<ObjectValuesOf<T>>;
