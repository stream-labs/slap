import { StateView } from '../StateView';
import { GetMerge } from '../../utils';
import { Flatten, GetModuleInstanceFor, InjectableModuleTyped } from '../../scope';
export declare function createModuleView<TModule>(module: TModule): GetModuleStateView<TModule>;
export declare type GetModuleSelectorValue<TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>> = TModule extends {
    exportSelectorValue: () => StateView<infer TView>;
} ? TView : {};
export declare type GetModuleExtraValue<TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>> = TModule extends {
    exportExtraSelectorValues: () => StateView<infer TView>;
} ? TView : {};
export declare type GetComponentDataForModule<TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>, TSelectorExport = GetModuleSelectorValue<TModuleConfig>, TSelectorExtraExport = GetModuleExtraValue<TModuleConfig>, TInjectedProps = TModule extends {
    exportSelectorValue: () => any;
} ? {} : GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>> = GetMerge<TSelectorExtraExport, TSelectorExport & TInjectedProps>;
export declare type GetModuleStateView<TModuleConfig> = StateView<GetComponentDataForModule<TModuleConfig>>;
export declare type GetInjectedPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends {
    __injector: InjectableModuleTyped<any, any, any>;
} ? TProp : never;
export declare type GetInjectedExtraPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends {
    __injector: InjectableModuleTyped<any, any, infer TExtraProps>;
} ? TExtraProps extends StateView ? TProp : never : never;
export declare type GetInjectedProps<TModule> = {
    [K in keyof TModule as GetInjectedPropName<TModule, K>]: TModule[K] extends {
        __injector: InjectableModuleTyped<any, StateView<infer TInjectorView>, any>;
    } ? TInjectorView : never;
};
export declare type GetExtraInjectedProps<TModule> = {
    [K in keyof TModule as GetInjectedExtraPropName<TModule, K>]: TModule[K] extends {
        __injector: InjectableModuleTyped<any, any, StateView<infer TExtraProps>>;
    } ? TExtraProps : never;
};
export declare type GetFlattenExtraProps<TModule> = keyof GetExtraInjectedProps<TModule> extends never ? {} : Flatten<GetExtraInjectedProps<TModule>>;
export declare type GetAllInjectedProps<TModule> = GetMerge<GetFlattenExtraProps<TModule>, GetInjectedProps<TModule>>;
