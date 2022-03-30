import { GetProps, StateView } from './state-view';
import { traverse } from '../../traverse';
import { ModuleStateController } from '../../store';


export type PickState<TView, TModule> = StateView<GetProps<TView> & GetModuleState<TModule>>
export type GetModuleState<TModule> = TModule extends { state: infer TState } ? TState : {}



export function pickState<TView extends StateView<any>, TModule>(module: TModule): (props: GetProps<TView>, view: TView) => PickState<TView, TModule> {

  return function (props, view) {
    const stateController = (module as any).state; // TODO allow picking multiple states?
    if (!(stateController instanceof ModuleStateController)) return view;
    const metadata = stateController.metadata;
    const controller = stateController as any;

    traverse(stateController, stateKey => {

      if (stateKey in metadata.mutations) {
        view.defineProp({
          type: 'StateMutation',
          name: stateKey,
          getValue: () => controller[stateKey],
        });
        return;
      }

      if (stateKey in stateController.state) {
        view.defineProp({
          type: 'StateProp',
          name: stateKey,
          reactive: true,
          getValue: () => controller[stateKey],
        });
        return;
      }

      view.defineProp({
        type: 'StateGetter',
        name: stateKey,
        reactive: true,
        getValue: () => controller[stateKey],
      });

    });

    return view;
  }
}
