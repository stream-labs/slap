import { Store, TStateConfig, TStateControllerFor } from '../store';
import { createInjector } from '../scope/injector';
import { Provider } from '../scope/provider';
import { EditorState } from '../../demo/stars-editor/services/editor.service';

export const StateInjectorType = Symbol('stateInjector');

// export function injectState<TConfig extends TStateConfig>(config: Omit<TConfig, 'name'>) {
//   return createInjector(injector => {
//     const state = createStateForModule(injector.provider, config);
//     return {
//       type: StateInjectorType,
//       getValue() {
//         return state;
//       },
//     };
//   });
// }

export function injectState<TConfig extends TModuleStateConfig>(config: (new (...args: any) => TConfig) | TConfig) {
  return createInjector(injector => {
    const state = createStateForModule(injector.provider, config);
    return {
      type: StateInjectorType,
      getValue() {
        return state;
      },
    };
  });
}

function createStateForModule<TConfig extends TModuleStateConfig>(provider: Provider<any>, rawConfig: (new (...args: any) => TConfig) | TConfig): TStateControllerFor<TConfig & { name: string }> & { isLoading: boolean} {

  const name = `${provider.name}__${provider.scope.id}`;
  const store = provider.scope.resolve(Store);
  const config: TConfig & { name: string } = Object.getPrototypeOf(rawConfig) === Object.getPrototypeOf({}) ? { ...rawConfig, name } : {
    ...new (rawConfig as any)(),
    name,
  };
  const isLoading = !provider.isLoaded;
  config.state = { ...config.state, isLoading };
  const stateController = store.createState(config);
  if (!isLoading) return stateController;

  store.registerMutation(name, 'setModuleIsLoaded', () => {
    stateController.state.isLoading = true;
  });
  provider.events.on('onModuleLoaded', () => stateController.setModuleIsLoaded());
  return stateController;
}

type TModuleStateConfig = Omit<TStateConfig, 'name'>;

// // type ModuleStateFor<T, TConfig = T extends new (...args: any) => infer TInstance ? TInstance : T> = TStateControllerFor<TConfig>
// type ModuleStateConfig<TStateConstructor extends (new (...args: any) => TStateConfig) | TStateConfig;
//
// const st: ModuleStateFor<EditorState> = null as any;
