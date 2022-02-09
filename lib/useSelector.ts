import { useEffect, useRef } from 'react';
import { useForceUpdate } from './hooks';
import { isSimilar } from './isDeepEqual';
import { useModuleManager } from './useModule';
import { ReactiveStore } from './store';

export function useSelector(cb: Function) {
  const servicesRevisionRef = useRef<Record<string, number>>({});
  const selectorResultRef = useRef<Record<string, any>>({});
  const forceUpdate = useForceUpdate();
  const moduleManager = useModuleManager();
  const store = moduleManager.resolve(ReactiveStore);

  useEffect(() => {
    servicesRevisionRef.current = store.runAndSaveAccessors(() => {
      selectorResultRef.current = cb();
    });

    const watcherId = store.watchers.create(() => {
      const prevRevisions = servicesRevisionRef.current;
      const currentRevisions = store.modulesRevisions;
      let modulesHasChanged = false;
      for (const moduleName in prevRevisions) {
        if (prevRevisions[moduleName] !== currentRevisions[moduleName]) {
          modulesHasChanged = true;
          break;
        }
      }

      if (!modulesHasChanged) return;

      const prevSelectorResult = selectorResultRef.current;

      servicesRevisionRef.current = store.runAndSaveAccessors(() => {
        selectorResultRef.current = cb();
      });

      if (!isSimilar(prevSelectorResult, selectorResultRef.current)) {
        forceUpdate();
      }
    });
    return () => {
      store.watchers.remove(watcherId);
    };
  }, []);
}
