import React, {
  useContext, useEffect, useMemo, useRef,
} from 'react';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  useForceUpdate,
  useOnCreate,
} from './hooks';
import { merge, TMerge, TMerge3 } from './merge';
import { lockThis } from './lockThis';
import { useSelector } from './useSelector';
import { useResolveModule } from './useResolveModule';
// import { createDependencyWatcher } from './dependency-watcher';
import { Dict, forEach, Scope } from './scope';
import { traverseClassInstance } from './traverseClassInstance';
import { TPromisifyFunctions } from './slapp/interfaces';
import { CollectionQuery, QueryState } from './slapp/query';
import { TCollectionInfo } from './slapp/db.service';
import { Store } from './store';

export const AppScope = React.createContext<Scope|null>(null);

export function useScope() {
  return useContext(AppScope)!;
}


// export type TModuleView<
//   TModule extends Object,
//   TState = TModule extends { state?: any } ? TModule['state'] : null,
//   TView = TModule extends { createView: () => any } ? ReturnType<TModule['createView']> : null,
//   > = TState & TModule & TView


export function createModuleView<TService extends Object>(service: TService): TModuleViewOf<TService> {
  const view = {
    moduleSchema: {},
  } as any;
  const module = service as any;

  // append state and flatten state
  if (module.state) {
    defineGetter(view, 'state', () => module.state);
    traverseClassInstance(module.state, stateKey => {
      view.moduleSchema[stateKey] = 'state';
      defineGetter(view, stateKey, () => module.state[stateKey]);
    });
  }

  // append methods
  traverseClassInstance(service, (propName, descriptor) => {
    const module = service as any;

    if (propName.startsWith('query')) {
      view.moduleSchema[propName] = 'query';
      defineGetter(view, propName, () => module[propName]);
      let queryValueProp = propName.split('query')[1];
      queryValueProp = queryValueProp.charAt(0).toLowerCase() + queryValueProp.slice(1);

      defineGetter(view, queryValueProp, () => (view[propName].state.itemsValues));
      return;
    }

    if (descriptor.get) {
      view.moduleSchema[propName] = 'getter';
      defineGetter(view, propName, () => module[propName]);
      return;
    }
    view[propName] = (...args: any) => module[propName](...args);
  });
  return view as TModuleViewOf<TService>;
}

export interface IModuleView {
  moduleSchema: Dict<'state' | 'getter' | 'getterFunction' | 'query' | 'queryValue'>
}

function defineGetter(target: object, methodName: string, getter: () => any) {
  Object.defineProperty(target, methodName, {
    configurable: true,
    enumerable: true,
    get: getter,
  });
}



export function useComponentView<TModuleView, TReturnType = TModuleView,
  >(moduleView: TModuleView): TReturnType {
  const { selector, componentView } = useOnCreate(() => {
    const componentView = new ComponentView(moduleView);

    function selector() {
      return componentView.getState();
    }

    return { selector, componentView };
  });

  // call selector to make selected props reactive
  useSelector(selector as any);

  // run lifecycle
  useEffect(() => {
    componentView.onMount();
    return () => componentView.onDestroy();
  }, []);

  return componentView as any as TReturnType;
}

export function useModuleView<TModule>(ModuleClass: new(...args: any[]) => TModule) {
  const provider = useResolveModule(ModuleClass);
  const moduleView = useOnCreate(() => {
    return createModuleView(provider.instance!);
  });
  return moduleView;
}


export function useModule<
  TModule,
  TSelectorResult,
  TResult extends TModuleViewOf<TModule> & TSelectorResult
  >
