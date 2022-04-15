import { StateView } from '../StateView';
import { InjectedProp } from '../../scope';
export declare type TFormBindings<TState, TExtraProps = {}> = {
    [K in keyof TState]: {
        name: K;
        value: TState[K];
        onChange: (newVal: TState[K]) => unknown;
    };
} & TExtraProps;
export declare function createFormBinding<TState, TExtraProps = {}>(stateGetter: () => TState, stateSetter: (statePatch: Partial<TState>) => unknown, extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps): StateView<TFormBindings<TState, TExtraProps>>;
export declare const FormInjectorType: unique symbol;
export declare function injectForm<TState, TExtraProps = {}>(stateGetter: () => TState, stateSetter: (statePatch: Partial<TState>) => unknown, extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps): InjectedProp<StateView<TFormBindings<TState, TExtraProps>>, StateView<TFormBindings<TState, TExtraProps>>, null>;
