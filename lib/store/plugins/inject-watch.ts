import { inject, getInstanceMetadata } from '../../scope';

import {
  Store,
} from '../Store';
import { isSimilar } from '../../utils';
import { injectChild } from './inject-child';

export class WatchModule<T> {

  store = inject(Store);
  unwatch: Function | null = null;
  current: T | null = null;

  constructor(
    public watchExpr: () => T,
    public onChange: (newVal: T, prevVal: T) => unknown,
    public isEqual = isSimilar,
  ) {}

  load() {
    const injector = getInstanceMetadata(this).provider.options.injector;
    if (!injector) {
      throw new Error('This module should have a parent module');
    }

    const context = injector.provider.instance;
    this.current = this.watchExpr.call(context);
    this.unwatch = this.store.events.on('onMutation', () => {
      const prev = this.current!;
      this.current = this.watchExpr.call(context);
      if (this.isEqual(this.current, prev)) return;
      this.onChange.call(context, this.current, prev);
    });
  }

  onDestroy() {
    this.unwatch && this.unwatch();
  }

}

export function injectWatch<T>(
  expression: () => T,
  onChange: (newVal: T, prevVal: T) => unknown,
  isEqual?: (newVal: T, prevVal: T) => boolean,
) {
  return injectChild(WatchModule, expression, onChange, isEqual);
}
