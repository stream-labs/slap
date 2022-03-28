import { GetModule, GetProps, StateView } from './state-view';
import { traverse } from '../../traverse';

export function pickControllers<TModule, TProps>(props: TProps, view: StateView<TModule, TProps>): PickControllers<StateView<TModule, TProps>> {

  const viewObject = view.module as any as object;

  traverse(viewObject, (propName, descr) => {
    if (!propName.endsWith('Controller')) return;
    const shortName = propName.split('Controller')[0];

    view.stateSelector.defineProp({
      type: 'Controller',
      name: shortName,
      getValue: () => (view.module as any)[propName],
    });
  });

  return view as any;
}

export type PickControllers<TModuleView> = StateView<GetModule<TModuleView>, GetProps<TModuleView> & GetControllerProps<GetModule<TModuleView>>>;
export type GetControllerName<TStr> = TStr extends `${infer TName}Controller` ? TName : never;
export type GetControllerProps<T> = {[K in keyof T as GetControllerName<K>]: T[K] }
