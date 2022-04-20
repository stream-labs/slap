import {
  createInjector, defineGetter, inject,
  InjectedProp,
  Injector, injectProvider,
} from '../../scope';

import {
  StateController,
  Store, TStateConfigCreator, GetStateControllerFor, TStateFor, TStateViewForStateConfig,
} from '../Store';
import { StateView } from '../StateView';
import { injectChild } from './inject-child';
import { GetInjectedFormBinding, injectFormBinding, TFormBindings } from './inject-form';

export const StateInjectorType = Symbol('stateInjector');

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

export class StatefulModule<TStateConfig> {

  store = inject(Store);
  provider = injectProvider();
  stateController!: GetStateControllerFor<TStateConfig>;
  stateView!: GetStateViewFor<TStateConfig>;
  formBinding: GetInjectedFormBinding<TStateFor<TStateConfig>>;

  constructor(public stateConfig: TStateConfig, public allowMutationDecorators = true, public onCreate?: (module: StatefulModule<TStateConfig>) => unknown) {

    const moduleName = this.moduleName;
    const sectionName = this.provider.id;
    this.stateController = this.store.createState(moduleName, sectionName, this.stateConfig);
    this.formBinding = injectFormBinding(() => this.stateController.getters, patch => this.stateController.update(patch));
    // TODO find better solution for injecting the provider
    defineGetter(this.stateController, '__provider', () => this.provider, { enumerable: false });

  }

  init() {
    const parentProvider = this.provider.options.parentProvider;
    if (!parentProvider) {
      throw new Error('this module should be injected');
    }
    // register methods marked with the @mutation() decorators
    if (this.allowMutationDecorators && parentProvider) {
      const parentModule = parentProvider.instance;
      const mutations: string[] = parentProvider.creator?.prototype?.__mutations || [];
      mutations.forEach(mutationName => {
        const mutation = parentModule[mutationName];
        this.stateController.registerMutation(mutationName, mutation);
        parentModule[mutationName] = (...args: any) => (this.stateController as any)[mutationName](...args);
      });

    }

    this.stateView = this.stateController.createView() as any;
    this.stateView.defineProp({
      type: 'StateFormBinding',
      name: 'bind',
      reactive: true,
      stateView: this.formBinding.formBinding,
      getValue: () => {
        return this.formBinding.formBinding;
      },
    })
    this.onCreate && this.onCreate(this);
  }

  get moduleName() {
    return this.provider.options.parentProvider!.id;
  }

  onDestroy() {
    this.store.destroyModule(this.moduleName);
  }

  exportInjectorValue() {
    return this.stateController;
  }

  exportComponentData() {
    return {
      self: this.stateView,
      extra: this.stateView,
    };
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
