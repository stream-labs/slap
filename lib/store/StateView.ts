// composition layer
// construct a ReactiveObject based on given presets
// has module,stateSelector and allow extending
import {
  defineGetter, Dict, forEach, Scope, TModuleInstanceFor,
} from '../scope';
import { getInstanceMetadata } from '../scope/provider';
import { pickProps } from './plugins/pickProps';
import {
  GetAllInjectedProps,
  GetInjectedProps,
  pickInjectors,
} from './plugins';

export class StateView<TProps = {}> {

  props: TProps = {} as TProps;
  proxy: TProps;
  descriptors = {} as TGetDescriptorsForProps<TProps>;
  selectedDescriptors = {} as TGetDescriptorsForProps<TProps>;
  hasReactiveProps = false;
  hasSelectedProps = false;
  hasWildcardProps = false;
  wildcardPropCreator = null as null | ((propName: string) => unknown);

  constructor(public scope?: Scope) {
    this.proxy = new Proxy(
      {
        __proxyName: 'StateViewProxy', // set proxy name for debugging
        __target: this,
      },
      {
        get: (target: any, propName: string) => {
          if (propName === 'hasOwnProperty') return target.hasOwnProperty;
          if (propName in target) return (target as any)[propName];
          const value = this.selectValue(propName as keyof TProps);
          return value;
        },
      },
    ) as any;
  }

  defineProp<TValue>(descriptorParams: TConstructDescriptorProps<TValue>) {
    const descriptor: TModulePropDescriptor<TValue> = {
      configurable: true,
      enumerable: true,
      reactive: false,
      getRev: descriptorParams.getValue,
      stateView: null,
      dynamic: false,
      ...descriptorParams,
    };
    (this.descriptors as any)[descriptor.name] = descriptor;
    if (descriptor.reactive) this.hasReactiveProps = true;
    // const getValue = descriptor.stateView ? () => descriptor.stateView!.props : () => descriptor.getValue;
    // defineGetter(this.props as any, descriptor.name, getValue);
    defineGetter(this.props as any, descriptor.name, () => descriptor.getValue());
  }

  defineWildcardProp(cb: StateView['wildcardPropCreator']) {
    this.hasWildcardProps = true;
    this.wildcardPropCreator = cb;
  }

  private selectValue(propName: keyof TProps) {
    let descriptor = this.descriptors[propName];

    if (!descriptor) {
      if (!this.wildcardPropCreator) {
        throw new Error(`Property ${propName} is not defined`);
      }
      this.wildcardPropCreator(propName as string);
      descriptor = this.descriptors[propName];
    }

    if (descriptor.reactive) {
      this.selectedDescriptors[propName] = descriptor;
      if (!this.hasSelectedProps) this.hasSelectedProps = true;
      if (descriptor.stateView) return descriptor.stateView.proxy;
    }
    return descriptor.getValue();
  }

  getSnapshot() {
    const selectedDescriptors = this.selectedDescriptors;
    const props = {} as TProps;

    forEach(selectedDescriptors, (descr, propName) => {
      let value: unknown;
      if (descr.stateView) {
        const getRev = (descr.stateView.descriptors as any).getRev;
        if (getRev) {
          value = getRev.getValue();
        } else {
          value = descr.stateView.getSnapshot();
        }
      } else {
        value = descr.getRev();
      }

      (props as any)[propName] = value;
    });
    return props;
  }

  // use for debugging
  get selectedProps() {
    const selectedDescriptors = this.selectedDescriptors;
    const result = {} as TProps;
    forEach(selectedDescriptors, (descr, propName) => {
      if (!descr.reactive) return;
      // @ts-ignore
      result[propName] = descr.getRev();
    });
    return result;
  }

  getAnalytics() {
    // TODO ?
  }

  // DEFINE MULTIPLE WAYS FOR EXTENDING THE ModuleView
  // TODO: remove overloads that we will never use

