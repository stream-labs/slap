let idCounter = 1;

export function generateId() {
  return (idCounter++).toString();
}

export type Dict<T> = Record<string, T>;

/**
 * Loop though an object
 */
export function forEach<TDict, TKey extends keyof TDict>(dict: TDict, cb: (val: TDict[TKey], key: TKey) => unknown) {
  Object.keys(dict).forEach(propName => {
    (cb as any)((dict as any)[propName], propName);
  });
}

/**
 * Register a getter on object
 */
export function defineGetter(target: object, methodName: string, getter: () => any, descriptor?: Partial<PropertyDescriptor>) {
  Object.defineProperty(target, methodName, {
    configurable: descriptor?.configurable ?? true,
    enumerable: descriptor?.enumerable ?? true,
    get: getter,
  });
}

/**
 * Register a setter on object
 */
export function defineSetter(target: object, methodName: string, setter: (val: any) => boolean, descriptor?: Partial<PropertyDescriptor>) {
  Object.defineProperty(target, methodName, {
    configurable: descriptor?.configurable ?? true,
    enumerable: descriptor?.enumerable ?? true,
    set: setter,
  });
}

/**
 * Capitalize the first letter
 */
export function capitalize(srt: string): string {
  return srt.charAt(0).toUpperCase() + srt.slice(1);
}

export function isClass(object: any) {
  // TODO find a better way to distinguish Class and Function
  return typeof object === 'function' && object.name && object.name.charAt(0) === object.name.charAt(0).toUpperCase();
}
