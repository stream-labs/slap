import { DBService } from './db.service';
import { Store } from '../store';
import { injectScope } from '../scope/injector';

export class BootstrapService {
  scope = injectScope();

  constructor(protected EntryService: any) {}

  async load() {
    // const store = this.scope.start(Store);
    // // store.setIsReady(false); // prevent rendering until DB is not initialized
    // const db = this.scope.start(DBService);
    // await db.loadServicesState();
    // this.scope.start(this.EntryService);
    // // store.setIsReady(true); // allow rendering
  }
}
