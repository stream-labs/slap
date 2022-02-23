import React from 'react';
import { TMerge, TMerge3 } from './merge';
import { Scope } from './scope';
export declare const AppScope: React.Context<Scope | null>;
export declare function useScope(): Scope;
export declare type TModuleView<TModule extends Object, TState = TModule extends {
    state?: any;
} ? TModule['state'] : null, TView = TModule extends {
    createView: () => any;
} ? ReturnType<TModule['createView']> : null> = TMerge3<TState, TModule, TView>;
export declare function createModuleView<TModule>(module: TModule): TModuleView<TModule>;
export declare function useSelectFrom<TModuleView extends Object, TExtendedView, TReturnType = TMerge<TModuleView, TExtendedView>>(module: TModuleView, extend?: (module: TModuleView) => TExtendedView): TReturnType;
export declare function useModule<TModule, TSelectorResult, TResult extends TMerge<TModuleView<TModule>, TSelectorResult>>(ModuleClass: new (...args: any[]) => TModule, selectorFn?: (view: TModuleView<TModule>) => TSelectorResult): TResult;