  /**
   * // Extend with a factory returning a new ModuleView
   *
   * module.extend((props, view) => {
   *   const module = scope.resolve(MyModule)
   *   return new ModuleView(module)
   * })
   */
  select<TNewView extends StateView<any>>(newViewFactory: (props: TProps, view: StateView<TProps>) => TNewView): TNewView {
    return newViewFactory(this.props, this);
  }

  // eslint-disable-next-line no-dupe-class-members
  // extend<TNewProps>(newPropsFactory: (props: TProps, view: StateView<TProps>) => TNewProps, name: string): ExtendView<TProps, TNewProps> {
  //   if (!this.scope) {
  //     throw new Error('You should define a Scope to use .extend()');
  //   }
  //
  //   if (!this.scope.isRegistered(name)) {
  //     const factory = () => newPropsFactory(this.props, this);
  //     const provider = this.scope.register(factory, name);
  //     const extendedModule = this.scope.resolve(name);
  //     const extendedModuleView = createStateViewForModule(extendedModule);
  //     const mergedView = this.mergeView(extendedModuleView);
  //     provider.setMetadata('StateView', mergedView);
  //     // TODO destroy module after component destroy, create a component scope
  //   }
  //
  //   const provider = this.scope.resolveProvider(name);
  //   const extendedView = provider.getMetadata('StateView');
  //   return extendedView;
  // }

  clone() {
    const clone = new StateView<TProps>(this.scope);
    forEach(this.descriptors, descriptor => clone.defineProp(descriptor));
    return clone;
  }

  mergeView<
    TExtension extends StateView<any>,
    TResult = ExtendView<TProps, TExtension>
    >(extension: TExtension): TResult {
    // merge one view into another
    const mergeResult = this.clone();
    forEach(extension.descriptors, descriptor => mergeResult.defineProp(descriptor as any));
    return mergeResult as any as TResult;
  }

}

export function createStateViewForModule<T>(module: T) {
  const scope = getInstanceMetadata(module).provider.scope;
  const stateView = new StateView(scope);
  return stateView
    .select(pickProps(module)) // expose the module props
    .select(pickInjectors(module)) as GetModuleStateView<T>; // expose injectors
}

export type GetModuleSelfView<
  TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>
  > = TModule extends { exportComponentData: () => ({ self: StateView<infer TView> })} ? TView : {}

export type GetModuleExtraView<
  TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>
  > = TModule extends { exportComponentData: () => ({ extra: StateView<infer TView> })} ? TView : {}

export type GetComponentDataForModule<
  TModuleConfig,
  TModule = TModuleInstanceFor<TModuleConfig>,
  TSelfExport = GetModuleSelfView<TModuleConfig>,
  TExtraExport = GetModuleExtraView<TModuleConfig>,
  TInjectedProps = TModule extends { exportComponentData: () => any } ? {} : GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>
  > = TSelfExport & TExtraExport & TInjectedProps;

// export type GetModuleView<TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>> =
//   TModule extends { getView: () => StateView<infer TView>} ? TView : GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>

export type GetModuleStateView<TModuleConfig> = StateView<GetComponentDataForModule<TModuleConfig>>;

export type ExtendView<TBaseProps, TExtendedModule> = StateView<TBaseProps & GetComponentDataForModule<TExtendedModule>>;

export type TModulePropDescriptor<TValue> = {
  type: string,
  name: string,
  reactive: boolean,
  stateView: StateView | null,
  getValue(): TValue,
  getRev(): unknown, // used for fast comparison of complex object, use getValue() as default value
  enumerable: boolean,
  configurable: boolean,
  dynamic: boolean,
  // module: unknown, // one module view can be assembled from multiple modules
}

export type TConstructDescriptorProps<TValue, TDescriptor = TModulePropDescriptor<TValue>> = Partial<TDescriptor> & Required<Pick<TModulePropDescriptor<TValue>, 'type' | 'name' | 'getValue'>>
export type TGetDescriptorsForProps<TProps extends Dict<any>> = {[P in keyof TProps]: TModulePropDescriptor<TProps[P]>}
export type GetProps<TModuleView> = TModuleView extends StateView<infer TProps> ? TProps : never;
