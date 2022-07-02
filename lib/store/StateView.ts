import {
  defineGetter, Dict, forEach,
} from '../scope';
import { GetComponentDataForModule } from './plugins/createModuleView';

/**
 * Components use StateView to select reactive state and methods from modules
 * StateView keeps information for components about reactive and non-reactive data
 * It saves data snapshots for components and allow to compare them to detect changes
 */
export class StateView<TProps = {}> {

  props: TProps = {} as TProps;
  proxy: TProps;
  descriptors = {} as TGetDescriptorsForProps<TProps>;
  selectedDescriptors = {} as TGetDescriptorsForProps<TProps>;
  hasReactiveProps = false;
  hasSelectedProps = false;
  hasWildcardProps = false;
  wildcardPropCreator = null as null | ((propName: string) => unknown);

  constructor() {
    // create Proxy that should listen all reactive props that component requested during rendering
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

  /**
   * Register a new property in the StateView instance
   */
  defineProp<TValue>(descriptorParams: TConstructDescriptorProps<TValue>) {
    const descriptor: TModulePropDescriptor<TValue> = {
      configurable: true,
      enumerable: true,
      reactive: false,
      getRev: descriptorParams.getValue,
      stateView: null,
      dynamic: false,
      description: '',
      ...descriptorParams,
    };
    (this.descriptors as any)[descriptor.name] = descriptor;
    if (descriptor.reactive) this.hasReactiveProps = true;
    defineGetter(this.props as any, descriptor.name, () => descriptor.getValue());
  }

  /**
   * Defile a wildcard property
   * The wildcard property could be accessible without registration with `defineProp` method
   */
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

  /**
   * Create a snapshot with reactive data based on reactive props selected in a component
   */
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

  clone() {
    const clone = new StateView<TProps>();
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

export type ExtendView<TBaseProps, TExtendedModule> = StateView<TBaseProps & GetComponentDataForModule<TExtendedModule>>;

export type TModulePropDescriptor<TValue> = {
  name: string,
  reactive: boolean,
  description: string,
  stateView: StateView | null,
  getValue(): TValue,
  getRev(): unknown, // used for fast comparison of complex object, use getValue() as default value
  enumerable: boolean,
  configurable: boolean,
  dynamic: boolean,
}

export type TConstructDescriptorProps<TValue, TDescriptor = TModulePropDescriptor<TValue>> = Partial<TDescriptor> & Required<Pick<TModulePropDescriptor<TValue>, 'name' | 'getValue'>>
export type TGetDescriptorsForProps<TProps extends Dict<any>> = {[P in keyof TProps]: TModulePropDescriptor<TProps[P]>}
export type GetProps<TModuleView> = TModuleView extends StateView<infer TProps> ? TProps : never;
