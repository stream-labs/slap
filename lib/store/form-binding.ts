import { StateView } from './StateView';
import { createInjector } from '../scope';
import { Store } from './Store';

export type TFormBindings<TState, TExtraProps = {}> = {
  [K in keyof TState]: {
    name: K;
    value: TState[K];
    onChange: (newVal: TState[K]) => unknown;
  };
} & TExtraProps

export function createFormBinding<TState, TExtraProps = {}>(
  stateGetter: () => TState,
  stateSetter: (statePatch: Partial<TState>) => unknown,
  extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps,
): StateView<TFormBindings<TState, TExtraProps>> {

  const stateView = new StateView<TFormBindings<TState, TExtraProps>>();

  stateView.defineProp({
    type: 'FormStateRev',
    name: 'getRev',
    getValue: () => (stateGetter()),
  });

  stateView.defineWildcardProp(propName => {
    stateView.defineProp({
      type: 'FormInputBinding',
      name: propName,
      reactive: true,
      getValue: () => ({
        name: propName,
        value: (stateGetter() as any)[propName],
        onChange: (newVal: unknown) => {
          (stateSetter as any)({ [propName]: newVal });
        },
        ...(extraPropsGenerator ? extraPropsGenerator(propName as keyof TState) : {}),
      })
    });
  });

  return stateView;
}

export const FormInjectorType = Symbol('formInjector');

export function injectForm<TState, TExtraProps = {}>(
  stateGetter: () => TState,
  stateSetter: (statePatch: Partial<TState>) => unknown,
  extraPropsGenerator?: (fieldName: keyof TState) => TExtraProps,
): TFormBindings<TState, TExtraProps> {
  return createInjector(injector => {

    const binding = createFormBinding(stateGetter, stateSetter, extraPropsGenerator);

    return {
      type: FormInjectorType,
      getValue() {
        return binding;
      },
      getViewValue() {
        return binding;
      }
    };
  });
}
