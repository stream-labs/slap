import { GetProps, StateView } from '../StateView';
import { Injector } from '../../scope';
import { Flatten } from '../../scope/flatten';
import { GetMerge } from '../../utils';
export declare type GetInjectedPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends {
    __injector: Injector<any, any, any>;
} ? TProp : never;
export declare type GetInjectedExtraPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends {
    __injector: Injector<any, any, infer TExtraProps>;
} ? TExtraProps extends StateView ? TProp : never : never;
export declare type GetInjectedProps<TModule> = {
    [K in keyof TModule as GetInjectedPropName<TModule, K>]: TModule[K] extends {
        __injector: Injector<any, StateView<infer TInjectorView>, any>;
    } ? TInjectorView : never;
};
export declare type GetExtraInjectedProps<TModule> = {
    [K in keyof TModule as GetInjectedExtraPropName<TModule, K>]: TModule[K] extends {
        __injector: Injector<any, any, StateView<infer TExtraProps>>;
    } ? TExtraProps : never;
};
export declare type GetFlattenExtraProps<TModule> = keyof GetExtraInjectedProps<TModule> extends never ? {} : Flatten<GetExtraInjectedProps<TModule>>;
export declare type GetAllInjectedProps<TModule> = GetMerge<GetFlattenExtraProps<TModule>, GetInjectedProps<TModule>>;
export declare type PickInjectedViews<TView, TModule> = StateView<GetProps<TView> & GetAllInjectedProps<TModule>>;
