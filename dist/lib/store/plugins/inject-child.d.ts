import { InjectedProp } from '../../scope/injector';
import { GetModuleExtraView, GetModuleStateView } from '../StateView';
import { TModuleInstanceFor } from '../../scope';
export declare const ChildModuleInjectorType: unique symbol;
export declare type GetModuleInjectorValue<TModuleConfig> = TModuleInstanceFor<TModuleConfig> extends {
    exportInjectorValue: (...args: any) => infer TValue;
} ? TValue : TModuleInstanceFor<TModuleConfig>;
export declare function injectChild<TModule>(Module: TModule, ...args: any): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleExtraView<TModule>>;
