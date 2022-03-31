import { useEffect, useRef } from 'react';
import { useForceUpdate } from './hooks';
import { useAppContext } from './ReactModules';
import { Store } from '../store/store';
import { ReactStoreAdapter } from './react-store-adapter';
import { isSimilar } from '../utils/isDeepEqual';

export function useSelector(cb: Function) {
  const affectedModulesRef = useRef<Record<string, number>>({});
  const currentSelectorStateRef = useRef<Record<string, any>>({});
  const forceUpdate = useForceUpdate();
  const scope = useAppContext().modulesScope;
  const store = scope.resolve(Store);
  const reactStore = scope.resolve(ReactStoreAdapter);

  useEffect(() => {
    affectedModulesRef.current = store.listenAffectedModules(() => {
      currentSelectorStateRef.current = cb();
    });

    // TODO do not run watchers for non-observable component views

    const watcherId = reactStore.createWatcher(() => {
      const prevRevisions = affectedModulesRef.current;
      const currentRevisions = store.moduleRevisions;

      let modulesHasChanged = false;
      for (const moduleName in prevRevisions) {
        if (prevRevisions[moduleName] !== currentRevisions[moduleName]) {
          modulesHasChanged = true;
          break;
        }

        if (!modulesHasChanged) {
          // dependent modules don't have changes in the state
          // do not re-render
          return;
        }
      }

      const prevSelectorState = currentSelectorStateRef.current;

      affectedModulesRef.current = store.listenAffectedModules(() => {
        currentSelectorStateRef.current = cb();
      });

      if (!isSimilar(prevSelectorState, currentSelectorStateRef.current)) {
        // TODO try batched updates
        forceUpdate();
      }
    });
    return () => {
      reactStore.removeWatcher(watcherId);
    };
  }, []);
}
