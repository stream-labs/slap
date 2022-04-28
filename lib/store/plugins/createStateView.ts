import { StateView } from '../StateView';
import { traverse } from '../../utils';
import { StateController } from '../Store';

export function createStateView(controller: StateController) {
  const config = controller.getMetadata().config;
  const view = new StateView();

  view.defineProp({
    description: 'StateRev',
    name: 'getRev',
    reactive: true,
    getValue: () => {
      // eslint-disable-next-line no-unused-expressions
      controller.state; // read as reactive
      return controller.getMetadata().rev;
    },
  });

  traverse(config.state, stateKey => {
    view.defineProp({
      description: 'StateProp',
      name: stateKey,
      reactive: true,
      getValue: () => (controller as any)[stateKey],
    });
  });

  traverse(config.mutations, stateKey => {
    view.defineProp({
      description: 'StateMutation',
      name: stateKey,
      reactive: false,
      getValue: () => (controller as any)[stateKey],
    });
  });

  traverse(config.getters, (propName) => {
    view.defineProp({
      description: 'StateGetter',
      name: propName,
      reactive: true,
      getValue: () => (controller as any)[propName],
    });
  });

  traverse(config.getterMethods, (propName) => {
    view.defineProp({
      description: 'StateGetterMethod',
      name: propName,
      reactive: false,
      getValue: () => (controller as any)[propName],
    });
  });

  return view;
}
