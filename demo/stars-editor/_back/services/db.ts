import {
  addRxPlugin, createRxDatabase, getRxStoragePouch, addPouchPlugin, removeRxDatabase,
} from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

// import { RxDBReplicationCouchDBPlugin } from 'rxdb/dist/types/plugins/replication-couchdb';
import adapteridb from 'pouchdb-adapter-idb';
import { Subject } from '../../../lib/scope';
// import * as adapterhttp from 'pouchdb-adapter-http';
// import * as adapterMemory from 'pouchdb-adapter-memory';

const userSchema = {
  title: 'hero schema',
  description: 'describes a simple hero',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
  },
  required: [
    'id',
    'name',
    'color',
  ],
};

export class DBService {
  db!: Awaited<ReturnType<DBService['createDB']>>;

  async init() {
    // await removeRxDatabase('heroesreactdb', getRxStoragePouch('idb'));
    await this.createDB();
    this.createInitialState();
  }

  async createDB() {
    console.log('DatabaseService: creating database..');

    // addRxPlugin(RxDBReplicationCouchDBPlugin);
    // addPouchPlugin(adapterhttp);
    // addPouchPlugin(adapterMemory);
    // addRxPlugin(RxDBDevModePlugin);
    addPouchPlugin(adapteridb);

    const db = await createRxDatabase({
      name: 'heroesreactdb',
      storage: getRxStoragePouch('idb'),
    });
    console.log('DatabaseService: created database');
    (window as any).db = db; // write to window for debugging

    // show leadership in title
    db.waitForLeadership().then(() => {
      console.log('isLeader now');
      document.title = '♛ ' + document.title;
    });

    // create collections
    console.log('DatabaseService: create collections');
    const collections = await db.addCollections({
      users: {
        schema: userSchema,
      },
    });

    this.db = db;
    this.onReady.next(db);

    collections.users.$.subscribe(change => {
      console.log('user collection has changed', change);
    });

    return db;
  }

  createInitialState() {
    this.db.collections.users.atomicUpsert({
      id: '1',
      name: 'User 1',
      color: 'green',
    });
  }

  onReady = new Subject<DBService['db']>();
}
