export declare function useProvider<TModule>(ModuleClass: new (...args: any[]) => TModule, createView: (module: TModule) => any): import("./module-manager").IModuleMetadata;
export declare function useNonReactiveModule<TModule>(ModuleClass: new (...args: any[]) => TModule, createView: (module: TModule) => any): any;