(ModuleClass: new(...args: any[]) => TModule, selectorFn: (view: TModuleViewOf<TModule>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
  const moduleView = useModuleView(ModuleClass);
  const componentView = useComponentView(moduleView, selectorFn) as any;
  return componentView.dependencyWatcherProxy as any as TResult;
}

export class ComponentView<TModuleView extends Object> {
  dependencies: Dict<any> = {};
  dependencyWatcherProxy: any;
  // revision = 0;
  // renderCounter = 0; // use to optimize re-renderings
  // subscriptions: Subscription[] = [];
  // subscriptionValues: Dict<any> = {};

  constructor(public moduleView: TModuleView) {
    this.initDependencyWatcher();
  }

  onMount() {
  }

  onLoad() {
  }

  onDestroy() {
    /// this.subscriptions.forEach(s => s.unsubscribe());
  }

  initDependencyWatcher() {
    const componentView = this;
    const moduleView = this.moduleView as any;
    this.dependencyWatcherProxy = new Proxy(
      {
        _proxyName: 'DependencyWatcher',
        _componentView: componentView,
      },
      {
        get: (target, propName: string) => {
          if (propName === 'hasOwnProperty') return moduleView.hasOwnProperty;
          if (propName in target) return (target as any)[propName];
          const value = this.selectValue(propName);
          return value;
        },
      },
    );
  }

  selectValue(propName: string) {
    const value = this.getValue(propName);
    this.dependencies[propName] = value;
    return value;
  }

  getValue(propName: string) {
    const moduleView = this.moduleView as any;
    if (propName === 'isLoaded') {
      return moduleView.isLoaded;
    }
    const schema = moduleView.moduleSchema;
    if (schema[propName] === 'getter' && !!moduleView.isLoaded) {
      return null;
    }

    return moduleView[propName];
  }

  getState(): Partial<TModuleView> {
    const values: Partial<TModuleView> = {};
    const watchedObjectAny = this.moduleView as any;
    Object.keys(this.dependencies).forEach((propName) => {

      const value = this.dependencies[propName];
      // if one of the dependencies is a Binding then expose its internal dependencies
      if (value && value._proxyName === 'Binding') {
        const bindingMetadata = value._binding;
        Object.keys(bindingMetadata.dependencies).forEach((bindingPropName) => {
          (values as any)[`${bindingPropName}__binding-${bindingMetadata.id}`] = this.dependencies[propName][bindingPropName].value;
        });
        return;
      }
      // if it's not a Binding then just take the value from the watchedObject
      (values as any)[propName] = watchedObjectAny[propName];
    });
    return values;
  }
}


export type TModuleViewOf<
  TService extends Object,
  TState = TService extends { state?: any } ? TService['state'] : {},
  > =
  TState &
  { isLoaded: boolean } &
  PickGetters<TService> &
  PickGetterFunctions<TService> &
  PickAsyncMethods<TService> &
  PickSubjectValues<TService> &
  PickQueryValues<TService> &
  PickControllerViews<TService>

// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];
type WritablePart<T> = Pick<T, WritableKeysOf<T>>;

type FilterConditionally<Source, Condition> = Pick<Source, {[K in keyof Source]: Source[K] extends Condition ? K : never}[keyof Source]>;
type TIsGetterFunctionName<Key> = Key extends `get${string}` ? Key : never;
type TIsControllerFactoryName<Key> = Key extends `${string}Controller` ? Key : never;
type TIsMethodName<T, K extends keyof T> = T[K] extends Function ? K : never;
type TPickFunctions<T> = FilterConditionally<T, Function>
type PickAsyncMethods<T> = TPromisifyFunctions<Omit<TPickFunctions<T>, TIsGetterFunctionName<keyof T>>>;

// type TBehaviorSubjectName<T, Key> = T[Key] extends BehaviorSubject<any>

type PickGetterFunctions<T> = Pick<T, TIsGetterFunctionName<keyof T>>
type PickGetters<T> = Omit<T, WritableKeysOf<T>>;

type Erase$<TStr> = TStr extends `${infer TName}$` ? TName : never;

type TIsBehaviorSubjectName<Key> = Key extends `${string}$` ? Key : never;
type PickBehaviorSubjects<T> = Pick<T, TIsBehaviorSubjectName<keyof T>>
type PickSubjectValues<T> = {[K in keyof T as Erase$<K>]: T[K] extends Observable<infer TValue> ? TValue : never }


type GetQueryName<TStr> = TStr extends `query${infer TName}` ? Uncapitalize<TName> : never;
type TIsQueryName<Key> = Key extends `query${string}` ? Key : never;
type PickQueries<T> = Pick<T, TIsQueryName<keyof T>>;
type PickQueryValues<T> = {[K in keyof T as GetQueryName<K>]: T[K] extends CollectionQuery<infer TDoc> ? TDoc[] : never }

type GetControllerViewName<TStr> = TStr extends `get${infer TName}Controller` ? `get${TName}` : never;
type PickControllerViews<T> = {[K in keyof T as GetControllerViewName<K>]: T[K] extends (...args: infer TArgs) => infer TController ? (...args: TArgs) => TModuleViewOf<TController> : never }

// const obj = {
//   queryUsers: null as any as TCollectionInfo<any, { username: string, address: string }>,
//   getSceneController(id: string) {
//     return new Store();
//   }
// }

// type queryName = 'queryTowns';
// type town = GetQueryName<queryName>
//
// const objResult: PickControllerViews<typeof obj>;
// objResult.getScene(2);
