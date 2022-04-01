import { TStateConfigCreator, TStateControllerFor } from './Store';
export declare const StateInjectorType: unique symbol;
export declare function injectState<TConfigCreator extends TStateConfigCreator>(configCreator: TConfigCreator): TStateControllerFor<TConfigCreator>;
