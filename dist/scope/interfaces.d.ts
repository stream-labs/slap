import { Dict } from './utils';
import { Provider } from './provider';
export declare type PickFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
}[keyof T];
export declare type PickFunctionProperties<T> = Pick<T, PickFunctionPropertyNames<T>>;
export declare type TModuleConstructor = new (...args: any[]) => any;
export declare type TModuleConstructorMap = {
    [key: string]: TModuleConstructor;
};
export declare type TModuleClass = new (...args: any) => any;
export declare type TModuleCreator = TModuleClass | Dict<any> | ((...args: any) => any);
export declare type TModuleLocatorType = TModuleCreator | string;
export declare type GetModuleInstanceFor<TModuleLocator> = TModuleLocator extends new (...args: any[]) => infer TInstanceFromConstructor ? TInstanceFromConstructor : TModuleLocator extends (...args: any[]) => infer TInstanceFromFunction ? TInstanceFromFunction : TModuleLocator extends string ? unknown : TModuleLocator;
export declare type GetModuleConstructorArgs<TModuleLocator> = TModuleLocator extends new (...args: infer ConstructorArgs) => any ? ConstructorArgs : TModuleLocator extends (...args: infer ConstructorArgs) => any ? ConstructorArgs : unknown[];
export declare type TProviderFor<TModuleLocator extends TModuleLocatorType> = Provider<GetModuleInstanceFor<TModuleLocator>>;
export interface InjectableModule {
    init?(): unknown;
    destroy?(): unknown;
    exportInjectorValue?(): any;
    exportSelectorValue?(): any;
    exportSelectorExtraValues?(): any;
}
export interface InjectableModuleTyped<TInjectedValue, TSelectorValue, TSelectorExtraValues> extends InjectableModule {
    exportInjectorValue?(): TInjectedValue;
    exportSelectorValue?(): TSelectorValue;
    exportSelectorExtraValues?(): TSelectorExtraValues;
}
