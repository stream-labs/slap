import {
  InjectedProp, injectProvider,
} from '../../scope/injector';
import {
  GetModuleExtraView, GetModuleStateView,
} from '../StateView';
import { GetModuleInstanceFor } from '../../scope';


export type GetModuleInjectorValue<TModuleConfig> = GetModuleInstanceFor<TModuleConfig> extends { exportInjectorValue: (...args: any) => infer TValue } ? TValue : GetModuleInstanceFor<TModuleConfig>;

export function injectChild<TModule>(Module: TModule, ...args: any): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleExtraView<TModule>> {

  const provider = injectProvider();
  const injectedValue = provider.injectChildModule(Module, ...args);
  return injectedValue;
}
