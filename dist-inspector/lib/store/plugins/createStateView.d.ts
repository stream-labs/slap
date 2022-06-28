import { StateView } from '../StateView';
import { StateController } from '../Store';
/**
 * Create a StateView object for a StateController
 * The StateView object provides data that could be selected in components.
 * These data could be reactive, non-reactive and includes mutations and functions
 */
export declare function createStateView(controller: StateController): StateView<{}>;
