// TODO move to react folder
import { generateId } from '../scope';
import { Store } from '../store';
import { inject } from '../scope/injector';
import { unstable_batchedUpdates } from 'react-dom';

export class ReactStoreAdapter {

  store = inject(Store);

  load() {
    this.store.events.on('onMutation', () => this.updateUI());
  }

  watchers = {} as Record<string, Function>;

  watchersOrder = [] as string[];

  // TODO: rename to register-component ?
  createWatcher(cb: Function) {
    const watcherId = generateId();
    this.watchersOrder.push(watcherId);
    this.watchers[watcherId] = cb;
    return watcherId;
  }

  removeWatcher(watcherId: string) {
    const ind = this.watchersOrder.findIndex(id => watcherId === id);
    this.watchersOrder.splice(ind, 1);
    delete this.watchers[watcherId];
  }

  updateUI() {
    // TODO: add batching here?
    const watchersIds = [...this.watchersOrder];
    unstable_batchedUpdates(() => {
      watchersIds.forEach(id => this.watchers[id] && this.watchers[id]());
    });
  }
}
