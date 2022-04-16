import {
  createInjector, InjectedProp,
} from '../../scope/injector';
import {
  GetComponentDataForModule,
  GetModuleExtraView, GetModuleStateView,
  StateView
} from '../StateView';
import { AppModule, TModuleInstanceFor } from '../../scope';

export const ChildModuleInjectorType = Symbol('childModuleInjector');

export type GetModuleInjectorValue<TModuleConfig> = TModuleInstanceFor<TModuleConfig> extends { exportInjectorValue: (...args: any) => infer TValue } ? TValue : TModuleInstanceFor<TModuleConfig>;

export function injectChild<TModule>(Module: TModule, ...args: any): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleExtraView<TModule>> {
  return createInjector(injector => {

    const scope = injector.provider.resolveChildScope();
    let moduleName = '';

    return {
      type: ChildModuleInjectorType,
      load() {
        moduleName = injector.propertyName;
        scope.register(Module, moduleName, { injector });
        scope.init(moduleName, ...args);
      },
      getValue: () => {
        const module = scope.resolve(moduleName) as AppModule;
        if (module.exportInjectorValue) {
          return module.exportInjectorValue();
        }
        return module;
      },
      exportComponentData: () => {
        const module = scope.resolve(moduleName) as AppModule;
        return module.exportComponentData && module.exportComponentData() as any;
      },
      destroy() {
        scope.unregister(moduleName);
      },
    };
  });
}
