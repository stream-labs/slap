/**
 * onCreate shortcut
 * Helpful if you need to calculate an immutable initial state for a component
 */
export declare function useOnCreate<TReturnValue>(cb: () => TReturnValue): TReturnValue;
/**
 * onDestroy shortcut
 */
export declare function useOnDestroy(cb: () => void): void;
/**
 * Returns a unique component id
 * If DEBUG=true then the componentId includes a component name
 */
export declare function useComponentId(): string;
