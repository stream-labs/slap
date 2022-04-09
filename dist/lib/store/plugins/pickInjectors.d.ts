import { GetProps, StateView } from '../StateView';
import { Injector } from '../../scope';
import { Flatten } from '../../scope/flatten';
export declare function pickInjectors<TView extends StateView<any>, TModule>(module: TModule): (props: GetProps<TView>, view: TView) => PickInjectedViews<TView, TModule>;
export declare type GetInjectedPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends {
    __injector: Injector<any, any>;
} ? TProp : never;
export declare type GetInjectedProps<TModule> = {
    [K in keyof TModule as GetInjectedPropName<TModule, K>]: TModule[K] extends {
        __injector: Injector<any, StateView<infer TInjectorView>>;
    } ? TInjectorView : never;
};
export declare type GetFlattenInjectedProps<TModule> = Flatten<GetInjectedProps<TModule>>;
export declare type GetAllInjectedProps<TModule> = GetFlattenInjectedProps<TModule> & GetInjectedProps<TModule>;
export declare type PickInjectedViews<TView, TModule> = StateView<GetProps<TView> & GetFlattenInjectedProps<TModule>>;
