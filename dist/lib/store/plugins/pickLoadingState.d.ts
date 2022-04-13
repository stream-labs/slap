import { TLoadingStatus } from '../../scope';
export declare class LoadingState {
    loadingStatus: TLoadingStatus;
    get isLoading(): boolean;
    get isLoaded(): boolean;
}
export declare function injectLoading(): import("../../scope").InjectedProp<import("..").TStateControllerFor<typeof LoadingState, LoadingState, {
    loadingStatus: TLoadingStatus;
}>, import("..").StateView<import("..").TStateViewForStateConfig<typeof LoadingState>>, import("..").StateView<import("..").TStateViewForStateConfig<typeof LoadingState>>>;
