import { TLoadingStatus } from '../..';
export declare class LoadingState {
    loadingStatus: TLoadingStatus;
    get isLoading(): boolean;
    get isLoaded(): boolean;
}
export declare function injectLoading(): import("../..").InjectedProp<import("../Store").TStateControllerFor<typeof LoadingState, LoadingState, {
    loadingStatus: TLoadingStatus;
}>, import("../StateView").StateView<import("../Store").TStateViewForStateConfig<typeof LoadingState>>, import("../StateView").StateView<import("../Store").TStateViewForStateConfig<typeof LoadingState>>>;
