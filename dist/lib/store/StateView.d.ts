import { Dict, Scope, TModuleInstanceFor } from '../scope';
import { Store } from './Store';
import { GetAllInjectedProps, GetInjectedProps } from './plugins/pickInjectors';
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
    extend<TNewProps>(newPropsFactory: (props: TProps, view: StateView<TProps>) => TNewProps, name: string): ExtendView<TProps, TNewProps>;
    clone(): StateView<TProps>;
    mergeView<TExtension extends StateView<any>, TResult = ExtendView<TProps, TExtension>>(extension: TExtension): TResult;
    components: Dict<ComponentView<any>>;
    registerComponent<TView extends StateView<TProps>>(store: Store, componentId: string, forceUpdate: Function): ComponentView<TView>;
    destroyComponent(componentId: string): void;
}
export declare function createStateViewForModule<T>(module: T): StateView<GetModuleView<T, TModuleInstanceFor<T>>>;
export declare type GetModuleView<TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>> = GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>;
export declare type GetModuleStateView<TModuleConfig> = StateView<GetModuleView<TModuleConfig>>;
export declare type ExtendView<TBaseProps, TExtendedModule> = StateView<TBaseProps & GetModuleView<TExtendedModule>>;
export declare class ComponentView<TStateView extends StateView<any>> {
    store: Store;
    stateView: TStateView;
    id: string;
    forceUpdate: Function;
    isDestroyed: boolean;
    isMounted: boolean;
    isInvalidated: boolean;
    lastSnapshot: {
        affectedModules: Dict<number>;
        props: unknown;
    };
    constructor(store: Store, stateView: TStateView, id: string, forceUpdate: Function);
    makeSnapshot(): {
        affectedModules: {};
        props: null;
    };
    needUpdate(): boolean;
    mount(): void;
    setInvalidated(invalidated: boolean): void;
    destroy(): void;
}
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
