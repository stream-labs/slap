import { isPlainObject } from 'is-plain-object';

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


export function forEach<TDict, TKey extends keyof TDict>(dict: TDict, cb: (val: TDict[TKey], key: TKey) => unknown) {
  Object.keys(dict).forEach(propName => {
    (cb as any)((dict as any)[propName], propName);
  });
}

export function defineGetter(target: object, methodName: string, getter: () => any, descriptor?: Partial<PropertyDescriptor>) {
  Object.defineProperty(target, methodName, {
    configurable: descriptor?.configurable ?? true,
    enumerable: descriptor?.enumerable ?? true,
    get: getter,
  });
}

export function defineSetter(target: object, methodName: string, setter: (val: any) => boolean, descriptor?: Partial<PropertyDescriptor>) {
  Object.defineProperty(target, methodName, {
    configurable: descriptor?.configurable ?? true,
    enumerable: descriptor?.enumerable ?? true,
    set: setter,
  });
}

export function createConfig<TConfig>(configCreator: TConfig | (new (...args: any) => TConfig)): TConfig {
  const config = isPlainObject(configCreator) ? configCreator : new (configCreator as any)();
  return config;
}

export function capitalize(srt: string): string {
  return srt.charAt(0).toUpperCase() + srt.slice(1);
}
