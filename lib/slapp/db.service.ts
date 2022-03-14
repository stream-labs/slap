import { RxJsonSchema } from 'rxdb/dist/types/types';
import { RxCollection } from 'rxdb/dist/types/types/rx-collection';
import { ExtractDocumentTypeFromTypedRxJsonSchema, RxDocument, toTypedRxJsonSchema } from 'rxdb';
import { createServerDb } from './createServerDb';
import { Store } from '../store';
import { createInjector, inject, injectScope } from '../scope/injector';
import { Dict } from '../scope';
import { Provider } from '../scope/provider';

export class DBService {
  db!: Awaited<ReturnType<typeof createServerDb>>;
  scope = injectScope();
  store = inject(Store); // use store as a cache storage for DB

  async loadServicesState() {
    this.db = await createServerDb();
    // await this.db.addCollections({
    //   services: {
    //     schema: {
    //       title: 'Services state',
    //       description: 'Keeps the state for created services',
    //       version: 0,
    //       primaryKey: 'name',
    //       type: 'object',
    //       properties: {
    //         name: { type: 'string' },
    //         state: { type: 'object' },
    //       },
    //       required: ['name'],
    //     },
    //   },
    // } as const);
    //
    // // const store = this.services.Store;
    // const store = this.store;
    //
    // // sync Store with db on mutation
    // store.onMutation.subscribe(mutation => {
    //   const provider = this.scope.resolveProvider(mutation.module);
    //   const { stateDoc } = getRxdbMetadata(provider);
    //   stateDoc.atomicPatch({ state: provider.instance.state });
    // });
    //
    // // initialize rxdb metadata
    // this.scope.events.on('onModuleRegister', async provider => {
    //   console.log('Register module', provider.name);
    //   updateRxdbMetadata(provider, { schemas: {} });
    // });
    //
    // // load initial services state to the db
    // this.scope.events.on('onModuleInit', async provider => {
    //   const instance = provider.instance;
    //   console.log('Load state for service', provider.name);
    //
    //   const stateDoc = await this.db.collections.services.upsert({
    //     name: provider.name,
    //     state: instance.state,
    //   });
    //
    //   updateRxdbMetadata(provider, { stateDoc });
    // });
  }

  pendingCollections: Dict<Promise<RxCollection> | null> = {};
  collections: Dict<RxCollection> = {};

  async resolveCollection<T>(schema: RxJsonSchema<T> & {name: string}): Promise<RxCollection> {
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

// export class CollectionInjector extends Injector<any, any>{
//
//   init() {
//     // start creating the collection in DB
//     const db = provider.scope.resolve(DBService);
//     const promise = db.resolveCollection(schemaInfo.schema);
//     let collection: RxCollection<TDoc> = null!;
//     promise.then(value => collection = value);
//   }
//
// }

export type TSchemaInfo<TSchema extends RxJsonSchema<any>, TDoc> = {
  schema: TSchema & {name: string},
  docType: TDoc
}

export type TCollectionInfo<TSchema extends RxJsonSchema<any>, TDoc> = {
  items: RxCollection<TDoc>;
  schemaInfo: TSchemaInfo<TSchema, TDoc>
}

export const CollectionInjectorType = Symbol('collectionInjector');

export function injectCollection<TSchema extends RxJsonSchema<any>, TDoc>(schemaInfo: TSchemaInfo<TSchema, TDoc>): TCollectionInfo<TSchema, TDoc> {
  return createInjector(injector => {

    // start creating the collection in DB
    const scope = injector.provider.scope;
    const db = scope.resolve(DBService);
    const promise = db.resolveCollection(schemaInfo.schema);
    const result: TCollectionInfo<TSchema, TDoc> = {
      items: null as any as RxCollection<TDoc>,
      schemaInfo,
    };
    promise.then(value => result.items = value);

    return {
      type: CollectionInjectorType,
      load() {
        return promise;
      },
      getValue() {
        return result;
      },
    };
  });
}

export interface IRxDbMetadata {
  stateDoc: RxDocument;
  schemas: Record<string, RxJsonSchema<any>>;
  pendingCollections: number;
}

// const metadataKey = 'rxdbMetadata';
//
// export function updateRxdbMetadata(provider: Provider, metadataPatch: Partial<IRxDbMetadata>) {
//   const moduleName = provider.name;
//   const metadata = provider.scope.getMetadata(moduleName, metadataKey) || {};
//   provider.scope.setMetadata(moduleName, metadataKey, { ...metadata, ...metadataPatch });
// }
//
// export function getRxdbMetadata(provider: Provider): IRxDbMetadata {
//   return provider.scope.getMetadata(provider.name, metadataKey);
// }

export function createSchema<T extends RxJsonSchema<any>>(schema: T & {name: string}) {
  // apply types, see https://rxdb.info/tutorials/typescript.html
  const schemaTyped = toTypedRxJsonSchema(schema);
  type TDocument = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;
  return {
    schema,
    docType: null as TDocument,
  };
}
