import { Provider } from '../../scope/provider';
import { GetProps, StateView } from '../StateView';
import { Store, TStateControllerFor } from '../Store';
import { TLoadingStatus } from '../../scope';
export declare function pickLoadingState<TView extends StateView<any>>(module: unknown): (props: GetProps<TView>, view: TView) => PickLoadingState<TView>;
export declare type PickLoadingState<TView> = StateView<GetProps<TView> & GetLoadingState>;
export declare type GetLoadingState = TStateControllerFor<LoadingState>;
export declare class LoadingState {
    loadingStatus: TLoadingStatus;
    get isLoading(): boolean;
    get isLoaded(): boolean;
}
export declare function createLoadingState(store: Store, moduleProvider: Provider<any>): void;
export declare function getLoadingStateName(moduleStateName: string): string;
