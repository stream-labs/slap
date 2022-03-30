import { GetProps, StateView } from './state-view';
import { traverse } from '../../traverse';

export function pickControllers<
  TView extends StateView<any>,
  TModule
  >(module: TModule): (props: GetProps<TView>, view: TView) => PickControllers<TView, TModule> {

  return function (props, view) {

    traverse(module as any, (propName, descr) => {
      if (!propName.endsWith('Controller')) return;
      const shortName = propName.split('Controller')[0];

      view.defineProp({
        type: 'Controller',
        name: shortName,
        getValue: () => (module as any)[propName],
      });
    });

    return view as any;
  };
}

export type PickControllers<TView, TModule> = StateView<GetProps<TView> & GetControllerProps<TModule>>;
export type GetControllerName<TStr> = TStr extends `${infer TName}Controller` ? TName : never;
export type GetControllerProps<T> = {[K in keyof T as GetControllerName<K>]: T[K] }
