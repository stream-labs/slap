import { InjectedProp, Injector } from '../../scope';
import { Store, TStateConfigCreator, TStateControllerFor, TStateViewForStateConfig } from '../Store';
import { StateView } from '../StateView';
export declare const StateInjectorType: unique symbol;
export declare function injectState<TConfigCreator extends TStateConfigCreator, TValue = TStateControllerFor<TConfigCreator>, TViewValue = StateView<TStateViewForStateConfig<TConfigCreator>>>(configCreator: TConfigCreator, allowMutationDecorators?: boolean, onCreate?: (statefulModule: StatefulModule<TConfigCreator>) => unknown): InjectedProp<TValue, TViewValue, TViewValue>;
export declare class StatefulModule<TStateConfig> {
    stateConfig: TStateConfig;
    allowMutationDecorators: boolean;
    onCreate?: ((module: StatefulModule<TStateConfig>) => unknown) | undefined;
    store: import("../../scope").GetInjectedProp<{
        type: symbol;
        getValue: () => Store;
    }, Store, unknown, unknown>;
    provider: import("../../scope").GetInjectedProp<{
        type: symbol;
        getValue: () => import("../../scope").Provider<any, []>;
    }, import("../../scope").Provider<any, []>, unknown, unknown>;
    stateController: TStateControllerFor<TStateConfig>;
    stateView: StateView<TStateViewForStateConfig<TStateConfig>>;
    constructor(stateConfig: TStateConfig, allowMutationDecorators?: boolean, onCreate?: ((module: StatefulModule<TStateConfig>) => unknown) | undefined);
    get injector(): Injector<any, any, any>;
    get moduleName(): string;
    load(): void;
    onDestroy(): void;
    exportInjectorValue(): TStateControllerFor<TStateConfig, import("../Store").TDraftConfigFor<TStateConfig>, import("../Store").PickDefaultState<import("../Store").TDraftConfigFor<TStateConfig>>>;
    exportComponentData(): {
        self: StateView<TStateViewForStateConfig<TStateConfig>>;
        extra: StateView<TStateViewForStateConfig<TStateConfig>>;
    };
}
/**
 * A decorator that registers the object method as an mutation
 */
export declare function mutation(): (target: any, methodName: string) => void;
