import { ReduxModuleManager, TInstances, TServiceConstructorMap } from './store';
export declare abstract class ReduxModule {
    dependencies: TServiceConstructorMap;
    protected deps: TInstances<this['dependencies']>;
    private moduleManager?;
    beforeInit(moduleManager?: ReduxModuleManager): void;
    inject<T>(injectedObject: T): import("./store").GetInjectReturnType<T>;
    createModule<TModuleClass extends new (...args: any) => any>(ModuleClass: TModuleClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TModuleClass>;
}
export declare class Service extends ReduxModule {
}
