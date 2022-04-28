import React, { useState, useEffect } from 'react';

/**
 * onCreate shortcut
 * Helpful if you need to calculate an immutable initial state for a component
 */
export function useOnCreate<TReturnValue>(cb: () => TReturnValue) {
  return useState(cb)[0];
}

/**
 * onDestroy shortcut
 */
export function useOnDestroy(cb: () => void) {
  useEffect(() => cb, []);
}

/**
 * Get component name from the callstack
 * Use for debugging only
 */
export function getComponentName(): string {
  try {
    throw new Error();
  } catch (e: unknown) {
    const error = e as Error;
    const regex = / at ([A-Z]\w+) /;
    try {
      const componentName = error.stack!.split('\n').find(message => message.match(regex))!.match(regex)![1];
      return componentName;
    } catch (e) {
      return 'unknown_component';
    }
  }
}

/**
 * Returns a function for force updating of the component
 */
export function useForceUpdate() {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  return forceUpdate;
}
