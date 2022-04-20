import { InjectedProp } from '../../scope/injector';
import { GetModuleExtraView, GetModuleStateView } from '../StateView';
import { GetModuleInstanceFor } from '../../scope';
export declare const ChildModuleInjectorType: unique symbol;
export declare type GetModuleInjectorValue<TModuleConfig> = GetModuleInstanceFor<TModuleConfig> extends {
    exportInjectorValue: (...args: any) => infer TValue;
} ? TValue : GetModuleInstanceFor<TModuleConfig>;
export declare function injectChild<TModule>(Module: TModule, ...args: any): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleExtraView<TModule>>;
