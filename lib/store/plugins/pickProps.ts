import { GetProps, StateView } from '../StateView';
import { traverse } from '../../utils/traverse';

export type PickModuleProps<TView, TModule> = StateView<GetProps<TView> & TModule>

export function pickProps<TModule, TProps>(module: TModule): (props: TProps, view: StateView<TProps>) => StateView<TProps & TModule> {

  return function (props, view) {

    traverse(module as any as object, (propName, descr) => {
      const isGetter = !!descr.get;
      const isFunction = !isGetter && typeof descr.value === 'function';
      const getValue = isFunction ? () => descr.value.bind(module) : () => (module as any)[propName];

      view.defineProp({
        type: 'ModuleProp',
        reactive: isGetter,
        name: propName,
        getValue,
      });
    });

    return view as any;
  };
}
