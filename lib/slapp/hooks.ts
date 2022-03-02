import { Observable } from 'rxjs';
import { useEffect, useState } from 'react';
import { useScope } from '../useModule';
import { DBService } from './db.service';

/**
 * Subscribe to an RxJs observable
 */
export function useSubscription<T>(observable: Observable<T>, cb: (value: T) => unknown) {
  useEffect(() => {
    const subscription = observable.subscribe(cb);
    return () => subscription.unsubscribe();
  }, []);
}

/**
 * Example from https://nils-mehlhorn.de/posts/react-hooks-rxjs
 */
export function useObservable<T>(observable: Observable<T>): [T, any] {
  const [value, setValue] = useState<T>();
  const [error, setError] = useState();

  useEffect(() => {
    const subscription = observable.subscribe(setValue, setError);
    return () => subscription.unsubscribe();
  }, [observable]);

  return [value as T, error];
}

export function useDB() {
  return useScope().resolve(DBService).db;
}

export function useCollection(collectionName: string) {
  return useDB().collections[collectionName];
}
