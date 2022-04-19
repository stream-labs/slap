import {
  createInjector, inject,
  InjectedProp,
  Injector, injectProvider,
} from '../../scope';

import {
  ModuleStateController,
  Store, TStateConfigCreator, TStateControllerFor, TStateViewForStateConfig,
} from '../Store';
import { StateView } from '../StateView';
import { injectChild } from './inject-child';

export const StateInjectorType = Symbol('stateInjector');

export function injectState<

  TConfigCreator extends TStateConfigCreator,
  TValue = TStateControllerFor<TConfigCreator>,
  TViewValue = StateView<TStateViewForStateConfig<TConfigCreator>>,
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
  stateController!: TStateControllerFor<TStateConfig>;
  stateView!: StateView<TStateViewForStateConfig<TStateConfig>>;

  constructor(public stateConfig: TStateConfig, public allowMutationDecorators = true, public onCreate?: (module: StatefulModule<TStateConfig>) => unknown) {
  }

  get injector() {
    const injector = this.provider.options.injector;
    if (!injector) {
      throw new Error('This module should be injected');
    }
    return injector;
  }

  get moduleName() {
    return this.injector.provider.id;
  }

  init() {
    const injector = this.injector;
    const parentProvider = injector.provider;
    const sectionName = this.provider.name;
    const moduleName = this.moduleName;
    this.stateController = this.store.createState(moduleName, sectionName, this.stateConfig);

    // register methods marked with the @mutation() decorators
    if (this.allowMutationDecorators) {
      const parentModule = parentProvider.instance;
      const mutations: string[] = parentProvider.creator?.prototype?.__mutations || [];
      mutations.forEach(mutationName => {
        const mutation = parentModule[mutationName];
        this.stateController.registerMutation(mutationName, mutation);
        parentModule[mutationName] = (...args: any) => (this.stateController as any)[mutationName](...args);
      });

    }

    this.stateView = this.stateController.createView() as StateView<TStateViewForStateConfig<TStateConfig>>;
    this.onCreate && this.onCreate(this);
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
