import { GetProps, StateView } from '../StateView';
import { traverse } from '../../utils';
import { Dict, forEach, InjectableModule, moduleSystemProps, Provider } from '../../scope';

export type PickModuleProps<TView, TModule> = StateView<GetProps<TView> & TModule>

export function pickProps<TModule, TProps>(module: TModule): (props: TProps, view: StateView<TProps>) => StateView<TProps & TModule> {

  return function (props, view) {

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
            stateView: selfProps as any,
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
