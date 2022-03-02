import { inject, Subject, TModuleConstructorMap } from '../scope';
import { Mutation, Store } from '../store';

/**
 * Isolates Store
 */
export class RemoteStore {
  services = inject({ Store });
  onMutation = new Subject<Mutation>();

  constructor(public remoteServices: TModuleConstructorMap) {
  }

  init() {
    this.services.Store.onMutation.subscribe(mutation => {
      const serviceName = mutation.type.split('.')[0];
      if (this.remoteServices[serviceName]) this.onMutation.next(mutation);
    });
  }

  getBulkState() {
    const bulkState: Record<string, any> = {};
    const store = this.services.Store;
    const scopeId = store.scope.id;
    Object.keys(this.remoteServices).forEach(moduleName => {
      if (moduleName === 'RemoteStore') return;
      bulkState[moduleName] = store.state.modules[moduleName][scopeId];
    });
    return bulkState;
  }
}
