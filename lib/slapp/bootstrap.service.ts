import { injectScope } from '../scope';
import { DBService } from './db.service';
import { mutation, Store } from '../store';

export class BootstrapService {
  scope = injectScope();

  state = {
    isReady: false,
  };

  constructor(protected EntryService: any) {
  }

  async init() {
    const store = this.scope.start(Store);
    store.setIsReady(false); // prevent rendering until DB is not initialized
    const db = this.scope.start(DBService);
    await db.loadServicesState();
    this.scope.start(this.EntryService);
    store.setIsReady(true); // allow rendering
  }

  @mutation()
  setReady() {
    this.state.isReady = true;
  }
}
