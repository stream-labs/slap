import {
  createInjector, InjectedProp,
} from '../../scope/injector';
import { GetModuleExtraView, GetModuleStateView } from '../StateView';

export const ChildModuleInjectorType = Symbol('childModuleInjector');

export function injectChild<TModule>(Module: TModule, ...args: any): InjectedProp<TModule, GetModuleStateView<TModule>, GetModuleExtraView<TModule>> {
  return createInjector(injector => {

    const scope = injector.provider.resolveChildScope();
    let moduleName = '';

    return {
      type: ChildModuleInjectorType,
      load() {
        moduleName = injector.propertyName;
        scope.register(Module, moduleName, { parentProvider: injector.provider });
        scope.init(moduleName, ...args);
      },
      getValue: () => scope.resolve(moduleName) as any,
      exportComponentData: () => {
        const module = scope.resolve(moduleName) as any;
        return module.exportComponentData && module.exportComponentData() as any;
      },
      destroy() {
        scope.unregister(moduleName);
      },
    };
  });
}
