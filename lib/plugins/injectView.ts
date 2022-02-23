import {
  assertInjectIsAllowed, assertIsDefined,
  getCurrentScope,
  Scope,
  TModuleConstructorMap,
} from '../scope';
import { lockThis } from '../lockThis';
import { merge, TMerge3, unwrapState } from '../merge';
import { getModuleMutations, TPromisifyFunctions } from '../store';
import { RemoteStoreClient } from './RemoteStoreClient';

export type TServiceViews<T extends { [key: string]: new (...args: any) => any }> = {
  [P in keyof T]: InstanceType<T[P]>['view'];
};

export function injectViews<T extends TModuleConstructorMap>(dependencies: T): TServiceViews<T> {
  assertInjectIsAllowed();
  const scope: Scope = getCurrentScope()!;
  const depsProxy = { _scope: scope };
  Object.keys(dependencies).forEach(moduleName => {
    const ModuleClass = dependencies[moduleName];
    Object.defineProperty(depsProxy, moduleName, {
      get: () => {
        // @ts-ignore
        return scope.resolve(ModuleClass).view;
      },
    });
  });

  return depsProxy as any as TServiceViews<T>;
}
//
// export function createViewScheme(GettersConstructor, ControllerConstructor) {
//
// }


