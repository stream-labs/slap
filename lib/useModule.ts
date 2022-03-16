import React, {
  useContext, useEffect, useMemo, useRef,
} from 'react';
import {
  useOnCreate,
} from './hooks';
import { useSelector } from './useSelector';
import { useModuleInstance } from './useResolveModule';
import { Dict, Scope } from './scope';
import { TPromisifyFunctions } from './slapp/interfaces';
import { CollectionQuery } from './slapp/query';
import { buildModuleView } from './slapp/module-view/module-view';
import { ModuleViewBuilder } from './slapp/module-view/module-view-builder';

export const AppScope = React.createContext<Scope|null>(null);

export function useScope() {
  return useContext(AppScope)!;
}

export function useComponentView<TModuleView>(moduleView: TModuleView) {
  const { selector, componentView } = useOnCreate(() => {
    const componentView = new ComponentView(moduleView);

    function selector() {
      return componentView.getState();
    }

    return { selector, componentView };
  });

  // call selector to make selected props reactive
  useSelector(selector as any);

  // // run lifecycle
  // useEffect(() => {
  //   componentView.onMount();
  //   return () => componentView.onDestroy();
  // }, []);

  return componentView;
}

export function useModuleView<TModule>(ModuleClass: TModule) {
  const instance = useModuleInstance(ModuleClass);
  const moduleView = useOnCreate(() => {
    return buildModuleView(instance).view;
  });
  return moduleView;
}

export function useModule<TModule>(ModuleClass: TModule) {
  const moduleView = useModuleView(ModuleClass);
  const componentView = useComponentView(moduleView);
  return componentView.dependencyWatcherProxy;
}

export function useExtendedView<TModule, TExtendedProps extends Dict<any>>(module: TModule, extendedPropsConstructor: (module: TModule) => TExtendedProps) {
  const moduleView = useOnCreate(() => {
    return new ModuleViewBuilder<TModule>(module).extend(extendedPropsConstructor).view;
  });
  const componentView = useComponentView(moduleView);
  return componentView.dependencyWatcherProxy;
}

type TComponentView<TModuleView> = TModuleView & { extend<TExtendedProps extends Dict<any>>(extendedPropsCreator: (view: TModuleView) => TExtendedProps): TComponentView<TModuleView & TExtendedProps> }

export class ComponentView<TModuleView extends Object> {
  dependencies: Dict<any> = {};
  dependencyWatcherProxy!: TComponentView<TModuleView>;
  hasObservers = false;

  extend = useExtendedView;

  constructor(public moduleView: TModuleView) {
    this.initDependencyWatcher();
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
          if (propName === 'extend') return this.extend;
          const value = this.selectValue(propName);
          return value;
        },
      },
    ) as any;
  }

  selectValue(propName: string) {
    const value = this.getValue(propName);
    this.dependencies[propName] = value;
    if (this.hasObservers) this.hasObservers = true;
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
    if (this.hasObservers) return null as any;

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

// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
export type IfEquals<X, Y, A, B> =
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

// type TIsBehaviorSubjectName<Key> = Key extends `${string}$` ? Key : never;
// type PickBehaviorSubjects<T> = Pick<T, TIsBehaviorSubjectName<keyof T>>
// type PickSubjectValues<T> = {[K in keyof T as Erase$<K>]: T[K] extends Observable<infer TValue> ? TValue : never }

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
