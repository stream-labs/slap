import { defineGetter, Dict } from '../../scope';
import { filterKeys, getDescriptors } from '../../traverseClassInstance';

export interface IModuleView {
  moduleSchema: Dict<'state' | 'getter' | 'getterFunction' | 'query' | 'queryValue'>
}

export class ModuleViewBuilder<TModule, TView = TModule> {

  public view: TView = { moduleSchema: {} } as any;
  public moduleDescriptors: Dict<PropertyDescriptor> = {};

  constructor(public module: TModule) {
    this.moduleDescriptors = getDescriptors(module);
  }

  use<TNewView>(transformFn: (builder: ModuleViewBuilder<TModule, TView>) => TNewView): ModuleViewBuilder<TModule, TNewView> {
    transformFn(this);
    const schema = this.moduleSchema;
    this.moduleDescriptors = filterKeys(this.moduleDescriptors, key => !(key in schema));
    return this as any as ModuleViewBuilder<TModule, TNewView>;
  }

  extend<TExtendedProps extends Dict<any>>(createExtendedProps: (view: TModule) => TExtendedProps) {
    const extendedProps = createExtendedProps(this.module);
    Object.keys(extendedProps).forEach(newPropName => {
      defineGetter(this.view as any, newPropName, () => extendedProps[newPropName]);
    });
    return this as any as ModuleViewBuilder<TModule, TModule & TExtendedProps>;
  }

  get moduleSchema() {
    return (this.view as any as IModuleView).moduleSchema;
  }
}
