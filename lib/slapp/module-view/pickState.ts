import { ModuleViewBuilder } from './module-view-builder';
import { traverseClassInstance } from '../../traverseClassInstance';
import { defineGetter } from '../../scope';

export function pickState<
  TModule,
  TView,
  TState = TModule extends { state?: any } ? TModule['state'] : {}

>(builder: ModuleViewBuilder<TModule, TView>) {

  const module = builder.module as any;
  const view = builder.view as any;

  if (module.state) {
    defineGetter(view, 'state', () => module.state);
    traverseClassInstance(module.state, stateKey => {
      view.moduleSchema[stateKey] = 'state';
      defineGetter(view, stateKey, () => module.state[stateKey]);
    });
  }

  return view as TView & TState;
}
