import { StateView } from '../StateView';
import { traverse } from '../../utils';
import { StateController } from '../Store';

/**
 * Create a StateView object for a StateController
 * The StateView object provides data that could be selected in components.
 * These data could be reactive, non-reactive and includes mutations and functions
 */
export function createStateView(controller: StateController) {
  const config = controller.getMetadata().config;
  const view = new StateView();

  // define state revision getter
  // state revisions helps to compare 2 snapshots from the same state source without expensive state traversing
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

  // define a "state" getter that links state to itself
  traverse(config.state, stateKey => {
    view.defineProp({
      description: 'StateProp',
      name: stateKey,
      reactive: true,
      getValue: () => (controller as any)[stateKey],
    });
  });

  // expose mutations for a component
  traverse(config.mutations, stateKey => {
    view.defineProp({
      description: 'StateMutation',
      name: stateKey,
      reactive: false,
      getValue: () => (controller as any)[stateKey],
    });
  });

  // expose state getters(computed values) for a component
  traverse(config.getters, (propName) => {
    view.defineProp({
      description: 'StateGetter',
      name: propName,
      reactive: true,
      getValue: () => (controller as any)[propName],
    });
  });

  // expose state getter methods
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
