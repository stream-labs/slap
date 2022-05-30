import { StateView } from '../StateView';
import { GetMerge, traverse } from '../../utils';
import {
  Dict,
  Flatten,
  forEach,
  GetModuleInstanceFor,
  InjectableModuleTyped,
  moduleSystemProps,
  Provider,
} from '../../scope';

/**
 * Create a StateView instance and register props from the given module in that StateView
 * @param module
 */
export function createModuleView<TModule>(module: TModule): GetModuleStateView<TModule> {

  let view = new StateView();

  const injectedProps: Dict<boolean> = {};

  // find and register props for injected modules
  traverse(module as any as object, (propName, descr) => {
    if (moduleSystemProps[propName]) return;
    if (descr.get) return;

    // consider that the property contains an injectable module if it has a "__provider" value
    const provider = descr.value?.__provider as Provider<any>;
    if (!(provider instanceof Provider)) return;

    if (provider) {

      // mark the prop as injectable
      injectedProps[propName] = true;

      // take the module instance
      const injectedModule = provider.instance as InjectableModuleTyped<any, any, any>;

      // take the value that should be injected as property for the parent module
      const injectedValue = injectedModule.exportInjectorValue ? injectedModule.exportInjectorValue() : injectedModule;

      // take the value that should be injected as property for the component's selector
      const selectorValue = injectedModule.exportSelectorValue && injectedModule.exportSelectorValue();

      // take other(extra) props we should export to the component's selector
      const selectorExtraValues = injectedModule.exportSelectorExtraValues && injectedModule.exportSelectorExtraValues();

      // register extra props in the StateView
      const extraProps = selectorExtraValues;
      if (extraProps) {
        const extraPropsView = extraProps as StateView<any>;
        forEach(extraPropsView.descriptors, (descriptor, p) => {
          if (!(descriptor.name in injectedModule)) view.defineProp(descriptor);
        });
        view = view.mergeView(extraProps as any);
      }

      // register extra injected value in the StateView
      const selfProps = selectorValue || injectedValue;
      if (selfProps) {
        view.defineProp({
          description: 'InjectorView',
          name: propName,
          reactive: true,
          stateView: selfProps instanceof StateView ? selfProps : null,
          getValue() {
            return injectedValue;
          },
        });
      }
    }
  });

  // register other module props
  traverse(module as any as object, (propName, descr) => {
    if (injectedProps[propName]) return;
    if (moduleSystemProps[propName]) return;

    // register getters/computed values
    // getters are reactive and will be recalculated when sate changed
    if (descr.get) {
      view.defineProp({
        description: 'ModuleGetter',
        reactive: true,
        name: propName,
        getValue: () => (module as any)[propName],
      });
      return;

    }

    // register methods
    if (typeof descr.value === 'function') {
      view.defineProp({
        description: 'ModuleMethod',
        reactive: false,
        name: propName,
        getValue: () => descr.value.bind(module),
      });
      return;
    }

    // register simple module variables
    // these variables are not reactive and changing them will not re-render components
    // these variables could be used instead React 'refs'
    view.defineProp({
      description: 'ModuleVariable',
      reactive: false,
      name: propName,
      getValue: () => (module as any)[propName],
    });

  });

  return view as any;
}

export type GetModuleSelectorValue<
  TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>
  > = TModule extends { exportSelectorValue: () => StateView<infer TView> } ? TView : {}

export type GetModuleExtraValue<
  TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>
  > = TModule extends { exportExtraSelectorValues: () => StateView<infer TView> } ? TView : {}

export type GetComponentDataForModule<
  TModuleConfig,
  TModule = GetModuleInstanceFor<TModuleConfig>,
  TSelectorExport = GetModuleSelectorValue<TModuleConfig>,
  TSelectorExtraExport = GetModuleExtraValue<TModuleConfig>,
  TInjectedProps = TModule extends { exportSelectorValue: () => any } ? {} : GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>
  > = GetMerge<TSelectorExtraExport, TSelectorExport & TInjectedProps>;

export type GetModuleStateView<TModuleConfig> = StateView<GetComponentDataForModule<TModuleConfig>>;

export type GetInjectedPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends { __injector: InjectableModuleTyped<any, any, any>} ? TProp : never;
export type GetInjectedExtraPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends { __injector: InjectableModuleTyped<any, any, infer TExtraProps>} ? TExtraProps extends StateView ? TProp : never : never;

export type GetInjectedProps<TModule> = {[K in keyof TModule as GetInjectedPropName<TModule, K>]: TModule[K] extends { __injector: InjectableModuleTyped<any, StateView<infer TInjectorView>, any>} ? TInjectorView: never }
export type GetExtraInjectedProps<TModule> = {[K in keyof TModule as GetInjectedExtraPropName<TModule, K>]: TModule[K] extends { __injector: InjectableModuleTyped<any, any, StateView<infer TExtraProps>>} ? TExtraProps: never }
export type GetFlattenExtraProps<TModule> = keyof GetExtraInjectedProps<TModule> extends never ? {} : Flatten<GetExtraInjectedProps<TModule>>
export type GetAllInjectedProps<TModule> = GetMerge<GetFlattenExtraProps<TModule>, GetInjectedProps<TModule>>;
