import { merge, TMerge3 } from './merge';
import { lockThis } from './lockThis';
import { TPromisifyFunctions } from './store';

export function createViewWithActions<
  TStateType,
  TActions extends { state: TStateType },
  TGetters extends Object,
  >
(actions: TActions, getters: TGetters) {
  const lockedActions = lockThis(actions);
  const lockedGetters = lockThis(getters);
  const mergedView = merge([
    // allow to select variables from the module's state
    () => actions.state,
    // allow to select actions
    lockedActions,
    // allow to select getters
    lockedGetters,
  ]);


  // const mergedView = merge(
  //   // allow to select variables from the module's state
  //   () => actions.state,
  //   // allow to select actions
  //   () => lockedActions,
  //   // allow to select getters
  //   () => lockedGetters,
  // );
  return mergedView as TMerge3<TActions['state'], TPromisifyFunctions<TActions>, TGetters>;
}
