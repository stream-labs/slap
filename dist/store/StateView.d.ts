import { Dict } from '../scope';
import { GetComponentDataForModule } from './plugins/createModuleView';
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
    defineProp<TValue>(descriptorParams: TConstructDescriptorProps<TValue>): void;
    defineWildcardProp(cb: StateView['wildcardPropCreator']): void;
    private selectValue;
    getSnapshot(): TProps;
    select<TNewView extends StateView<any>>(newViewFactory: (props: TProps, view: StateView<TProps>) => TNewView): TNewView;
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
