import { Subject } from 'rxjs';
import { TInstances, TModuleConstructorMap } from './store';
export declare class Scope {
    dependencies: TModuleConstructorMap;
    readonly parentScope: Scope | null;
    id: string;
    constructor(dependencies?: TModuleConstructorMap, parentScope?: Scope | null, id?: string);
    childScopes: Record<string, Scope>;
    instances: TInstances<this["dependencies"]>;
    resolve<T extends TModuleClass>(ModuleClass: T): InstanceType<T>;
    getScope(ModuleClass: TModuleClass): Scope | null;
    register(ModuleClass: TModuleClass): void;
    registerMany(dependencies: TModuleConstructorMap): void;
    unregister(ModuleClass: TModuleClass): void;
    isRegistered(ModuleClass: TModuleClass): boolean;
    hasInstance(ModuleClass: TModuleClass): boolean;
    initRegisteredModule<TServiceClass extends new (...args: any) => any>(ModuleClass: TServiceClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass>;
    createModule<TServiceClass extends new (...args: any) => any>(ModuleClass: TServiceClass, ...args: ConstructorParameters<TModuleClass>): InstanceType<TServiceClass>;
    exec(cb: Function): any;
    createScope(dependencies?: TModuleConstructorMap, id?: string): Scope;
    registerScope(dependencies?: TModuleConstructorMap, id?: string): Scope;
    unregisterScope(id: string): void;
    destroy(): void;
    afterInit: Subject<{
        instance: any;
        moduleName: string;
        ModuleClass: any;
        scopeId: string;
    }>;
    afterRegister: Subject<{
        ModuleClass: any;
        moduleName: string;
        scopeId: string;
    }>;
    removeInstance<TServiceClass extends new (...args: any) => any>(ModuleClass: TServiceClass): void;
}
export declare type TModuleClass = new (...args: any) => any;
export declare function inject<T extends TModuleConstructorMap>(dependencies: T): TInstances<T>;
export declare function injectState<TModuleClass extends new (...args: any) => any>(StatefulModule: TModuleClass): InstanceType<TModuleClass>['state'];
export declare function injectScope(): Scope;
