let idCounter = 1;

export function generateId() {
  return (idCounter++).toString();
}

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

export function getDefined<T>(val: T): NonNullable<T> {
  assertIsDefined(val);
  return val;
}

export function hasGetter(instance: any, getterName: string) {
  const stateDescriptor = Object.getOwnPropertyDescriptor(instance, getterName);
  return !!stateDescriptor?.get;
}

export type Dict<T> = Record<string, T>;

export function forEach<T>(dict: Dict<T>, cb: (value: T, key?: string) => unknown) {
  Object.keys(dict).forEach(key => cb(dict[key], key));
}

export function defineGetter(target: object, methodName: string, getter: () => any) {
  Object.defineProperty(target, methodName, {
    configurable: true,
    enumerable: true,
    get: getter,
  });
}

export function capitalize(srt: string): string {
  return srt.charAt(0).toUpperCase() + srt.slice(1);
}
