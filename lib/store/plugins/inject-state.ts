import {
  createInjector,
  InjectedProp,
  Injector,
} from '../../scope';

import {
  ModuleStateController,
  Store, TStateConfigCreator, TStateControllerFor, TStateViewForStateConfig,
} from '../Store';
import { StateView } from '../StateView';

export const StateInjectorType = Symbol('stateInjector');

export function injectState<
  TConfigCreator extends TStateConfigCreator,
  TValue = TStateControllerFor<TConfigCreator>,
  TViewValue = StateView<TStateViewForStateConfig<TConfigCreator>>,
  >(configCreator: TConfigCreator, onCreate?: (stateController: TValue, injector: Injector<TValue, TViewValue, TViewValue>) => unknown): InjectedProp<TValue, TViewValue, TViewValue> {
  return createInjector(injector => {

    const store = injector.provider.scope.resolve(Store);
    let state: TValue = null as any;
    let stateView: TViewValue = null as any;

    function createState(propName: string) {
      const moduleName = injector.provider.instanceId;
      const moduleState = store.createState(moduleName, propName, configCreator);
      return moduleState;
    }

    return {
      type: StateInjectorType,
      load: () => {
        state = createState(injector.propertyName) as TValue;
        stateView = (state as any as ModuleStateController).createView() as any as TViewValue;
        onCreate && onCreate(state, injector);
      },
      getValue() {
        return state;
      },

      exportComponentData() {
        return {
          self: stateView,
          extra: stateView,
        };
      },
      destroy(injector) {
        const moduleName = injector.provider.instanceId;
        store.destroyModule(moduleName);
      },
    };
  });
}
