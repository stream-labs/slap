import { GetProps, StateView } from '../StateView';
import { traverse } from '../../utils/traverse';

export function pickStateViews<
  TView extends StateView<any>,
  TModule
  >(module: TModule): (props: GetProps<TView>, view: TView) => PickStateViews<TView, TModule> {

  return function (props, view) {

    const anyModule = module as any;

    traverse(module as any, (propName) => {
      const stateView: StateView<any> = anyModule[propName];
      if (!(anyModule[propName] instanceof StateView)) return;

      view.defineProp({
        type: 'StateView',
        name: propName,
        reactive: true,
        stateView,
        getValue: () => stateView.proxy,
      });
    });

    return view;
  };
}


export type GetStateViewName<TModule, TProp extends keyof TModule> = TModule[TProp] extends StateView<any> ? TProp : never;
export type PickStateViews<TView, TModule> = StateView<GetProps<TView> & GetStateViewProps<TModule>>;
export type GetStateViewProps<TModule> = {[K in keyof TModule as GetStateViewName<TModule, K>]: TModule[K] extends StateView<any> ? TModule[K]['props'] : never }
