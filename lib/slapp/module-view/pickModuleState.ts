import { GetModule, GetProps, StateView } from './state-view';
import { traverse } from '../../traverse';
import { ModuleStateController } from '../../store';

// TODO this type doesnt work
// export type TPickStateFor<TView> =
//   TView extends ModuleView<infer TModule, infer TProps> ?
//     TModule extends { state: infer TState } ?
//       ModuleView<TModule, TProps & TState> :
//        ModuleView<TModule, TProps>
//   : never;

// TODO use alternative
export type PickModuleState<TView> = StateView<GetModule<TView>, GetProps<TView> & GetState<TView>>
export type GetModuleState<TModule> = TModule extends { state: infer TState } ? TState : {}



export function pickModuleState<
  TModule,
  TProps,
>(props: TProps, view: StateView<TModule, TProps>): PickState<StateView<TModule, TProps>> {

  const module = view.module;
  const extendedView = view.clone() as any as PickState<StateView<TModule, TProps>>;
  const stateController = (module as any).state; // TODO allow picking multiple states?
  if (!(stateController instanceof ModuleStateController)) return extendedView;
  const metadata = stateController.metadata;
  const controller = stateController as any;

  traverse(stateController, stateKey => {

    if (stateKey in metadata.mutations) {
      extendedView.stateSelector.defineProp({
        type: 'StateMutation',
        name: stateKey,
        getValue: () => controller[stateKey],
      });
      return;
    }

    if (stateKey in stateController.state) {
      extendedView.stateSelector.defineProp({
        type: 'StateProp',
        name: stateKey,
        reactive: true,
        getValue: () => controller[stateKey],
      });
      return;
    }

    extendedView.stateSelector.defineProp({
      type: 'StateGetter',
      name: stateKey,
      reactive: true,
      getValue: () => controller[stateKey],
    });

  });

  return extendedView;
}
