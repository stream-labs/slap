import { getInstanceMetadata, injectState, TLoadingStatus } from '../..';

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
  return injectState(LoadingState, false,statefulModule => {

    // const parentProvider = getInstanceMetadata(statefulModule).provider.injector!.provider;
    //
    // parentProvider.events.on('onModuleInit', () => {
    //
    //   if (!parentProvider.isAsync) {
    //     statefulModule.stateController.nonReactiveUpdate({ loadingStatus: 'done' });
    //     return;
    //   }
    //
    //   statefulModule.stateController.nonReactiveUpdate({ loadingStatus: 'loading' });
    //
    //   parentProvider.waitForLoad.then(() => {
    //     statefulModule.stateController.setLoadingStatus('done');
    //   });
    // });
  });
}
