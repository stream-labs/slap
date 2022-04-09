import { InjectedProp, Injector } from '../scope/injector';
import { TStateConfigCreator, TStateControllerFor, TStateViewForStateConfig } from './Store';
import { StateView } from './StateView';
export declare const StateInjectorType: unique symbol;
export declare function injectState<TConfigCreator extends TStateConfigCreator, TValue = TStateControllerFor<TConfigCreator>, TViewValue = StateView<TStateViewForStateConfig<TConfigCreator>>>(configCreator: TConfigCreator, onCreate?: (stateController: TValue, injector: Injector<TValue, TViewValue>) => unknown): InjectedProp<TValue, TViewValue>;
