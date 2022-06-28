import { StateView } from '../StateView';
import { InjectableModule, InjectedProp } from '../../scope';
/**
 * Injects an stateful module that helps to link a reactive data with form input components
 */
export declare function injectFormBinding<TState, TExtraProps = {}>(stateGetter: TState | (() => TState), stateSetter: (statePatch: Partial<TState>) => unknown, extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps): GetInjectedFormBinding<TState, TExtraProps>;
/**
 * Creates a StateView for a component that helps to link a reactive data with form input components
 */
export declare function createFormBinding<TState, TExtraProps = {}>(stateGetter: TState | (() => TState), stateSetter: (statePatch: Partial<TState>) => unknown, extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps): StateView<TFormBindings<TState, TExtraProps>>;
export declare class FormBindingModule implements InjectableModule {
    formBinding: any;
    constructor(stateGetter: any, stateSetter: any, extraPropsGenerator: any);
    exportSelectorValue(): any;
}
export declare type TFormBindings<TState, TExtraProps = {}> = {
    [K in keyof TState]: {
        name: K;
        value: TState[K];
        onChange: (newVal: TState[K]) => unknown;
    };
} & TExtraProps;
export declare type GetInjectedFormBinding<TState, TExtraProps = {}> = InjectedProp<FormBindingModule, StateView<TFormBindings<TState, TExtraProps>>, null>;
