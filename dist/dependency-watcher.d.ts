/**
 * Wraps the given object in a Proxy for watching read operations on this object
 *
 * @example
 *
 * const myObject = { foo: 1, bar: 2, qux: 3};
 * const { watcherProxy, getDependentFields } = createDependencyWatcher(myObject);
 * const { foo, bar } = watcherProxy;
 * getDependentFields(); // returns ['foo', 'bar'];
 *
 */
export declare function createDependencyWatcher<T extends object>(watchedObject: T): {
    watcherProxy: T;
    getDependentFields: () => string[];
    getDependentValues: () => Partial<T>;
};
