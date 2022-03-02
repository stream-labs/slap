import { TMerge, TMerge3, TMerge4 } from '../merge';
import { useProvider } from '../useProvider';
import { TModuleView, useSelectFrom } from '../useModule';
import { TPromisifyFunctions } from '../store';
import { AConstructorTypeOf, RemoteStoreClient } from './RemoteStoreClient';
import { Scope } from '../scope';
import { lockThis } from '../lockThis';
import { traverseClassInstance } from '../traverseClassInstance';

export function useService<
  TModule,
  TSelectorResult,
  TResult extends TMerge<TServiceView<TModule>, TSelectorResult>
  >
(ModuleClass: new(...args: any[]) => TModule, selectorFn: (view: TServiceView<TModule>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
  const moduleMetadata = useProvider(ModuleClass, (instance: any) => createView({
    path: ModuleClass.name,
    controllerClass: ModuleClass,
    stateGetter: 'state' in instance ? () => instance.state : undefined,
    viewFactoryClass: undefined,
    gettersClass: undefined,
    shouldCache: true,
    scope: instance._scope,
    args: [],
  }));
  const selectResult = useSelectFrom(moduleMetadata.view, selectorFn);
  return selectResult as TResult;
}

export type TServiceView<
  TModule,
  TState = TModule extends { state?: any } ? TModule['state'] : null,
  TView = TModule extends { createView: () => any } ? ReturnType<TModule['createView']> : TMerge<TState, TPromisifyFunctions<TModule>>,
  > = TView;

// const sv: TServiceView<AppService> = null as any;
// sv.activePage



export function createView<
  TController extends Object, // remote methods
  TGetters extends { state: any }, // local methods
  TState,
  TViewFactory,
  TMergedView = TMerge4<TState, TPromisifyFunctions<TController>, TGetters, TViewFactory>,
  TResult = TMergedView
  >
(params: {
  path: string | any[],
  stateGetter?: () => TState,
  controllerClass: AConstructorTypeOf<TController>,
  gettersClass?: AConstructorTypeOf<TGetters>,
  viewFactoryClass?: AConstructorTypeOf<TViewFactory>,
  scope: Scope,
  shouldCache: boolean,
  args: ConstructorParameters<AConstructorTypeOf<TController>>
}) {
  // const scope = (controller as any)._scope as Scope;

  const {
    path,
    shouldCache,
    controllerClass,
    stateGetter,
    gettersClass,
    viewFactoryClass,
    args,
    scope,
  } = params;

  if (shouldCache) {
    const cachedView = scope.resolveProvider(controllerClass).cache.view;
    if (cachedView) return cachedView as TResult;
  }

  const state = (stateGetter && (stateGetter() as any)) || {};
  const controllerMethods = lockThis(controllerClass.prototype);
  const gettersInstance = gettersClass && scope.create(gettersClass, ...args) as any;
  const viewFactory = viewFactoryClass && scope.create(viewFactoryClass, ...args) as any;
  const result = gettersInstance || {};

  const api = scope.getInstance(RemoteStoreClient)?.api;
  if (!api) throw new Error('API is not connected');

  Object.keys(controllerMethods).forEach(methodName => {
    // if (typeof (controllerMethods as any)[methodName] !== 'function') return;
    if (gettersInstance && methodName in gettersInstance) return;
    Object.defineProperty(result, methodName, {
      configurable: true,
      enumerable: true,
      get: () => {
        return (...args: any) => api.request(path, methodName, ...args);
      },
    });
  });

  if (stateGetter) {
    traverseClassInstance(state, methodName => {
      // console.log('create factory method', methodName);
      Object.defineProperty(result, methodName, {
        configurable: true,
        enumerable: true,
        get: () => {
          return (stateGetter() as any)[methodName];
        },
      });
    });

    Object.defineProperty(result, 'state', {
      configurable: true,
      enumerable: true,
      get: () => {
        return stateGetter();
      },
    });
  }

  if (viewFactory) {
    traverseClassInstance(viewFactory, methodName => {
      // console.log('create factory method', methodName);
      Object.defineProperty(result, methodName, {
        configurable: true,
        enumerable: true,
        get: () => {
          return viewFactory[methodName];
        },
      });
    });
  }

  const lockedResult = lockThis(result, viewFactory);
  if (shouldCache) {
    scope.resolveProvider(controllerClass).cache.view = lockedResult;
  }
  return lockedResult as any as TResult;
}
