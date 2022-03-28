import { StateView } from './state-view';
import { traverse } from '../../traverse';
import { ModuleStateController } from '../../store';
import { forEach } from '../../scope';

export function pickGetters<TModule, TProps>(props: TProps, view: StateView<TModule, TProps>) {

  const module = view.module as any;
  const extendedView = view.clone() as StateView<TModule, TProps & TState>;

  // Object.keys(view.moduleDescriptors).forEach(propName => {
  //   if ((view.propsDescriptors as any)[propName]) return;
  //   const descriptor = view.moduleDescriptors[propName];
  //   if (descriptor.get) {
  //     extendedView.defineProp({
  //       type: 'Getter',
  //       name: propName,
  //       reactive: true,
  //       getValue: () => module[propName],
  //     });
  //     return;
  //   }
  //   if (propName.startsWith('get'))
  // });


  return extendedView;
}

//
// // https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
// export type IfEquals<X, Y, A, B> =
//   (<T>() => T extends X ? 1 : 2) extends
//     (<T>() => T extends Y ? 1 : 2) ? A : B;
//
// type WritableKeysOf<T> = {
//   [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
// }[keyof T];
// type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
//
// // type FilterConditionally<Source, Condition> = Pick<Source, {[K in keyof Source]: Source[K] extends Condition ? K : never}[keyof Source]>;
// type TIsGetterFunctionName<Key> = Key extends `get${string}` ? Key : never;
// // type TIsControllerFactoryName<Key> = Key extends `${string}Controller` ? Key : never;
// // type TIsMethodName<T, K extends keyof T> = T[K] extends Function ? K : never;
// // type TPickFunctions<T> = FilterConditionally<T, Function>
// // type PickAsyncMethods<T> = TPromisifyFunctions<Omit<TPickFunctions<T>, TIsGetterFunctionName<keyof T>>>;
//
// // type TBehaviorSubjectName<T, Key> = T[Key] extends BehaviorSubject<any>
//
// type PickGetterFunctions<T> = Pick<T, TIsGetterFunctionName<keyof T>>
// type PickGetters<T> = Omit<T, WritableKeysOf<T>>;
