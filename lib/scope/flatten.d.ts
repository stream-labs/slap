// implements a `Flatten` type helper
// https://flut1.medium.com/deep-flatten-typescript-types-with-finite-recursion-cb79233d93ca

export type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K
}[keyof T];

export type ValuesOf<T> = T[keyof T];
export type ObjectValuesOf<T extends Object> = Exclude<
  Exclude<Extract<ValuesOf<T>, object>, never>,
  Array<any>
  >;

export type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never;


export type Flatten<T> = Pick<T, NonObjectKeysOf<T>> &
  UnionToIntersection<ObjectValuesOf<T>>;

// https://stackoverflow.com/questions/51435783/pick-and-flatten-a-type-signature-in-typescript
// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
// export type Flatten<T, K extends keyof T> = UnionToIntersection<T[K]>;

