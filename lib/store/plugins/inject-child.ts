import {
  createInjector, InjectedProp, injectProvider,
} from '../../scope/injector';
import {
  GetComponentDataForModule,
  GetModuleExtraView, GetModuleStateView,
  StateView
} from '../StateView';
import { InjectableModule, generateId, GetModuleInstanceFor } from '../../scope';

export const ChildModuleInjectorType = Symbol('childModuleInjector');

export type GetModuleInjectorValue<TModuleConfig> = GetModuleInstanceFor<TModuleConfig> extends { exportInjectorValue: (...args: any) => infer TValue } ? TValue : GetModuleInstanceFor<TModuleConfig>;

export function injectChild<TModule>(Module: TModule, ...args: any): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleExtraView<TModule>> {

  const provider = injectProvider();
  const injectedValue = provider.injectChildModule(Module, ...args);
  return injectedValue;

  // return createInjector(injector => {
  //
  //   const scope = injector.provider.resolveChildScope();
  //   const moduleName = `${injector.provider.id}__injected_module_${generateId()}`;
  //   scope.register(Module, moduleName, { injector });
  //   scope.init(moduleName, ...args);
  //
  //   return {
  //     type: ChildModuleInjectorType,
  //     getValue: () => {
  //       const module = scope.resolve(moduleName) as InjectableModule;
  //       if (module.exportInjectorValue) {
  //         return module.exportInjectorValue();
  //       }
  //       return module;
  //     },
  //     exportComponentData: () => {
  //       const module = scope.resolve(moduleName) as InjectableModule;
  //       return module.exportComponentData && module.exportComponentData() as any;
  //     },
  //     destroy() {
  //       scope.unregister(moduleName);
  //     },
  //   };
  // });
}
