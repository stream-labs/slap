import { unstable_batchedUpdates } from 'react-dom';
import { Dict } from '../scope';
import { Store } from '../store/Store';
import { inject } from '../scope/injector';
import { StateView } from '../store';

export class ReactStoreAdapter {

  store = inject(Store);
  components = {} as Dict<ComponentView>;

  registerComponent(moduleView: StateView, componentId: string, forceUpdate: Function): ComponentView {
    const componentView = new ComponentView(this.store, moduleView, componentId, forceUpdate);
    this.components[componentId] = componentView;
    return componentView;
  }

  destroyComponent(componentId: string) {
    const componentView = this.components[componentId];
    if (!componentView) return;
    componentView.setDestroyed();
    delete this.components[componentId];
  }

  load() {
    this.store.events.on('onAfterMutations', () => this.onMutation());
  }

  watchers = {} as Record<string, Function>;

  watchersOrder = [] as string[];

  // TODO: rename to mount-component ?
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

  onMutation() {
    this.updateUI();
  }

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

export class ComponentView {
  public isDestroyed = false;
  public isMounted = false;
  public isInvalidated = false;

  lastSnapshot = {
    affectedModules: {} as Dict<number>,
    props: null as unknown,
  };

  constructor(public store: Store, public stateView: StateView, public id: string, public forceUpdate: Function) {
  }

  makeSnapshot() {
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
}
