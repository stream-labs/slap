import { TModuleView } from './useModule';
import { TMerge } from './merge';
export declare function useProvider<TModule>(ModuleClass: new (...args: any[]) => TModule, createView: (module: TModule) => any): import("./module-manager").IModuleMetadata;
export declare function useNonReactiveModule<TModule, TSelectorResult, TResult extends TMerge<TModuleView<TModule>, TSelectorResult>>(ModuleClass: new (...args: any[]) => TModule, selectorFn?: (view: TModuleView<TModule>) => TSelectorResult): TResult;
