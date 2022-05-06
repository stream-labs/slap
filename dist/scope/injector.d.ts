import { InjectableModuleTyped, TModuleClass } from './interfaces';
import { Provider } from './provider';
export declare function inject<T extends TModuleClass>(ModuleClass: T): import("./interfaces").GetModuleInstanceFor<T>;
export declare function injectScope(): import("./scope").Scope;
export declare function injectProvider(): Provider<any>;
export declare type InjectedProp<TValue, TSelectorValue, TSelectorExtraValues> = TValue & {
    __injector: InjectableModuleTyped<TValue, TSelectorValue, TSelectorExtraValues>;
};
