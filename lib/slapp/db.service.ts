import { RxJsonSchema } from 'rxdb/dist/types/types';
import { RxCollection } from 'rxdb/dist/types/types/rx-collection';
import { createServerDb } from './createServerDb';
import { Dict, inject, injectScope } from '../scope';
import { Store } from '../store';
import { getRxdbMetadata, updateRxdbMetadata } from './injectors';

export class DBService {
  db!: Awaited<ReturnType<typeof createServerDb>>;

  scope = injectScope();

  services = inject({ Store });

  async loadServicesState() {
    this.db = await createServerDb();
    await this.db.addCollections({
      services: {
        schema: {
          title: 'Services state',
          description: 'Keeps the state for created services',
          version: 0,
          primaryKey: 'name',
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            state: {
              type: 'object',
            },
          },
          required: [
            'name',
          ],
        },
      },
    });

    const store = this.services.Store;

    // sync Store with db on mutation
    store.onMutation.subscribe(mutation => {
      const provider = this.scope.resolveProvider(mutation.module);
      const { state$ } = getRxdbMetadata(provider);
      state$.next(provider.instance.state);
    });

    // initialize rxdb metadata
    this.scope.events.on('onModuleRegister', async provider => {
      console.log('Register module', provider.name);
      updateRxdbMetadata(provider, { schemas: {} });
    });

    // load initial services state to the db
    this.scope.events.on('onModuleInit', async provider => {
      const instance = provider.instance;
      console.log('Load state for service', provider.name);

      const state$ = await this.db.collections.services.upsert({
        name: provider.name,
        state: instance.state,
      });
      updateRxdbMetadata(provider, { state$ });
    });
  }

  pendingCollections: Dict<Promise<RxCollection> | null> = {};
  collections: Dict<RxCollection> = {};

  async resolveCollection(schema: RxJsonSchema<any> & {name: string}): Promise<RxCollection> {
    const name = schema.name;
    console.log('create collection', name);
    if (this.collections[name]) return Promise.resolve(this.collections[name]);
    if (this.pendingCollections[name]) return this.pendingCollections[name]!;
    const promise = new Promise<any>(r => {
      this.db.addCollections({ [schema.name]: { schema } }).then(collections => r(collections[schema.name]));
    });

    this.pendingCollections[name] = promise as any;
    promise.then(collection => {
      this.collections[name] = collection;
      delete this.pendingCollections[name];
    });
    return promise;
  }
}
