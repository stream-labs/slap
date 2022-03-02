import { RxSchema } from 'rxdb';
import { BehaviorSubject } from 'rxjs';
import { RxJsonSchema } from 'rxdb/dist/types/types';
import { RxCollection } from 'rxdb/dist/types/types/rx-collection';
import {
  assertInjectIsAllowed, getCurrentProvider, Scope, TInstances, TModuleConstructorMap, TProvider,
} from '../scope';
import { DBService } from './db.service';

const metadataKey = 'rxdbMetadata';

// export function injectCollection11(schema: RxJsonSchema<any> & {name: string}): Scope {
//   assertInjectIsAllowed();
//   const provider = getCurrentProvider()!;
//   const name = schema.name;
//   const { schemas, pendingCollections } = getRxdbMetadata(provider);
//   const dbService = provider.scope.resolve(DBService);
//   const taskName = `load_collection__${name}`;
//
//   updateRxdbMetadata(provider, { schemas: { ...schemas, [name]: schema }, pendingCollections: pendingCollections + 1 });
//   dbService.resolveCollection(schema).then();
//   const moduleCollections = provider.metadata.dbcollections;
//
//   return Symbol(taskName);
// }

export function injectCollections(schemas: Record<string, RxJsonSchema<any> & {name: string}>) {
  assertInjectIsAllowed();
  const provider = getCurrentProvider()!;
  const { scope } = provider;
  const dbService = provider.scope.resolve(DBService);
  updateRxdbMetadata(provider, { schemas });

  const collectionsProxy = { };
  Object.keys(schemas).forEach(schemaName => {
    const schema = schemas[schemaName];
    const taskName = `load_collection__${schemaName}`;

    scope.startTask(provider.name, taskName);
    dbService.resolveCollection(schema).then(collection => {
      scope.completeTask(provider.name, taskName);
    });

    Object.defineProperty(collectionsProxy, schemaName, {
      get: () => {
        // @ts-ignore
        return dbService.collections[schemaName];
      },
    });
  });

  return collectionsProxy as Record<string, RxCollection>;
}

export interface IRxDbMetadata {
  state$: BehaviorSubject<any>;
  schemas: Record<string, RxJsonSchema<any>>;
  pendingCollections: number;
}

export function updateRxdbMetadata(provider: TProvider, metadataPatch: Partial<IRxDbMetadata>) {
  const moduleName = provider.name;
  const metadata = provider.scope.getMetadata(moduleName, metadataKey) || {};
  provider.scope.setMetadata(moduleName, metadataKey, { ...metadata, ...metadataPatch });
}

export function getRxdbMetadata(provider: TProvider): IRxDbMetadata {
  return provider.scope.getMetadata(provider.name, metadataKey);
}
