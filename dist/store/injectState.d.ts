import { TStateConfigCreator, TStateControllerFor } from './store';
export declare const StateInjectorType: unique symbol;
export declare function injectState<TConfigCreator extends TStateConfigCreator>(configCreator: TConfigCreator): TStateControllerFor<TConfigCreator>;
