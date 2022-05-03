import { GetProps, StateView } from '../StateView';
import { GetMerge, traverse } from '../../utils';
import {
  Dict,
  Flatten,
  forEach,
  GetModuleInstanceFor,
  InjectableModule,
  Injector,
  moduleSystemProps,
  Provider,
} from '../../scope';



export function createModuleView<TModule>(module: TModule): GetModuleStateView<TModule>  {

  let view = new StateView();

  const injectedProps: Dict<boolean> = {};

  traverse(module as any as object, (propName, descr) => {
    if (moduleSystemProps[propName]) return;
    if (descr.get) return;
    const provider = descr.value?.__provider as Provider<any>;
    if (provider) {

      injectedProps[propName] = true;
      const injectedModule = provider.instance as InjectableModule;
      const componentData = injectedModule.exportComponentData && injectedModule.exportComponentData();
      const injectedValue = injectedModule.exportInjectorValue ? injectedModule.exportInjectorValue() : injectedModule;

      const extraProps = componentData && componentData.extra;
      if (extraProps) {
        const extraPropsView = extraProps as StateView<any>;
        forEach(extraPropsView.descriptors, (descriptor, p) => {
          if (!(descriptor.name in injectedModule)) view.defineProp(descriptor);
        });
        view = view.mergeView(extraProps as any);
      }

      const selfProps = (componentData && componentData.self) || injectedValue;
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

  traverse(module as any as object, (propName, descr) => {
    if (injectedProps[propName]) return;
    if (moduleSystemProps[propName]) return;

    if (descr.get) {
      view.defineProp({
        description: 'ModuleGetter',
        reactive: true,
        name: propName,
        getValue: () => (module as any)[propName],
      });
      return;

    }

    if (typeof descr.value === 'function') {
      view.defineProp({
        description: 'ModuleMethod',
        reactive: false,
        name: propName,
        getValue: () => descr.value.bind(module),
      });
      return;
    }

    view.defineProp({
      description: 'ModuleVariable',
      reactive: false,
      name: propName,
      getValue: () => (module as any)[propName],
    });

  });

  return view as any;
}

export function pickProps<TModule, TProps>(module: TModule): (props: TProps, view: StateView<TProps>) => StateView<TProps & TModule> {

  return function (props, view) {

    const injectedProps: Dict<boolean> = {};

    traverse(module as any as object, (propName, descr) => {
      if (moduleSystemProps[propName]) return;
      if (descr.get) return;
      const provider = descr.value?.__provider as Provider<any>;
      if (!(provider instanceof Provider)) return;
      if (provider) {

        injectedProps[propName] = true;
        const injectedModule = provider.instance as InjectableModule;
        const componentData = injectedModule.exportComponentData && injectedModule.exportComponentData();
        const injectedValue = injectedModule.exportInjectorValue ? injectedModule.exportInjectorValue() : injectedModule;

        const extraProps = componentData && componentData.extra;
        if (extraProps) {
          const extraPropsView = extraProps as StateView<any>;
          forEach(extraPropsView.descriptors, (descriptor, p) => {
            if (!(descriptor.name in injectedModule)) view.defineProp(descriptor);
          });
          view = view.mergeView(extraProps as any);
        }

        const selfProps = (componentData && componentData.self) || injectedValue;
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

    traverse(module as any as object, (propName, descr) => {
      if (injectedProps[propName]) return;
      if (moduleSystemProps[propName]) return;

      if (descr.get) {
        view.defineProp({
          description: 'ModuleGetter',
          reactive: true,
          name: propName,
          getValue: () => (module as any)[propName],
        });
        return;

      }

      if (typeof descr.value === 'function') {
        view.defineProp({
          description: 'ModuleMethod',
          reactive: false,
          name: propName,
          getValue: () => descr.value.bind(module),
        });
        return;
      }

      view.defineProp({
        description: 'ModuleVariable',
        reactive: false,
        name: propName,
        getValue: () => (module as any)[propName],
      });

    });

    return view as any;
  };
}

export type GetModuleSelfView<
  TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>
  > = TModule extends { exportComponentData: () => ({ self: StateView<infer TView> })} ? TView : {}

export type GetModuleExtraView<
  TModuleConfig, TModule = GetModuleInstanceFor<TModuleConfig>
  > = TModule extends { exportComponentData: () => ({ extra: StateView<infer TView> })} ? TView : {}

export type GetComponentDataForModule<
  TModuleConfig,
  TModule = GetModuleInstanceFor<TModuleConfig>,
  TSelfExport = GetModuleSelfView<TModuleConfig>,
  TExtraExport = GetModuleExtraView<TModuleConfig>,
  TInjectedProps = TModule extends { exportComponentData: () => any } ? {} : GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>
  > = GetMerge<TExtraExport, TSelfExport & TInjectedProps>;


export type GetModuleStateView<TModuleConfig> = StateView<GetComponentDataForModule<TModuleConfig>>;


export type GetInjectedPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends { __injector: Injector<any, any, any>} ? TProp : never;
export type GetInjectedExtraPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends { __injector: Injector<any, any, infer TExtraProps>} ? TExtraProps extends StateView ? TProp : never : never;

export type GetInjectedProps<TModule> = {[K in keyof TModule as GetInjectedPropName<TModule, K>]: TModule[K] extends { __injector: Injector<any, StateView<infer TInjectorView>, any>} ? TInjectorView: never }
export type GetExtraInjectedProps<TModule> = {[K in keyof TModule as GetInjectedExtraPropName<TModule, K>]: TModule[K] extends { __injector: Injector<any, any, StateView<infer TExtraProps>>} ? TExtraProps: never }
export type GetFlattenExtraProps<TModule> = keyof GetExtraInjectedProps<TModule> extends never ? {} : Flatten<GetExtraInjectedProps<TModule>>
export type GetAllInjectedProps<TModule> = GetMerge<GetFlattenExtraProps<TModule>, GetInjectedProps<TModule>>;

export type PickInjectedViews<TView, TModule> = StateView<GetProps<TView> & GetAllInjectedProps<TModule>>;
