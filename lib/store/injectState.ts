import { createInjector } from '../scope/injector';
import { Provider } from '../scope/provider';
import { createLoadingState } from './plugins/pickLoadingState';
import { Store, TStateConfigCreator, TStateControllerFor } from './Store';

export const StateInjectorType = Symbol('stateInjector');

export function injectState<TConfigCreator extends TStateConfigCreator>(configCreator: TConfigCreator): TStateControllerFor<TConfigCreator> {
  return createInjector(injector => {

    function createState() {
      return createStateForModule(injector.provider, configCreator);
    }

    let state: ReturnType<typeof createState> = null as any;

    return {
      type: StateInjectorType,
      load: () => {
        state = createState();
      },
      getValue() {
        return state;
      },
    };
  });
}

function createStateForModule<TConfigCreator extends TStateConfigCreator>(provider: Provider<any>, stateConfig: TConfigCreator): TStateControllerFor<TConfigCreator> {
  const stateName = provider.instanceId;
  const store = provider.scope.resolve(Store);
  const moduleState = store.createState(stateName, stateConfig);
  createLoadingState(store, provider);
  return moduleState;
}
