import { InjectedProp } from '../scope/injector';
import { GetModuleExtraView, GetModuleStateView } from './StateView';
export declare const ChildModuleInjectorType: unique symbol;
export declare function injectChild<TModule>(Module: TModule, ...args: any): InjectedProp<TModule, GetModuleStateView<TModule>, GetModuleExtraView<TModule>>;
