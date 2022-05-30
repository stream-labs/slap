import {
  InjectedProp, injectProvider,
} from '../../scope/injector';

import { GetModuleInstanceFor } from '../../scope';
import { GetModuleExtraValue, GetModuleStateView } from './createModuleView';

export type GetModuleInjectorValue<TModuleConfig> = GetModuleInstanceFor<TModuleConfig> extends { exportInjectorValue: (...args: any) => infer TValue } ? TValue : GetModuleInstanceFor<TModuleConfig>;

/**
 * Inject module as a child module
 * The child module will be initialized and destroyed with a parent module
 */
export function injectChild<TModule>(Module: TModule, ...args: any): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleExtraValue<TModule>> {
  const provider = injectProvider();
  const injectedValue = provider.injectChildModule(Module, ...args);
  return injectedValue;
}
