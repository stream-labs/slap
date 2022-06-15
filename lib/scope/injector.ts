import { InjectableModuleTyped, TModuleClass } from './interfaces';
import { getCurrentProvider, getCurrentScope } from './scope';
import { InjectedPropOptions, Provider } from './provider';
import {
  GetModuleExtraValue,
  GetModuleInjectorValue,
  GetModuleStateView,
  StateView,
} from '../store';

export function inject<TModule extends TModuleClass>(ModuleClass: TModule, options?: InjectedPropOptions): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleExtraValue<TModule>> {
  const provider = injectProvider();
  const module = provider.injectModule(ModuleClass, options);
  return module;
}

/**
 * Inject module and expose its props to a component's selector
 */
export function injectExposed<TModule extends TModuleClass>(ModuleClass: TModule) {
  return inject(ModuleClass, { isExposed: true }) as InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleStateView<TModule>>;
}

export function injectScope() {
  return getCurrentScope()!;
}

export function injectProvider(): Provider<any> {
  return getCurrentProvider()!;
}

export type InjectedProp<TValue, TSelectorValue, TSelectorExtraValues> =
  TValue & { __injector: InjectableModuleTyped<TValue, TSelectorValue, TSelectorExtraValues> };
