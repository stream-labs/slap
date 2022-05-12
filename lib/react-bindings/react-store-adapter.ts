import { unstable_batchedUpdates } from 'react-dom';
import { Dict, Provider } from '../scope';
import { Store } from '../store/Store';
import { inject } from '../scope/injector';
import { StateView } from '../store';
import { isSimilar } from '../utils';

export class ReactStoreAdapter {

  store = inject(Store);
  components = {} as Dict<ComponentView>;

  registerComponent(moduleView: StateView, componentId: string, forceUpdate: Function, provider: Provider<any>, storeAdapter: ReactStoreAdapter): ComponentView {
    const componentView = new ComponentView(this.store, moduleView, componentId, forceUpdate, provider, storeAdapter);
    this.components[componentId] = componentView;
    return componentView;
  }

  destroyComponent(componentId: string) {
    const componentView = this.components[componentId];
    if (!componentView) return;
    componentView.setDestroyed();
    delete this.components[componentId];
  }

  init() {
    this.store.events.on('onReadyToRender', () => this.updateUI());
  }

  watchers = {} as Record<string, Function>;

  watchersOrder = [] as string[];

  createWatcher(watcherId: string, cb: Function) {
    this.watchersOrder.push(watcherId);
    this.watchers[watcherId] = cb;
    return watcherId;
  }

  removeWatcher(watcherId: string) {
    const ind = this.watchersOrder.findIndex(id => watcherId === id);
    this.watchersOrder.splice(ind, 1);
    delete this.watchers[watcherId];
  }

  updateIsInProgress = false;

  updateUI() {
    if (this.updateIsInProgress) {
      console.error('Tried to update component state before component has been mounted.');
    }
    const watchersIds = [...this.watchersOrder];

    this.updateIsInProgress = true;
    try {
      // force update components
      unstable_batchedUpdates(() => {
        watchersIds.forEach(id => {
          this.watchers[id] && this.watchers[id]();
          const component = this.components[id];
          if (component.needUpdate()) {
            component.forceUpdate();
            component.setInvalidated(false);
          }
        });
      });
    } finally {
      this.updateIsInProgress = false;
    }

  }
}

export type ComponentSnapshot = {
  affectedModules: Dict<number>;
  props: Dict<any>;
}

export class ComponentView {
  public isDestroyed = false;
  public isMounted = false;
  public isInvalidated = false;

  lastSnapshot: ComponentSnapshot = {
    affectedModules: {} as Dict<number>,
    props: null as any,
  };

  constructor(public store: Store, public stateView: StateView, public id: string, public forceUpdate: Function, public provider: Provider<any>, public storeAdapter: ReactStoreAdapter) {
  }

  makeSnapshot(): ComponentSnapshot {
    const snapshot = {
      affectedModules: {},
      props: {},
    };

    snapshot.affectedModules = this.store.listenAffectedModules(() => {
      snapshot.props = this.stateView.getSnapshot();
    });

    this.lastSnapshot = snapshot;
    return snapshot;
  }

  // startListeningStoreChanges(provider: Provider<any>, component: ComponentView, reactStore: ReactStoreAdapter) {
  //   const stateView = component.stateView;
  //   if (!stateView.hasSelectedProps) return;
  //
  //   component.makeSnapshot();
  //
  //   const watcherId = reactStore.createWatcher(component.id, () => {
  //
  //     if (provider.isDestroyed) return;
  //
  //     const shouldUpdate = component.shouldComponentUpdate();
  //     if (shouldUpdate) {
  //       component.setInvalidated(true);
  //     }
  //   });
  // }

  needUpdate() {
    return this.isInvalidated && this.isMounted && !this.isDestroyed;
  }

  setMounted() {
    this.isMounted = true;
  }

  setInvalidated(invalidated: boolean) {
    this.isInvalidated = invalidated;
  }

  setDestroyed() {
    this.isDestroyed = true;
    this.isMounted = false;
  }

  private defaultShouldComponentUpdate(): boolean {
    const prevSnapshot = this.lastSnapshot;
    const prevAffectedModules = Object.keys(prevSnapshot.affectedModules);
    let modulesChanged = false;
    for (const moduleName of prevAffectedModules) {
      if (prevSnapshot.affectedModules[moduleName] !== this.store.modulesMetadata[moduleName]?.rev) {
        modulesChanged = true;
        break;
      }
    }
    if (!modulesChanged) return false;

    const newSnapshot = this.makeSnapshot();

    if (isSimilar(prevSnapshot.affectedModules, newSnapshot.affectedModules)) {
      // no modules changed, do not call compare props
      return false;
    }

    if (!isSimilar(prevSnapshot.props, newSnapshot.props)) {

      return true;
    }
    return false;
  }

  defaultShouldComponentUpdateCached = () => this.defaultShouldComponentUpdate();

  shouldComponentUpdate(): boolean {
    if (this.customShouldComponentUpdate) {
      return this.customShouldComponentUpdate(this.defaultShouldComponentUpdateCached);
    }
    return this.defaultShouldComponentUpdate();
  }

  private customShouldComponentUpdate: ShouldComponentUpdateFN | null = null;

  setShouldComponentUpdate(shouldUpdateCb: ShouldComponentUpdateFN) {
    this.customShouldComponentUpdate = shouldUpdateCb;
  }
}

export type ShouldComponentUpdateFN = (defaultShouldComponentUpdate: () => boolean) => boolean;
