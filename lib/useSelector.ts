import { useEffect, useRef } from 'react';
import { useComponentId, useForceUpdate, useOnCreate, useOnDestroy } from './hooks';
import { isSimilar } from './isDeepEqual';
import { useModuleManager } from './useModule';

export function useSelector(cb: Function) {
  const servicesRevisionRef = useRef<Record<string, number>>({});
  const selectorResultRef = useRef<Record<string, any>>({});
  const forceUpdate = useForceUpdate();
  const moduleManager = useModuleManager();

  useEffect(() => {
    servicesRevisionRef.current = moduleManager.runAndSaveAccessors(() => {
      selectorResultRef.current = cb();
    });

    const watcherId = moduleManager.createWatcher(() => {
      const prevRevisions = servicesRevisionRef.current;
      const currentRevisions = moduleManager.modulesRevisions;
      let modulesHasChanged = false;
      for (const moduleName in prevRevisions) {
        if (prevRevisions[moduleName] !== currentRevisions[moduleName]) {
          modulesHasChanged = true;
          break;
        }
      }

      if (!modulesHasChanged) return;

      const prevSelectorResult = selectorResultRef.current;

      servicesRevisionRef.current = moduleManager.runAndSaveAccessors(() => {
        selectorResultRef.current = cb();
      });

      if (!isSimilar(prevSelectorResult, selectorResultRef.current)) {
        forceUpdate();
      }
    });
    return () => {
      moduleManager.removeWatcher(watcherId);
    };
  }, []);
}
