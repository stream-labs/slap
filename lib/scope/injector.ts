import { InjectableModuleTyped, TModuleClass } from './interfaces';
import { getCurrentProvider, getCurrentScope } from './scope';
import { Provider } from './provider';

export function inject<T extends TModuleClass>(ModuleClass: T) {
  const provider = injectProvider();
  const module = provider.injectModule(ModuleClass);
  return module;
}

export function injectScope() {
  return getCurrentScope()!;
}

export function injectProvider(): Provider<any> {
  return getCurrentProvider()!;
}

export type InjectedProp<TValue, TSelectorValue, TSelectorExtraValues> =
  TValue & { __injector: InjectableModuleTyped<TValue, TSelectorValue, TSelectorExtraValues> }
