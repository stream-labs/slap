import { injectState, TLoadingStatus } from '../..';

export class LoadingState {
  loadingStatus: TLoadingStatus = 'not-started';

  get isLoading() {
    return this.loadingStatus === 'loading';
  }

  get isLoaded() {
    return this.loadingStatus === 'done';
  }
}

export function injectLoading() {
  return injectState(LoadingState, (stateController, injector) => {

    const provider = injector.provider;

    provider.events.on('onModuleInit', () => {

      if (!provider.isAsync) {
        stateController.nonReactiveUpdate({ loadingStatus: 'done' });
        return;
      }

      stateController.nonReactiveUpdate({ loadingStatus: 'loading' });

      provider.waitForLoad.then(() => {
        stateController.setLoadingStatus('done');
      });
    });
  });
}
