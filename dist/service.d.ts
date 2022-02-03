import { Subject } from 'rxjs';
import { TInstances, TModuleConstructorMap } from './store';
export declare class Scope {
    dependencies: TModuleConstructorMap;
    readonly parentScope: Scope | null;
    id?: string | undefined;
    constructor(dependencies?: TModuleConstructorMap, parentScope?: Scope | null, id?: string | undefined);
    instances: TInstances<this["dependencies"]>;
    resolve<T extends TModuleClass>(ModuleClass: T): InstanceType<T>;
    getModuleScope(ModuleClass: TModuleClass): Scope | null;
    registerDependency(ModuleClass: TModuleClass): void;
    isRegistered(ModuleClass: TModuleClass): boolean;
    hasInstance(ModuleClass: TModuleClass): boolean;
    getInstance<T extends TModuleClass>(ModuleClass: T): InstanceType<T> | null;
    instantiate<TServiceClass extends new (...args: any) => any>(ModuleClass: TServiceClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass>;
    removeInstance<TServiceClass extends new (...args: any) => any>(ModuleClass: TServiceClass): void;
    onInstantiate: Subject<{
        instance: ReduxModule;
        moduleName: string;
        ModuleClass: typeof ReduxModule;
    }>;
    destroy(): void;
}
export declare class ReduxModule {
    dependencies: TModuleConstructorMap;
    protected deps: TInstances<this['dependencies']>;
    scope: Scope;
    createModule<TModuleClass extends new (...args: any) => any>(ModuleClass: TModuleClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TModuleClass>;
}
export declare class Service extends ReduxModule {
}
export declare type TModuleClass = new (...args: any) => any;
