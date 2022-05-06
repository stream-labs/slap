import {
  defineGetter, inject, InjectableModule,
  InjectedProp,
  injectProvider,
} from '../../scope';

import {
  Store, TStateConfigCreator, GetStateControllerFor, TStateFor, TStateViewForStateConfig,
} from '../Store';
import { StateView } from '../StateView';
import { injectChild } from './inject-child';
import { GetInjectedFormBinding, injectFormBinding, TFormBindings } from './inject-form';
import { createStateView } from './createStateView';

export function injectState<

  TConfigCreator extends TStateConfigCreator,
  TValue = GetStateControllerFor<TConfigCreator>,
  TViewValue = GetStateViewFor<TConfigCreator>,
>(
  configCreator: TConfigCreator,
  allowMutationDecorators = true,
  onCreate?: (statefulModule: StatefulModule<TConfigCreator>) => unknown,
): InjectedProp<TValue, TViewValue, TViewValue> {
  return injectChild(StatefulModule, configCreator, allowMutationDecorators, onCreate) as any as InjectedProp<TValue, TViewValue, TViewValue>;
}

export class StatefulModule<TStateConfig> implements InjectableModule {

  store = inject(Store);
  provider = injectProvider();
  stateController!: GetStateControllerFor<TStateConfig>;
  stateView!: GetStateViewFor<TStateConfig>;
  formBinding: GetInjectedFormBinding<TStateFor<TStateConfig>>;

  constructor(public stateConfig: TStateConfig, public allowMutationDecorators = true, public onCreate?: (module: StatefulModule<TStateConfig>) => unknown) {

    const moduleName = this.moduleName;
    this.stateController = this.store.createState(moduleName, this.stateConfig);
    this.formBinding = injectFormBinding(() => this.stateController.getters, patch => this.stateController.update(patch));
    // TODO find better solution for injecting the provider
    defineGetter(this.stateController, '__provider', () => this.provider, { enumerable: false });

  }

  init() {
    const parentProvider = this.provider.options.parentProvider;
    if (!parentProvider) {
      throw new Error('StatefulModule module should be injected');
    }
    // register methods marked with the @mutation() decorators
    if (this.allowMutationDecorators && parentProvider) {
      const parentModule = parentProvider.instance;
      const mutations: string[] = parentProvider.creator?.prototype?.__mutations || [];
      mutations.forEach(mutationName => {
        const mutation = parentModule[mutationName];
        this.stateController.registerMutation(mutationName, mutation, parentModule);
        parentModule[mutationName] = (...args: any) => (this.stateController as any)[mutationName](...args);
      });

      parentProvider.events.on('onAfterInit', () => {
        this.stateController.finishInitialization();
      });
    }

    this.stateView = createStateView(this.stateController) as any;
    this.stateView.defineProp({
      description: 'StateFormBinding',
      name: 'bind',
      reactive: true,
      stateView: this.formBinding.formBinding,
      getValue: () => {
        return this.formBinding.formBinding;
      },
    });
    this.onCreate && this.onCreate(this);
  }

  get moduleName() {
    return this.provider.id;
  }

  destroy() {
    this.store.destroyModule(this.moduleName);
  }

  exportInjectorValue() {
    return this.stateController;
  }

  exportSelectorValue() {
    return this.stateView;
  }

  exportSelectorExtraValues() {
    return this.stateView;
  }
}

/**
 * A decorator that registers the object method as an mutation
 */
export function mutation() {
  return function (target: any, methodName: string) {
    target.__mutations = target.__mutations || [];
    // mark the method as an mutation
    target.__mutations.push(methodName);
  };
}

export type GetStateViewFor<TStateConfig> = StateView<TStateViewForStateConfig<TStateConfig> & { bind: TFormBindings<TStateFor<TStateConfig>>}>;
