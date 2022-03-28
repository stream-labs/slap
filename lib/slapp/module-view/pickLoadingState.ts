import { GetModule, GetProps, StateView } from './state-view';
import { getKeys } from '../../traverse';
import { Store, TStateControllerFor } from '../../store';
import { getInstanceMetadata, Provider } from '../../scope/provider';
import { TLoadingStatus } from '../interfaces';

export function pickLoadingState<TModule, TProps>(props: TProps, view: StateView<TModule, TProps>): PickLoadingState<StateView<TModule, TProps>> {

  const provider = getInstanceMetadata(view.module).provider;
  const stateName = getLoadingStateName(provider.instanceId);
  const store = provider.scope.resolve(Store);
  const stateController = store.getMetadata(stateName)?.controller;

  if (!stateController) return view as any; // module is not stateful

  getKeys(stateController).forEach(propName => {
    view.stateSelector.defineProp({
      type: 'LoadingState',
      name: propName,
      getValue: () => stateController[propName],
    });
  });

  return view as any;
}

export type PickLoadingState<TModuleView> =
  StateView<
    GetModule<TModuleView>,
    GetProps<TModuleView> & TStateControllerFor<LoadingState>
  >;

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

  // moduleProvider.events.on('onModuleLoaded', () => {
  //   console.log('Module is loaded', stateName);
  //   loadingState.setLoadingStatus('done');
  // });
}

export function getLoadingStateName(moduleStateName: string) {
  return moduleStateName + '__loading_state';
}
