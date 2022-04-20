import { TLoadingStatus } from '../..';
export declare class LoadingState {
    loadingStatus: TLoadingStatus;
    get isLoading(): boolean;
    get isLoaded(): boolean;
}
export declare function injectLoading(): import("../..").InjectedProp<import("../Store").GetStateControllerFor<typeof LoadingState, LoadingState, {
    loadingStatus: TLoadingStatus;
}>, import("./inject-state").GetStateViewFor<typeof LoadingState>, import("./inject-state").GetStateViewFor<typeof LoadingState>>;
