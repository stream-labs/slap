import { GetModule, GetProps, StateView } from './state-view';
import { getDescriptors, traverse } from '../../traverse';
import { forEach } from '../../scope';

export type PickModuleProps<TView> = StateView<GetModule<TView>, GetProps<TView>>

export function pickProps<
  TModule,
  TProps,
  >(props: TProps, view: StateView<TModule, TProps>): PickModuleProps<StateView<TModule, TProps>> {



  const viewObject = view.module as any as object;

  traverse(viewObject, (propName, descr) => {
    const isGetter = !!descr.get;
    const isFunction = !isGetter && typeof descr.value === 'function';
    const getValue = isFunction ? () => descr.value.bind(view.module) : () => (view.module as any)[propName];

    view.stateSelector.defineProp({
      type: 'ModuleProp',
      reactive: isGetter,
      name: propName,
      getValue,
    });
  });

  return view as any as PickModuleProps<StateView<TModule, TProps>>;
}
