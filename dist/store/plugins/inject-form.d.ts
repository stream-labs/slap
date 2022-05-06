import { StateView } from '../StateView';
import { InjectableModule, InjectedProp } from '../../scope';
export declare type TFormBindings<TState, TExtraProps = {}> = {
    [K in keyof TState]: {
        name: K;
        value: TState[K];
        onChange: (newVal: TState[K]) => unknown;
    };
} & TExtraProps;
export declare function createFormBinding<TState, TExtraProps = {}>(stateGetter: TState | (() => TState), stateSetter: (statePatch: Partial<TState>) => unknown, extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps): StateView<TFormBindings<TState, TExtraProps>>;
export declare class FormBindingModule implements InjectableModule {
    formBinding: any;
    constructor(stateGetter: any, stateSetter: any, extraPropsGenerator: any);
    exportSelectorValue(): any;
}
export declare function injectFormBinding<TState, TExtraProps = {}>(stateGetter: TState | (() => TState), stateSetter: (statePatch: Partial<TState>) => unknown, extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps): GetInjectedFormBinding<TState, TExtraProps>;
export declare type GetInjectedFormBinding<TState, TExtraProps = {}> = InjectedProp<FormBindingModule, StateView<TFormBindings<TState, TExtraProps>>, null>;
