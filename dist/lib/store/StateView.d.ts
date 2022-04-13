import { Dict, Scope, TModuleInstanceFor } from '../scope';
import { GetAllInjectedProps, GetInjectedProps } from './plugins';
export declare class StateView<TProps = {}> {
    scope?: Scope | undefined;
    props: TProps;
    proxy: TProps;
    descriptors: TGetDescriptorsForProps<TProps>;
    selectedDescriptors: TGetDescriptorsForProps<TProps>;
    hasReactiveProps: boolean;
    hasSelectedProps: boolean;
    hasWildcardProps: boolean;
    wildcardPropCreator: ((propName: string) => unknown) | null;
    constructor(scope?: Scope | undefined);
    defineProp<TValue>(descriptorParams: TConstructDescriptorProps<TValue>): void;
    defineWildcardProp(cb: StateView['wildcardPropCreator']): void;
    private selectValue;
    getSnapshot(): TProps;
    get selectedProps(): TProps;
    getAnalytics(): void;
    /**
     * // Extend with a factory returning a new ModuleView
     *
     * module.extend((props, view) => {
     *   const module = scope.resolve(MyModule)
     *   return new ModuleView(module)
     * })
     */
    select<TNewView extends StateView<any>>(newViewFactory: (props: TProps, view: StateView<TProps>) => TNewView): TNewView;
    clone(): StateView<TProps>;
    mergeView<TExtension extends StateView<any>, TResult = ExtendView<TProps, TExtension>>(extension: TExtension): TResult;
}
export declare function createStateViewForModule<T>(module: T): GetModuleStateView<T>;
export declare type GetModuleSelfView<TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>> = TModule extends {
    exportComponentData: () => ({
        self: StateView<infer TView>;
    });
} ? TView : {};
export declare type GetModuleExtraView<TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>> = TModule extends {
    exportComponentData: () => ({
        extra: StateView<infer TView>;
    });
} ? TView : {};
export declare type GetComponentDataForModule<TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>, TSelfExport = GetModuleSelfView<TModuleConfig>, TExtraExport = GetModuleExtraView<TModuleConfig>, TInjectedProps = TModule extends {
    exportComponentData: () => any;
} ? {} : GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>> = TSelfExport & TExtraExport & TInjectedProps;
export declare type GetModuleStateView<TModuleConfig> = StateView<GetComponentDataForModule<TModuleConfig>>;
export declare type ExtendView<TBaseProps, TExtendedModule> = StateView<TBaseProps & GetComponentDataForModule<TExtendedModule>>;
export declare type TModulePropDescriptor<TValue> = {
    type: string;
    name: string;
    reactive: boolean;
    stateView: StateView | null;
    getValue(): TValue;
    getRev(): unknown;
    enumerable: boolean;
    configurable: boolean;
    dynamic: boolean;
};
export declare type TConstructDescriptorProps<TValue, TDescriptor = TModulePropDescriptor<TValue>> = Partial<TDescriptor> & Required<Pick<TModulePropDescriptor<TValue>, 'type' | 'name' | 'getValue'>>;
export declare type TGetDescriptorsForProps<TProps extends Dict<any>> = {
    [P in keyof TProps]: TModulePropDescriptor<TProps[P]>;
};
export declare type GetProps<TModuleView> = TModuleView extends StateView<infer TProps> ? TProps : never;
