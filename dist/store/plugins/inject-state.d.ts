import { InjectableModule, InjectedProp } from '../../scope';
import { Store, TStateConfigCreator, GetStateControllerFor, TStateFor, TStateViewForStateConfig } from '../Store';
import { StateView } from '../StateView';
import { GetInjectedFormBinding, TFormBindings } from './inject-form';
/**
 * Injects a reactive stateful module
 * Stateful modules helps to keep UI updated with the state
 * @param configCreator state config. Can be Object or Class
 * @param allowMutationDecorators  methods marked with the @mutation() in the parent module will be registered as mutations
 * @param onCreate callback that should be called when state is registered in the state manager
 */
export declare function injectState<TConfigCreator extends TStateConfigCreator, TValue = GetStateControllerFor<TConfigCreator>, TViewValue = GetStateViewFor<TConfigCreator>>(configCreator: TConfigCreator, allowMutationDecorators?: boolean, onCreate?: (statefulModule: StatefulModule<TConfigCreator>) => unknown): InjectedProp<TValue, TViewValue, TViewValue>;
export declare class StatefulModule<TStateConfig> implements InjectableModule {
    stateConfig: TStateConfig;
    allowMutationDecorators: boolean;
    onCreate?: ((module: StatefulModule<TStateConfig>) => unknown) | undefined;
    store: InjectedProp<Store, import("./createModuleView").GetModuleStateView<typeof Store>, {}>;
    provider: import("../../scope").Provider<any, []>;
    stateController: GetStateControllerFor<TStateConfig>;
    stateView: GetStateViewFor<TStateConfig>;
    formBinding: GetInjectedFormBinding<TStateFor<TStateConfig>>;
    constructor(stateConfig: TStateConfig, allowMutationDecorators?: boolean, onCreate?: ((module: StatefulModule<TStateConfig>) => unknown) | undefined);
    init(): void;
    get moduleName(): string;
    destroy(): void;
    exportInjectorValue(): GetStateControllerFor<TStateConfig, import("../Store").TDraftConfigFor<TStateConfig>, import("../Store").PickDefaultState<import("../Store").TDraftConfigFor<TStateConfig>>>;
    exportSelectorValue(): GetStateViewFor<TStateConfig>;
    exportSelectorExtraValues(): GetStateViewFor<TStateConfig>;
}
/**
 * A decorator that registers the object method as an mutation
 */
export declare function mutation(): (target: any, methodName: string) => void;
export declare type GetStateViewFor<TStateConfig> = StateView<TStateViewForStateConfig<TStateConfig> & {
    bind: TFormBindings<TStateFor<TStateConfig>>;
}>;
