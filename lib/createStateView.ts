import { merge, TMerge3 } from './merge';
import { lockThis } from './lockThis';

export function createView<
  TStateType,
  TService extends { state: TStateType },
  TGetters extends Object,
  >
(service: TService, view: TGetters) {
  // const actions = {} as TPromisifyFunctions<TService>;
  // const getters = view;
  // const originalState = {} as any as TService['state'];
  // const combinedView = {} as any as typeof actions & typeof getters & TService['state'];
  // return combinedView;

  const actions = lockThis(service);
  const getters = lockThis(view);

  const mergedView = merge(
    // allow to select variables from the module's state
    () => service.state,
    // allow to select actions
    () => actions,
    // allow to select getters
    () => getters,
  );

  // return mergedView as TMerge3<typeof service['state'], typeof service, typeof view>;
  return mergedView as TMerge3<TService['state'], TService, TGetters>;
}
