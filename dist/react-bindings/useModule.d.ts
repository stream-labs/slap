import { GetModuleConstructorArgs, GetModuleInstanceFor, TModuleLocatorType } from '../scope';
import { GetModuleStateView, ExtendView } from '../store/StateView';
import { ComponentView } from './react-store-adapter';
export declare function useComponentView<TModule, TResult = GetUseComponentViewResult<TModule>>(module: TModule): TResult;
export declare function useModule<T extends TModuleLocatorType, TInitState extends boolean | GetModuleConstructorArgs<T>>(locator: T, initProps?: TInitState | null, moduleName?: string): GetUseComponentViewResult<GetModuleInstanceFor<T>>;
export declare type GetUseComponentViewResult<TModuleInstance> = GetModuleStateView<TModuleInstance>['props'] & {
    componentView: ComponentView;
    extend: <TNewProps>(newPropsFactory: (props: GetModuleStateView<TModuleInstance>['props']) => TNewProps) => ExtendView<GetModuleStateView<TModuleInstance>['props'], TNewProps>['props'] & {
        componentView: ComponentView;
    };
};
