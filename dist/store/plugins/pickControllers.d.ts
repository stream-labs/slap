import { GetProps, StateView } from '../StateView';
export declare function pickControllers<TView extends StateView<any>, TModule>(module: TModule): (props: GetProps<TView>, view: TView) => PickControllers<TView, TModule>;
export declare type PickControllers<TView, TModule> = StateView<GetProps<TView> & GetControllerProps<TModule>>;
export declare type GetControllerName<TStr> = TStr extends `${infer TName}Controller` ? TName : never;
export declare type GetControllerProps<T> = {
    [K in keyof T as GetControllerName<K>]: T[K];
};
