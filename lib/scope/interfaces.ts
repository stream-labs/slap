import { Dict } from './utils';
import { Provider } from './provider';

export type PickFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
}[keyof T];
export type PickFunctionProperties<T> = Pick<T, PickFunctionPropertyNames<T>>;

export type TInstances<T extends { [key: string]: new (...args: any) => any }> = {
  [P in keyof T]: InstanceType<T[P]>;
};

export type GetInjectReturnType<Type> = Type extends new (...args: any) => any
  ? InstanceType<Type>
  : Type extends { [key: string]: new (...args: any) => any } ? TInstances<Type> :
    never;

export type TModuleConstructor = new (...args: any[]) => any;
export type TModuleConstructorMap = { [key: string]: TModuleConstructor }

export type TModuleClass = new (...args: any) => any;

export type TModuleCreator = TModuleClass | Dict<any> | ((...args: any) => any)
export type TModuleLocatorType = TModuleCreator | string;

export type TModuleInstanceFor<TModuleLocator> =
  TModuleLocator extends new (...args: any[]) => infer TInstanceFromConstructor ?
    TInstanceFromConstructor :
      TModuleLocator extends (...args: any[]) => infer TInstanceFromFunction ?
        TInstanceFromFunction:
          TModuleLocator extends string ?
            unknown:
              TModuleLocator

export type TProviderFor<TModuleLocator extends TModuleLocatorType> = Provider<TModuleInstanceFor<TModuleLocator>>
export type TLoadingStatus = 'not-started' | 'loading' | 'done' | 'error';
