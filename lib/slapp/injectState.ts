import { Store } from '../store';
import { createInjector } from '../scope/injector';

export const StateInjectorType = Symbol('stateInjector');

export function injectState<T extends new (...args: any[]) => {state: any}>(StateControllerClass: T) {
  return createInjector(injector => {
    const provider = injector.provider;
    const store = provider.scope.resolve(Store);
    const state = store.createModuleState(provider, StateControllerClass);
    return {
      type: StateInjectorType,
      getValue() {
        return state;
      },
    };
  });
}
