/**
 * Re-bind this for all object's methods to ensure `this` is always defined
 * This method is useful if we extract methods from an objet this way:
 *
 * const { action1, action2 } = actions;
 */
export declare function lockThis<T extends object>(instance: T, self?: T): T;
