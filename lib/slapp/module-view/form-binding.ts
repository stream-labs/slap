import { StateView } from './state-view';

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


  stateView.defineWildcardProp(propName => {
    stateView.defineProp({
      type: 'InputBinding',
      name: propName,
      reactive: true,
      getValue: () => ({
        name: propName,
        value: (stateGetter() as any)[propName],
        onChange: (newVal: unknown) => (stateSetter as any)({ [propName]: newVal }),
        ...(extraPropsGenerator ? extraPropsGenerator(propName as keyof TState) : {}),
      }),
    });
  });

  return stateView;
}
