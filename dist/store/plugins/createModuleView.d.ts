import { GetProps, StateView } from '../StateView';
import { GetMerge } from '../../utils';
import { Flatten, GetModuleInstanceFor, Injector } from '../../scope';
export declare function createModuleView<TModule>(module: TModule): GetModuleStateView<TModule>;
export declare type GetModuleSelfView<TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>> = TModule extends {
    exportComponentData: () => ({
        self: StateView<infer TView>;
    });
} ? TView : {};
export declare type GetModuleExtraView<TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>> = TModule extends {
    exportComponentData: () => ({
        extra: StateView<infer TView>;
    });
} ? TView : {};
export declare type GetComponentDataForModule<TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>, TSelfExport = GetModuleSelfView<TModuleConfig>, TExtraExport = GetModuleExtraView<TModuleConfig>, TInjectedProps = TModule extends {
    exportComponentData: () => any;
} ? {} : GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>> = GetMerge<TExtraExport, TSelfExport & TInjectedProps>;
export declare type GetModuleStateView<TModuleConfig> = StateView<GetComponentDataForModule<TModuleConfig>>;
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
