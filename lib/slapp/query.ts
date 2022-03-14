import { RxCollection } from 'rxdb/dist/types/types/rx-collection';
import { Subscription } from 'rxjs';
import { Store, TStateControllerFor } from '../store';
import { createInjector, Injector } from '../scope/injector';
import { CollectionInjectorType, TCollectionInfo } from './db.service';
import { Dict } from '../scope';

export class QueryState<TDoc> {

  state = {

    // define loading statuses
    isLoading: false,
    isLoaded: false,
    error: null as unknown,

    itemsValues: [] as TDoc[],
    itemsMap: {} as Dict<TDoc>,
    filter: null as Object | null,

    // define state revisions
    // rev numbers help to quickly detect changes in the state
    // without iterating across all the state object
    collectionRev: 0, // increments when add/remove items
    itemsRev: 0, // increments when update items
  };

  setValues(values: TDoc[]) {
    this.state.itemsValues = values;
    const itemsMap = {} as Dict<TDoc>;
    values.forEach(value => itemsMap[(value as any).id] = value);
    this.state.itemsMap = itemsMap;
  }

  setItem(key: string, value: TDoc) {
    this.state.itemsMap[key] = value;
    this.state.itemsRev++;
  }

  addItem(key: string, value: TDoc) {
    this.state.itemsValues.push(value);
    this.state.itemsMap[key] = value;
    this.state.collectionRev++;
  }

  removeItem(key: string) {
    // TODO optimize
    const itemsValues = this.state.itemsValues;
    this.state.itemsValues = itemsValues.filter(val => (val as any).id !== key);
    delete this.state.itemsMap[key];
    this.state.collectionRev++;
  }

  setFilter(filter: Object) {
    this.state.filter = filter;
  }

  setIsLoading(isLoading: boolean) {
    this.state.isLoading = isLoading;
  }

  setIsLoaded(isLoaded: boolean) {
    this.state.isLoaded = isLoaded;
  }

  setError(error: unknown) {
    this.state.error = error;
  }
}

export class CollectionQuery<TDoc> {

  collection!: TCollectionInfo<any, TDoc>;
  filterFn?: (() => Object);
  state!: TStateControllerFor<QueryState<TDoc>>;
  changesSubscription?: Subscription;
  loadingPromise?: Promise<any>;

  constructor(public queryName: string, public store: Store) {
    this.state = this.store.createState(this.queryName, QueryState) as TStateControllerFor<QueryState<TDoc>>;
  }

  load(collection: TCollectionInfo<any, TDoc>, filterFn?: CollectionQuery<TDoc>['filterFn']) {
    this.collection = collection;
    this.filterFn = filterFn;
    this.startSync();
  }

  startSync() {
    this.fetch();
    this.subscribeChanges();
  }

  stopSync() {
    this.unsubscribeChanges();
  }

  subscribeChanges() {
    this.changesSubscription = this.collection.items.$.subscribe(change => {
      const { documentData, operation, previousDocumentData } = change;
      switch (operation) {
        case 'INSERT':
          this.state.addItem(documentData.id, documentData);
          break;
        case 'UPDATE':
          this.state.setItem(documentData.id, documentData);
          break;
        case 'DELETE':
          this.state.removeItem(previousDocumentData.id);
          break;
        default:
      }

    });
  }

  unsubscribeChanges() {
    this.changesSubscription?.unsubscribe();
    this.changesSubscription = undefined;
  }

  fetch() {
    console.log('fetch query', this.queryName);
    // prevent multiple fetches if one is already created
    if (this.state.isLoading) return this.loadingPromise;
    this.state.setIsLoading(true);
    this.loadingPromise = this.collection.items.find().exec();
    this.loadingPromise.then(docs => {
      this.state.setValues(docs);
      this.state.setIsLoading(false);
      this.state.setIsLoaded(true);
      console.log('query fetched', this.queryName, this.state.itemsMap);
    });
    return this.loadingPromise;
  }

  destroy() {
    this.unsubscribeChanges();
    this.store.destroyState(this.queryName);
  }
}

export const QueryInjectorType = Symbol('queryInjector');

export function injectCollectionQuery<TDoc>(collectionInfo: TCollectionInfo<any, TDoc>) {
  let query: CollectionQuery<TDoc>;
  return createInjector(injector => ({
    type: QueryInjectorType,
    init() {
      const provider = injector.provider;
      const store = provider.scope.resolve(Store);
      const queryName = `${provider.name}__${injector.propertyName}`;
      query = new CollectionQuery<TDoc>(queryName, store);
      const collectionInjector = (collectionInfo as any as Injector<TCollectionInfo<any, TDoc>>);
      const collectionsCount = Object.values(provider.injectors)
        .filter(injector => injector.type === CollectionInjectorType)
        .length;
      let loadedCollectionsCount = 0;

      const unsubscribe = provider.events.on('onInjectorStatusChange', (injector, status) => {
        if (injector.type === CollectionInjectorType && status === 'done') {
          loadedCollectionsCount++;
          if (loadedCollectionsCount !== collectionsCount) return;
          unsubscribe();
          const collection = collectionInjector.resolveValue();
          query.load(collection);
        }
      });
    },
    getValue() {
      return query;
    },
  })) as CollectionQuery<TDoc>;
}

export function injectQuery<TDoc>(collection: TCollectionInfo<any, TDoc>) {
  return injectCollectionQuery(collection);
}
