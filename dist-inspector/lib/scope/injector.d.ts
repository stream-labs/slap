import { InjectableModuleTyped, TModuleClass } from './interfaces';
import { InjectedPropOptions, Provider } from './provider';
import { GetModuleExtraValue, GetModuleInjectorValue, GetModuleStateView } from '../store';
export declare function inject<TModule extends TModuleClass>(ModuleClass: TModule, options?: InjectedPropOptions): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleExtraValue<TModule>>;
/**
 * Inject module and expose its props to a component's selector
 */
export declare function injectExposed<TModule extends TModuleClass>(ModuleClass: TModule): InjectedProp<GetModuleInjectorValue<TModule>, GetModuleStateView<TModule>, GetModuleStateView<TModule>>;
export declare function injectScope(): import("./scope").Scope;
export declare function injectProvider(): Provider<any>;
export declare type InjectedProp<TValue, TSelectorValue, TSelectorExtraValues> = TValue & {
    __injector: InjectableModuleTyped<TValue, TSelectorValue, TSelectorExtraValues>;
};
