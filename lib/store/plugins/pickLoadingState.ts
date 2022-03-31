import { getInstanceMetadata, Provider } from '../../scope/provider';
import { getKeys } from '../../utils/traverse';
import { GetProps, StateView } from '../StateView';
import { Store, TStateControllerFor } from '../store';
import { TLoadingStatus } from '../../scope';

export function pickLoadingState<TView extends StateView<any>>(module: unknown): (props: GetProps<TView>, view: TView) => PickLoadingState<TView> {

  return function (props, view) {

    const provider = getInstanceMetadata(module).provider;
    const stateName = getLoadingStateName(provider.instanceId);
    const store = provider.scope.resolve(Store);
    const stateController = store.getMetadata(stateName)?.controller;

    if (!stateController) return view as any; // module is not stateful

    getKeys(stateController)
      .forEach(propName => {
        view.defineProp({
          type: 'LoadingState',
          name: propName,
          getValue: () => stateController[propName],
        });
      });

    return view as any;
  };
}

export type PickLoadingState<TView> = StateView<GetProps<TView> & GetLoadingState>;
export type GetLoadingState = TStateControllerFor<LoadingState>;

export class LoadingState {
  loadingStatus: TLoadingStatus = 'not-started';

  get isLoading() {
    return this.loadingStatus === 'loading';
  }

  get isLoaded() {
    return this.loadingStatus === 'done';
  }
}

export function createLoadingState(store: Store, moduleProvider: Provider<any>) {
  const stateName = getLoadingStateName(moduleProvider.instanceId);
  const loadingState = store.createState(stateName, LoadingState);
  moduleProvider.waitForLoad.then(() => {
    loadingState.setLoadingStatus('done');
  });
}

export function getLoadingStateName(moduleStateName: string) {
  return moduleStateName + '__loading_state';
}
