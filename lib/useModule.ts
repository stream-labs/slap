import React, {
  useContext, useEffect, useMemo, useRef,
} from 'react';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  useForceUpdate,
  useOnCreate,
} from './hooks';
import {
  TPromisifyFunctions,
} from './store';
import { merge, TMerge, TMerge3 } from './merge';
import { lockThis } from './lockThis';
import { useSelector } from './useSelector';
import { useProvider } from './useProvider';
// import { createDependencyWatcher } from './dependency-watcher';
import { Dict, forEach, Scope } from './scope';
import { IModuleView } from '../demo/stars-editor/services/users.service';

export const AppScope = React.createContext<Scope|null>(null);

export function useScope() {
  return useContext(AppScope)!;
}

// export type TModuleView<TModule extends Object, TState = TModule extends { state?: any } ? TModule['state'] : null> = TMerge<TState, TModule>;

export type TModuleView<
  TModule extends Object,
  TState = TModule extends { state?: any } ? TModule['state'] : null,
  TView = TModule extends { createView: () => any } ? ReturnType<TModule['createView']> : null,
  > = TMerge3<TState, TModule, TView>;

export function createModuleView<TModule>(module: TModule): TModuleView<TModule> {
  if ('createView' in (module as any)) {
    const lockedModule = (module as any).createView(); // lockThis((module as any).view as any);
    return lockedModule;
  }
  const lockedModule = lockThis(module as any);
  const mergedModule = (module as any).state ? merge([
    // allow to select variables from the module's state
    () => (module as any).state,
    // allow to select getters and actions from the module
    lockedModule,
  ]) : lockedModule;
  return mergedModule as any as TModuleView<TModule>;
}

// export function useComponentView<TModuleView extends Object, TExtendedView, TReturnType = TMerge<TModuleView, TExtendedView>,
//   >(module: TModuleView, extend?: (module: TModuleView) => TExtendedView): TReturnType {
//   const { selector, dependencyWatcher } = useOnCreate(() => {
//     const observableObject = extend ? merge([module, extend(module)]) : module;
//     const dependencyWatcher = createDependencyWatcher(observableObject);
//
//     function selector() {
//       return dependencyWatcher.getDependentValues();
//     }
//
//     return { selector, dependencyWatcher };
//   });
//
//   // call selector to make selected props reactive
//   useSelector(selector as any);
//
//   const foreUpdate = useForceUpdate();
//
//   useEffect(() => {
//     const subjects = dependencyWatcher.getBehaviorSubjects();
//     const subscriptions = Object.keys(subjects).map(name => subjects[name].subscribe(v => {
//       console.log('force update', v);
//       foreUpdate();
//     }));
//     return () => {
//       subscriptions.map(s => s.unsubscribe());
//     };
//   }, []);
//
//   return dependencyWatcher.watcherProxy as any as TReturnType;
// }

export function useComponentView<TModuleView extends Object, TExtendedView, TReturnType = TMerge<TModuleView, TExtendedView>,
  >(module: TModuleView, extend?: (module: TModuleView) => TExtendedView): TReturnType {
  const isLoadedRef = useRef(false);
  const forceUpdate = useForceUpdate();
  const { selector, componentView } = useOnCreate(() => {
    const componentView = new ComponentView(module, forceUpdate);

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

  // run onLoad hook
  if (!isLoadedRef.current && (componentView.moduleView as any).isLoaded) {
    isLoadedRef.current = true;
    componentView.onLoad();
  }

  return componentView.dependencyWatcherProxy as any as TReturnType;
}

export function useModule<
  TModule,
  TSelectorResult,
  TResult extends TMerge3<TModuleView<TModule>, TSelectorResult, {_revision: number, _renderingCount: number}>
  >
(ModuleClass: new(...args: any[]) => TModule, selectorFn: (view: TModuleView<TModule>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
  const moduleMetadata = useProvider(ModuleClass);
  const selectResult = useComponentView(moduleMetadata.view, selectorFn);
  return selectResult as any as TResult;
}

export class ComponentView<TModuleView extends Object> {
  dependencies: Dict<any> = {};
  dependencyWatcherProxy: any;
  revision = 0;
  renderCounter = 0; // use to optimize re-renderings
  subscriptions: Subscription[] = [];
  subscriptionValues: Dict<any> = {};

  constructor(public moduleView: TModuleView, public forceUpdate: () => void) {
    this.initDependencyWatcher();
  }

  onMount() {
  }

  onLoad() {
    const state = this.getState() as any;
    const moduleView = this.moduleView as any;
    const schema = moduleView.moduleSchema;
    this.subscriptions = Object.keys(state)
      .filter(prop => schema[prop + '$'] === 'behaviorSubject')
      .map(prop => moduleView[prop + '$'].subscribe((newValue: any) => {
        const prevValue = this.subscriptionValues[prop];
        if (prevValue === newValue) return;
        this.subscriptionValues[prop] = newValue;
        this.forceUpdate();
      }));
  }

  onDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
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
          const value = this.getValue(propName);
          this.dependencies[propName] = value;
          return value;
        },
      },
    );
  }

  getValue(propName: string) {
    const moduleView = this.moduleView as any;
    if (propName === 'isLoaded') {
      return moduleView.isLoaded;
    }
    if (!moduleView.isLoaded) return null;
    if (propName === '_revision') return this.revision;
    if (propName === '_renderCounter') return this.renderCounter;
    if (propName in this.subscriptionValues) return this.subscriptionValues[propName];
    return moduleView[propName];
  }

  getState(): Partial<TModuleView> {
    const values: Partial<TModuleView> = {};
    const watchedObjectAny = this.moduleView as any;
    Object.keys(this.dependencies).forEach((propName) => {
      if (!watchedObjectAny.isLoaded && propName !== 'isLoaded') {
        (values as any)[propName] = null;
        return;
      }

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
    (values as any)._revision = this.revision;
    return values;
  }
}
