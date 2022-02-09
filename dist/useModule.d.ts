import React from 'react';
import { TPromisifyFunctions } from './store';
import { TMerge, TMerge3 } from './merge';
export declare const StoreContext: React.Context<string>;
export declare function useModuleManager(): import("./scope").Scope;
export declare type TModuleView<TModule extends Object, TState = TModule extends {
    state?: any;
} ? TModule['state'] : null> = TMerge<TState, TModule>;
export declare function createModuleView<TModule>(module: TModule): TModuleView<TModule>;
export declare function useSelectFrom<TModuleView extends Object, TExtendedView, TReturnType = TMerge<TModuleView, TExtendedView>>(module: TModuleView, extend?: (module: TModuleView) => TExtendedView): TReturnType;
export declare function useModule<TModule, TSelectorResult, TResult extends TMerge<TModuleView<TModule>, TSelectorResult>>(ModuleClass: new (...args: any[]) => TModule, selectorFn?: (view: TModuleView<TModule>) => TSelectorResult, isService?: boolean): TResult;
export declare function useService<TModule, TSelectorResult, TResult extends TMerge<TModuleView<TModule>, TSelectorResult>>(ModuleClass: new (...args: any[]) => TModule, selectorFn?: (view: TModuleView<TModule>) => TSelectorResult): TResult;
export declare function useServiceView<TService, TSelectorResult, TResult extends TMerge<TServiceView<TService>, TSelectorResult>>(ModuleClass: new (...args: any[]) => TService, selectorFn?: (view: TServiceView<TService>) => TSelectorResult): TResult;
export declare function createServiceView<TService>(service: TService): Omit<(TService extends {
    state?: any;
} ? TService["state"] : null) extends (...args: any[]) => infer R1 ? R1 : TService extends {
    state?: any;
} ? TService["state"] : null, keyof (TService extends (...args: any[]) => infer R2 ? R2 : TService)> & (TService extends (...args: any[]) => infer R2 ? R2 : TService);
export declare type TServiceView<TService extends Object, TState = TService extends {
    state?: any;
} ? TService['state'] : {}, TView = TService extends {
    view?: any;
} ? TService['view'] : {}, TActions = TPromisifyFunctions<TService>> = TMerge3<TState, TActions, TView>;
