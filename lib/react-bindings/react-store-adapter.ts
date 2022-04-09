// TODO move to react folder
import { Dict, generateId } from '../scope';
import { Store } from '../store/Store';
import { inject } from '../scope/injector';
import { unstable_batchedUpdates } from 'react-dom';
import { ComponentView } from '../store';

export class ReactStoreAdapter {

  store = inject(Store);

  load() {
    this.store.events.on('onMutation', () => this.onMutation());
  }

  watchers = {} as Record<string, Function>;

  watchersOrder = [] as string[];

  // invalidatedComponents: ComponentView<any>[] = [];

  components: Dict<ComponentView<any>> = {};
  stateIsInvalidated = false;

  createComponent(component: ComponentView<any>) {
    this.components[component.id] = component;
  }

  mountComponent(component: ComponentView<any>) {
    component.mount();
    // if (this.stateIsInvalidated && !this.hasUnmountedComponents()) {
    //   this.updateUI();
    // }
  }

  hasUnmountedComponents() {
    const hasUnmountedComponents = Object.keys(this.components).find(id => {
      const comp = this.components[id];
      return !comp.isMounted && !comp.isDestroyed;
    });
    return hasUnmountedComponents;
  }

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
    // if (this.stateIsInvalidated) return;
    // this.stateIsInvalidated = true;
    //
    // if (!this.hasUnmountedComponents()) {
    //   this.updateUI();
    // }
  }

  updateUI() {
    if (this.updateIsInProgress) {
      throw new Error('Can not update ');
    }
    this.updateIsInProgress = true;
    const watchersIds = [...this.watchersOrder];

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

    // // collect invalidated components
    // watchersIds.forEach(id => this.watchers[id] && this.watchers[id]());
    //
    // // force update components
    // unstable_batchedUpdates(() => {
    //
    //   watchersIds.forEach(id => {
    //     this.components[id].needUpdate() && this.components[id].forceUpdate()
    //   });
    // });

    this.stateIsInvalidated = false;
    this.updateIsInProgress = false;
  }
}
