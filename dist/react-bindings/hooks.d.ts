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
 * Returns a unique component id
 * If DEBUG=true then the componentId includes a component name
 */
export declare function useComponentId(): string;
/**
 * Get component name from the callstack
 * Use for debugging only
 */
export declare function getComponentName(): string;
/**
 * Returns a function for force updating of the component
 * Use it only for frequently used components for optimization purposes
 *
 * Current implementation from
 * https://github.com/ant-design/ant-design/blob/master/components/_util/hooks/useForceUpdate.ts
 */
export declare function useForceUpdate(): React.DispatchWithoutAction;
