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
  onCreate?: (statefulModule: StatefulModule<TConfigCreator>) => unknown,
): InjectedProp<TValue, TViewValue, TViewValue> {
  return injectChild(StatefulModule, configCreator, onCreate) as any as InjectedProp<TValue, TViewValue, TViewValue>;
}

// export function injectState<
//   TConfigCreator extends TStateConfigCreator,
//   TValue = TStateControllerFor<TConfigCreator>,
//   TViewValue = StateView<TStateViewForStateConfig<TConfigCreator>>,
//   >(configCreator: TConfigCreator, onCreate?: (stateController: TValue, injector: Injector<TValue, TViewValue, TViewValue>) => unknown): InjectedProp<TValue, TViewValue, TViewValue> {
//   return createInjector(injector => {
//
//     const store = injector.provider.scope.resolve(Store);
//     let state: TValue = null as any;
//     let stateView: TViewValue = null as any;
//
//     function createState(propName: string) {
//       const moduleName = injector.provider.instanceId;
//       const moduleState = store.createState(moduleName, propName, configCreator);
//       return moduleState;
//     }
//
//     return {
//       type: StateInjectorType,
//       load: () => {
//         state = createState(injector.propertyName) as TValue;
//         stateView = (state as any as ModuleStateController).createView() as any as TViewValue;
//         onCreate && onCreate(state, injector);
//       },
//       getValue() {
//         return state;
//       },
//
//       exportComponentData() {
//         return {
//           self: stateView,
//           extra: stateView,
//         };
//       },
//       onDestroy() {
//         const moduleName = injector.provider.instanceId;
//         store.destroyModule(moduleName);
//       },
//     };
//   });
// }

export class StatefulModule<TStateConfig> {

  store = inject(Store);
  provider = injectProvider();
  stateController!: TStateControllerFor<TStateConfig>;
  stateView!: StateView<TStateViewForStateConfig<TStateConfig>>;

  constructor(public stateConfig: TStateConfig, public onCreate?: (module: StatefulModule<TStateConfig>) => unknown) {
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

  load() {
    const injector = this.injector;
    const parentProvider = injector.provider;
    const sectionName = injector.propertyName;
    const moduleName = this.moduleName;
    this.stateController = this.store.createState(moduleName, sectionName, this.stateConfig);

    // register methods marked with the @mutation() decorators
    const parentModule = parentProvider.instance;
    const mutations: string[] = parentModule.__mutations || [];
    mutations.forEach(mutationName => {
      this.stateController.registerMutation(mutationName, parentModule[mutationName]);
    });


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
