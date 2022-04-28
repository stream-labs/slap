import React from 'react';
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
 * Get component name from the callstack
 * Use for debugging only
 */
export declare function getComponentName(): string;
/**
 * Returns a function for force updating of the component
 */
export declare function useForceUpdate(): React.DispatchWithoutAction;
