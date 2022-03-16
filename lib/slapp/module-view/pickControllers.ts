import { ModuleViewBuilder } from './module-view-builder';
import { defineGetter } from '../../scope';

export function pickControllers<TModule, TView>(builder: ModuleViewBuilder<TModule, TView>) {

  const module = builder.module as any;
  const view = builder.view as any;

  Object.keys(builder.moduleDescriptors).forEach(propName => {
    if (!propName.endsWith('Controller')) return;

    const controllerName = propName.split('Controller')[0];
    defineGetter(view, controllerName, () => module[propName]);
  });

  return view as TView & PickControllers<TModule>;
}

type GetControllerName<TStr> = TStr extends `${infer TName}Controller` ? TName : never;
export type PickControllers<T> = {[K in keyof T as GetControllerName<K>]: T[K] }




