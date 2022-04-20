import { InjectedProp } from '../../scope';
import { Store, TStateConfigCreator, TStateControllerFor, TStateViewForStateConfig } from '../Store';
import { StateView } from '../StateView';
export declare const StateInjectorType: unique symbol;
export declare function injectState<TConfigCreator extends TStateConfigCreator, TValue = TStateControllerFor<TConfigCreator>, TViewValue = StateView<TStateViewForStateConfig<TConfigCreator>>>(configCreator: TConfigCreator, allowMutationDecorators?: boolean, onCreate?: (statefulModule: StatefulModule<TConfigCreator>) => unknown): InjectedProp<TValue, TViewValue, TViewValue>;
export declare class StatefulModule<TStateConfig> {
    stateConfig: TStateConfig;
    allowMutationDecorators: boolean;
    onCreate?: ((module: StatefulModule<TStateConfig>) => unknown) | undefined;
    store: Store;
    provider: import("../../scope").Provider<any, []>;
    stateController: TStateControllerFor<TStateConfig>;
    stateView: StateView<TStateViewForStateConfig<TStateConfig>>;
    constructor(stateConfig: TStateConfig, allowMutationDecorators?: boolean, onCreate?: ((module: StatefulModule<TStateConfig>) => unknown) | undefined);
    init(): void;
    get moduleName(): string;
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
