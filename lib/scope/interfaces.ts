import { Injector, IProviderOptions, Scope } from './scope';
import { Dict } from './utils';

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

export type TProvider = {
  factory: TModuleClass,
  instance: InstanceType<TModuleClass>,
  name: string,
  initParams: any[], // TODO do we need that?
  scope: Scope,
  options: IProviderOptions, // TODO delegate Scope options
  injectors: Dict<Injector<unknown>>,

  // lifecycle flags
  initCompleted: boolean,
  injectionCompleted: boolean,
  isLoaded: boolean,

  readonly metadata: Record<string, any>,
}
