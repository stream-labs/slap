import { GetProps, StateView } from '../StateView';
export declare function pickStateViews<TView extends StateView<any>, TModule>(module: TModule): (props: GetProps<TView>, view: TView) => PickStateViews<TView, TModule>;
export declare type GetStateViewName<TModule, TProp extends keyof TModule> = TModule[TProp] extends StateView<any> ? TProp : never;
export declare type PickStateViews<TView, TModule> = StateView<GetProps<TView> & GetStateViewProps<TModule>>;
export declare type GetStateViewProps<TModule> = {
    [K in keyof TModule as GetStateViewName<TModule, K>]: TModule[K] extends StateView<any> ? TModule[K]['props'] : never;
};
