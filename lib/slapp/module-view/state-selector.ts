import { defineGetter, forEach } from '../../scope';
import {
  TConstructDescriptorProps,
  TGetDescriptorsForProps,
  TModulePropDescriptor,
} from './state-view';

export class StateSelector<TProps> {

  props: TProps = {} as TProps;
  proxy: TProps;
  descriptors = {} as TGetDescriptorsForProps<TProps>;
  selectedDescriptors = {} as TGetDescriptorsForProps<TProps>;
  hasReactiveValues = false;
  hasSelectedValues = false;

  constructor() {
    this.proxy = new Proxy(
      {
        __proxyName: 'StateSelector', // set proxy name for debugging
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

  clone() {
    const clone = new StateSelector<TProps>();
    forEach(this.descriptors, descriptor => clone.defineProp(descriptor));
    return clone;
  }

  defineProp<TValue>(descriptorParams: TConstructDescriptorProps<TValue>) {
    const descriptor: TModulePropDescriptor<TValue> = {
      configurable: true,
      enumerable: true,
      reactive: false,
      childSelector: null,
      getHash: descriptorParams.getValue,
      ...descriptorParams,
    };
    (this.descriptors as any)[descriptor.name] = descriptor;
    if (descriptor.reactive) this.hasReactiveValues = true;
    defineGetter(this.props as any, descriptor.name, () => descriptor.getValue());
  }

  private selectValue(propName: keyof TProps) {
    const descriptor = this.descriptors[propName];

    if (!descriptor) {
      throw new Error(`Property ${propName} is not defined`);
    }

    const value = descriptor.getValue();
    if (descriptor.reactive) {
      this.selectedDescriptors[propName] = descriptor;
      if (!this.hasSelectedValues) this.hasSelectedValues = true;
    }
    return value;
  }

  getSnapshot() {

    // TODO get affected modules?
    const selectedDescriptors = this.selectedDescriptors;
    const result = {} as TProps;
    forEach(selectedDescriptors, (descr, propName) => {
      // @ts-ignore
      result[propName] = descr.getHash();
    });
    return result;
  }

  // use for debugging
  get selectedProps() {
    const selectedDescriptors = this.selectedDescriptors;
    const result = {} as TProps;
    forEach(selectedDescriptors, (descr, propName) => {
      if (!descr.reactive) return;
      // @ts-ignore
      result[propName] = descr.getHash();
    });
    return result;
  }

  getAnalytics() {
    // TODO ?
  }
}
