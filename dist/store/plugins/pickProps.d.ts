import { GetProps, StateView } from '../StateView';
export declare type PickModuleProps<TView, TModule> = StateView<GetProps<TView> & TModule>;
export declare function pickProps<TModule, TProps>(module: TModule): (props: TProps, view: StateView<TProps>) => StateView<TProps & TModule>;
