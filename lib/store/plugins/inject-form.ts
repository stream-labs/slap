import { StateView } from '../StateView';
import { InjectableModule, InjectedProp } from '../../scope';
import { injectChild } from './inject-child';

/**
 * Injects an stateful module that helps to link a reactive data with form input components
 */
export function injectFormBinding<TState, TExtraProps = {}>(
  stateGetter: TState | (() => TState),
  stateSetter: (statePatch: Partial<TState>) => unknown,
  extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps,
): GetInjectedFormBinding<TState, TExtraProps> {
  return injectChild(FormBindingModule, stateGetter, stateSetter, extraPropsGenerator) as any;
}

/**
 * Creates a StateView for a component that helps to link a reactive data with form input components
 */
export function createFormBinding<TState, TExtraProps = {}>(
  stateGetter: TState | (() => TState),
  stateSetter: (statePatch: Partial<TState>) => unknown,
  extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps,
): StateView<TFormBindings<TState, TExtraProps>> {

  function getState(): TState {
    if (typeof stateGetter === 'function') return (stateGetter as Function)();
    return stateGetter;
  }

  const stateView = new StateView<TFormBindings<TState, TExtraProps>>();

  stateView.defineProp({
    description: 'FormStateRev',
    name: 'getRev',
    getValue: () => ({ ...getState() }),
  });

  stateView.defineWildcardProp(propName => {
    stateView.defineProp({
      description: 'FormInputBinding',
      name: propName,
      reactive: true,
      getValue: () => ({
        name: propName,
        value: (getState() as any)[propName],
        onChange: (newVal: unknown) => {
          (stateSetter as any)({ [propName]: newVal });
        },
        ...(extraPropsGenerator ? extraPropsGenerator(propName as keyof TState) : {}),
      }),
    });
  });

  return stateView;
}

// TODO fix types
export class FormBindingModule implements InjectableModule {

  formBinding: any;

  constructor(stateGetter: any, stateSetter: any, extraPropsGenerator: any) {
    this.formBinding = createFormBinding(stateGetter, stateSetter, extraPropsGenerator);
  }

  exportSelectorValue() {
    return this.formBinding;
  }

}


export type TFormBindings<TState, TExtraProps = {}> = {
  [K in keyof TState]: {
    name: K;
    value: TState[K];
    onChange: (newVal: TState[K]) => unknown;
  };
} & TExtraProps


export type GetInjectedFormBinding<TState, TExtraProps = {}> = InjectedProp<FormBindingModule, StateView<TFormBindings<TState, TExtraProps>>, null>
