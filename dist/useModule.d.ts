import { IReduxModule } from './store';
/**
 * Get the Redux module instance from the current React context
 * Creates a new module instance if no instances exist
 */
export declare function useModule<TState, TModuleClass extends new (...args: any[]) => IReduxModule<unknown, TState>>(ModuleClass: TModuleClass): InstanceType<TModuleClass> & InstanceType<TModuleClass>["state"] & {
    module: InstanceType<TModuleClass>;
};
/**
 * Create a Redux module instance with given params
 */
export declare function useModuleContextRoot<TInitParams, TState, TModuleClass extends new (...args: any[]) => IReduxModule<TInitParams, TState>>(ModuleClass: TModuleClass, initParams?: TInitParams, moduleName?: string, contextId?: string): InstanceType<TModuleClass> & {
    select: () => InstanceType<TModuleClass> & InstanceType<TModuleClass>["state"] & {
        module: InstanceType<TModuleClass>;
    };
    selectExtra: <TComputedProps>(fn: (module: InstanceType<TModuleClass>) => TComputedProps) => InstanceType<TModuleClass> & TComputedProps & {
        module: InstanceType<TModuleClass>;
    };
};
/**
 * Create a Redux module instance with given params
 */
export declare function useModuleRoot<TInitParams, TState, TModuleClass extends new (...args: any[]) => IReduxModule<TInitParams, TState>>(ModuleClass: TModuleClass, initParams?: TInitParams, moduleName?: string): InstanceType<TModuleClass> & InstanceType<TModuleClass>["state"] & {
    module: InstanceType<TModuleClass>;
};
/**
 * same as useModule but locates a module by name instead of a class
 */
export declare function useModuleContextByName<TModule extends IReduxModule<any, any>>(moduleName: string, contextId: string): TUseModuleReturnType<TModule>;
/**
 * same as useModule but locates a module by name instead of a class
 */
export declare function useModuleByName(moduleName: string, contextId: string): any;
export declare function useService<TState, TModuleClass extends new (...args: any[]) => IReduxModule<unknown, TState>>(ModuleClass: TModuleClass): InstanceType<TModuleClass> & InstanceType<TModuleClass>["state"] & {
    module: InstanceType<TModuleClass>;
};
declare type TUseModuleReturnType<TModule extends IReduxModule<any, any>> = TModule & {
    select: () => TModule & TModule['state'] & {
        module: TModule;
    };
};
export {};
