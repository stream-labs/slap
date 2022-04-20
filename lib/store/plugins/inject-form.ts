import { StateView } from '../StateView';
import { createInjector, InjectedProp } from '../../scope';
import { Store } from '../Store';
import { injectChild } from './inject-child';

export type TFormBindings<TState, TExtraProps = {}> = {
  [K in keyof TState]: {
    name: K;
    value: TState[K];
    onChange: (newVal: TState[K]) => unknown;
  };
} & TExtraProps

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
    type: 'FormStateRev',
    name: 'getRev',
    getValue: () => (getState()),
  });

  stateView.defineWildcardProp(propName => {
    stateView.defineProp({
      type: 'FormInputBinding',
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

// TODO fix styles
export class FormBindingModule {

  formBinding: any;

  constructor(stateGetter: any, stateSetter: any, extraPropsGenerator: any) {
    this.formBinding = createFormBinding(stateGetter, stateSetter, extraPropsGenerator);
  }

  exportComponentData() {
    return {
      self: this.formBinding,
      extra: null,
    };
  }

}

export function injectFormBinding<TState, TExtraProps = {}>(
  stateGetter: TState | (() => TState),
  stateSetter: (statePatch: Partial<TState>) => unknown,
  extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps,
): InjectedProp< StateView<TFormBindings<TState, TExtraProps>>, StateView<TFormBindings<TState, TExtraProps>>, null> {
  return injectChild(FormBindingModule, stateGetter, stateSetter, extraPropsGenerator) as any;
}
