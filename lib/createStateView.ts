import { merge, TMerge3, unwrapState } from './merge';
import { lockThis } from './lockThis';
import { TPromisifyFunctions } from './store';

// export function createViewWithActions<
//   TStateType,
//   TActions extends Object,
//   TGetters extends { state: TStateType },
//   >
// (actions: TActions, getters: TGetters) {
//   const lockedActions = lockThis(actions);
//   (lockedActions as any).state && delete (lockedActions as any).state;
//   const lockedGetters = lockThis(getters);
//   const mergedView = merge([
//     // allow to select variables from the module's state
//     () => lockedGetters.state,
//     // allow to select actions
//     lockedActions,
//     // allow to select getters
//     lockedGetters,
//   ]);
//
//
//   // const mergedView = merge(
//   //   // allow to select variables from the module's state
//   //   () => actions.state,
//   //   // allow to select actions
//   //   () => lockedActions,
//   //   // allow to select getters
//   //   () => lockedGetters,
//   // );
//   return mergedView as TMerge3<TGetters['state'], TPromisifyFunctions<TActions>, TGetters>;
// }

export function createViewWithActions<
  TActions extends Object,
  TGetters extends { state: any },
  >
(getters: TGetters, actions: TActions) {
  const lockedActions = lockThis(actions);
  const lockedGetters = lockThis(getters);
  const unwrappedGetters = unwrapState(lockedGetters);
  const mergedView = merge([lockedActions, unwrappedGetters]);

  return mergedView as TMerge3<TGetters['state'], TPromisifyFunctions<TActions>, TGetters>;
}
