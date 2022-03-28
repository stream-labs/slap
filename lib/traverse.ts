/**
 * Travers class methods and props
 */
import { isPlainObject } from 'is-plain-object';
import { Dict } from './scope';

// helper methods to travers class instances prototype chains

export function traverse<T extends object>(
  instance: T,
  cb: (propName: string, descriptor: PropertyDescriptor) => unknown,
) {
  let entity = instance;
  const prototypes = [];

  if (isPlainObject(entity)) {
    prototypes.push(entity);
  } else {
    while (entity.constructor.name !== 'Object') {
      prototypes.push(entity);
      entity = Object.getPrototypeOf(entity);
    }
  }

  const alreadyTraversed: Record<string, boolean> = {};

  for (const proto of prototypes) {
    const propNames = Object.getOwnPropertyNames(proto);
    for (const propName of propNames) {
      if (propName in alreadyTraversed) continue;
      alreadyTraversed[propName] = true;
      const descriptor = Object.getOwnPropertyDescriptor(proto, propName);
      if (!descriptor) return;
      const shouldStop = cb(propName, descriptor);
      if (shouldStop) return;
    }
  }
}

export function getDescriptors<T>(instance: T): Dict<PropertyDescriptor>{
  const descriptors: Dict<PropertyDescriptor> = {}
  traverse(instance as any, (propName, descriptor) => {
    descriptors[propName] = descriptor;
  });
  return descriptors;
}

export function getKeys<T>(instance: T): (keyof T)[]{
  const keys: any[] = [];
  traverse(instance as any, propName => {
    keys.push(propName);
  });
  return keys;
}

export function filterKeys(obj: object, filterFn: (key: string) => unknown) {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => filterFn(key)));
}
