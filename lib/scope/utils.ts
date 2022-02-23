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
