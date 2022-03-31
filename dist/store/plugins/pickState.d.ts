import { GetProps, StateView } from '../StateView';
export declare type PickState<TView, TModule> = StateView<GetProps<TView> & GetModuleState<TModule>>;
export declare type GetModuleState<TModule> = TModule extends {
    state: infer TState;
} ? TState : {};
export declare function pickState<TView extends StateView<any>, TModule>(module: TModule): (props: GetProps<TView>, view: TView) => PickState<TView, TModule>;
