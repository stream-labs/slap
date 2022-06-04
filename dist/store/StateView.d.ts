import { Dict } from '../scope';
import { GetComponentDataForModule } from './plugins/createModuleView';
/**
 * Components use StateView to select reactive state and methods from modules
 * StateView keeps information for components about reactive and non-reactive data
 * It saves data snapshots for components and allow to compare them to detect changes
 */
export declare class StateView<TProps = {}> {
    props: TProps;
    proxy: TProps;
    descriptors: TGetDescriptorsForProps<TProps>;
    selectedDescriptors: TGetDescriptorsForProps<TProps>;
    hasReactiveProps: boolean;
    hasSelectedProps: boolean;
    hasWildcardProps: boolean;
    wildcardPropCreator: ((propName: string) => unknown) | null;
    constructor();
    /**
     * Register a new property in the StateView instance
     */
    defineProp<TValue>(descriptorParams: TConstructDescriptorProps<TValue>): void;
    /**
     * Defile a wildcard property
     * The wildcard property could be accessible without registration with `defineProp` method
     */
    defineWildcardProp(cb: StateView['wildcardPropCreator']): void;
    private selectValue;
    /**
     * Create a snapshot with reactive data based on reactive props selected in a component
     */
    getSnapshot(): TProps;
    clone(): StateView<TProps>;
    mergeView<TExtension extends StateView<any>, TResult = ExtendView<TProps, TExtension>>(extension: TExtension): TResult;
}
export declare type ExtendView<TBaseProps, TExtendedModule> = StateView<TBaseProps & GetComponentDataForModule<TExtendedModule>>;
export declare type TModulePropDescriptor<TValue> = {
    name: string;
    reactive: boolean;
    description: string;
    stateView: StateView | null;
    getValue(): TValue;
    getRev(): unknown;
    enumerable: boolean;
    configurable: boolean;
    dynamic: boolean;
};
export declare type TConstructDescriptorProps<TValue, TDescriptor = TModulePropDescriptor<TValue>> = Partial<TDescriptor> & Required<Pick<TModulePropDescriptor<TValue>, 'name' | 'getValue'>>;
export declare type TGetDescriptorsForProps<TProps extends Dict<any>> = {
    [P in keyof TProps]: TModulePropDescriptor<TProps[P]>;
};
export declare type GetProps<TModuleView> = TModuleView extends StateView<infer TProps> ? TProps : never;
