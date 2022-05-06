import { ExtendView } from '../store/StateView';
import { GetModuleStateView } from '../store';
import { ComponentView } from './react-store-adapter';
export declare function useComponentView<TModule, TResult = GetUseComponentViewResult<TModule>>(module: TModule): TResult;
export declare type GetUseComponentViewResult<TModuleInstance> = GetModuleStateView<TModuleInstance>['props'] & {
    componentView: ComponentView;
    extend: <TNewProps>(newPropsFactory: (props: GetModuleStateView<TModuleInstance>['props']) => TNewProps) => ExtendView<GetModuleStateView<TModuleInstance>['props'], TNewProps>['props'] & {
        componentView: ComponentView;
    };
};
