import { TModuleInstanceFor, TModuleLocatorType } from '../scope';
import { ComponentView, GetProps, MergeViews, StateView, TStateViewFor } from '../store/StateView';
export declare function useComponentView<TStateView extends StateView<any>>(moduleView: TStateView, id?: string): TStateView['props'] & {
    componentView: ComponentView<TStateView>;
    extend: <TNewProps>(newPropsFactory: (props: GetProps<TStateView>) => TNewProps) => (MergeViews<StateView<GetProps<TStateView> & TNewProps>, TStateViewFor<TNewProps>>)['props'] & {
        componentView: ComponentView<TStateView>;
    };
};
export declare function useModule<T extends TModuleLocatorType, TInitState extends boolean | Partial<TModuleInstanceFor<T>['state']>>(locator: T, initProps?: TInitState | null, moduleName?: string): TModuleInstanceFor<T> & import("../store/plugins/pickStateViews").GetStateViewProps<TModuleInstanceFor<T>> & {
    loadingStatus: import("../scope").TLoadingStatus;
} & import("..").ModuleStateController & import("..").PickGeneratedMutations<{
    loadingStatus: import("../scope").TLoadingStatus;
}> & Omit<import("../store/plugins/pickLoadingState").LoadingState, never> & import("../store/plugins/pickState").GetModuleState<TModuleInstanceFor<T>> & import("../store/plugins/pickControllers").GetControllerProps<TModuleInstanceFor<T>> & {
    componentView: ComponentView<import("../store/plugins/pickControllers").PickControllers<StateView<TModuleInstanceFor<T> & import("../store/plugins/pickStateViews").GetStateViewProps<TModuleInstanceFor<T>> & {
        loadingStatus: import("../scope").TLoadingStatus;
    } & import("..").ModuleStateController & import("..").PickGeneratedMutations<{
        loadingStatus: import("../scope").TLoadingStatus;
    }> & Omit<import("../store/plugins/pickLoadingState").LoadingState, never> & import("../store/plugins/pickState").GetModuleState<TModuleInstanceFor<T>>>, TModuleInstanceFor<T>>>;
    extend: <TNewProps>(newPropsFactory: (props: TModuleInstanceFor<T> & import("../store/plugins/pickStateViews").GetStateViewProps<TModuleInstanceFor<T>> & {
        loadingStatus: import("../scope").TLoadingStatus;
    } & import("..").ModuleStateController & import("..").PickGeneratedMutations<{
        loadingStatus: import("../scope").TLoadingStatus;
    }> & Omit<import("../store/plugins/pickLoadingState").LoadingState, never> & import("../store/plugins/pickState").GetModuleState<TModuleInstanceFor<T>> & import("../store/plugins/pickControllers").GetControllerProps<TModuleInstanceFor<T>>) => TNewProps) => TModuleInstanceFor<T> & import("../store/plugins/pickStateViews").GetStateViewProps<TModuleInstanceFor<T>> & {
        loadingStatus: import("../scope").TLoadingStatus;
    } & import("..").ModuleStateController & import("..").PickGeneratedMutations<{
        loadingStatus: import("../scope").TLoadingStatus;
    }> & Omit<import("../store/plugins/pickLoadingState").LoadingState, never> & import("../store/plugins/pickState").GetModuleState<TModuleInstanceFor<T>> & import("../store/plugins/pickControllers").GetControllerProps<TModuleInstanceFor<T>> & TNewProps & TModuleInstanceFor<TNewProps> & import("../store/plugins/pickStateViews").GetStateViewProps<TModuleInstanceFor<TNewProps>> & import("../store/plugins/pickState").GetModuleState<TModuleInstanceFor<TNewProps>> & import("../store/plugins/pickControllers").GetControllerProps<TModuleInstanceFor<TNewProps>> & {
        componentView: ComponentView<import("../store/plugins/pickControllers").PickControllers<StateView<TModuleInstanceFor<T> & import("../store/plugins/pickStateViews").GetStateViewProps<TModuleInstanceFor<T>> & {
            loadingStatus: import("../scope").TLoadingStatus;
        } & import("..").ModuleStateController & import("..").PickGeneratedMutations<{
            loadingStatus: import("../scope").TLoadingStatus;
        }> & Omit<import("../store/plugins/pickLoadingState").LoadingState, never> & import("../store/plugins/pickState").GetModuleState<TModuleInstanceFor<T>>>, TModuleInstanceFor<T>>>;
    };
};
