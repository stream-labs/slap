import { Dict } from './utils';
import { Provider } from './provider';

export type PickFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
}[keyof T];
export type PickFunctionProperties<T> = Pick<T, PickFunctionPropertyNames<T>>;

export type TModuleConstructor = new (...args: any[]) => any;
export type TModuleConstructorMap = { [key: string]: TModuleConstructor }

export type TModuleClass = new (...args: any) => any;

export type TModuleCreator = TModuleClass | Dict<any> | ((...args: any) => any)
export type TModuleLocatorType = TModuleCreator | string;

export type GetModuleInstanceFor<TModuleLocator> =
  TModuleLocator extends new (...args: any[]) => infer TInstanceFromConstructor ?
    TInstanceFromConstructor :
      TModuleLocator extends (...args: any[]) => infer TInstanceFromFunction ?
        TInstanceFromFunction:
          TModuleLocator extends string ?
            unknown:
              TModuleLocator

export type GetModuleConstructorArgs<TModuleLocator> =
  TModuleLocator extends new (...args: infer ConstructorArgs) => any ?
    ConstructorArgs :
    TModuleLocator extends (...args: infer ConstructorArgs) => any ?
      ConstructorArgs:
        unknown[]

export type TProviderFor<TModuleLocator extends TModuleLocatorType> = Provider<GetModuleInstanceFor<TModuleLocator>>

export interface InjectableModule {
  init?(): unknown;
  destroy?(): unknown;
  exportInjectorValue?(): any;
  exportSelectorValue?(): any;
  exportSelectorExtraValues?(): any;
}

export interface InjectableModuleTyped
  <TInjectedValue, TSelectorValue, TSelectorExtraValues> extends InjectableModule
{
  exportInjectorValue?(): TInjectedValue; // export this value as an injector value
  exportSelectorValue?(): TSelectorValue;// export this value into useModule selector under the module's name
  exportSelectorExtraValues?(): TSelectorExtraValues; // export this values as additional data available for selection
}
