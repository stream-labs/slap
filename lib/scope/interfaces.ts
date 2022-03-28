import { Dict } from './utils';
import { Provider } from './provider';

export type TInstances<T extends { [key: string]: new (...args: any) => any }> = {
  [P in keyof T]: InstanceType<T[P]>;
};

export type GetInjectReturnType<Type> = Type extends new (...args: any) => any
  ? InstanceType<Type>
  : Type extends { [key: string]: new (...args: any) => any } ? TInstances<Type> :
    never;
export type TInjector = <T>(injectedObject: T) => GetInjectReturnType<T>

export type TModuleConstructor = new (...args: any[]) => any;
export type TModuleConstructorMap = { [key: string]: TModuleConstructor }

export type TModuleClass = new (...args: any) => any;
export type AConstructorTypeOf<T> = new (...args:any[]) => T;

export type TModuleCreator = TModuleClass | Dict<any> | ((...args: any) => any)
export type TModuleLocatorType = TModuleCreator | string;

export type TModuleInstanceFor<TModuleLocator> =
  TModuleLocator extends new (...args: any[]) => infer TInstance ?
    TInstance :
    TModuleLocator extends string ? unknown: TModuleLocator

export type TProviderFor<TModuleLocator extends TModuleLocatorType> = Provider<TModuleInstanceFor<TModuleLocator>>

// class Logger {
//   foo: '1';
// }
//
// const blogger = {
//   bar: '1',
// };
//
// const t1: TModuleInstanceFor<Logger>;
// const t2: TModuleInstanceFor<typeof blogger>;
// t;
