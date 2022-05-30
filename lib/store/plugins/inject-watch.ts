import { inject, getInstanceMetadata, InjectableModule } from '../../scope';

import {
  Store,
} from '../Store';
import { isSimilar } from '../../utils';
import { injectChild } from './inject-child';

/**
 * Creates a watcher that call a callback on state change
 * @param expression a function that returns a piece of state to compare. The source of state should be reactive
 * @param onChange call this callback if expression result changed
 * @param isEqual a comparison function
 */
export function injectWatch<T>(
  expression: () => T,
  onChange: (newVal: T, prevVal: T) => unknown,
  isEqual?: (newVal: T, prevVal: T) => boolean,
) {
  return injectChild(WatchModule, expression, onChange, isEqual);
}

export class WatchModule<T> implements InjectableModule {

  store = inject(Store);
  unwatch: Function | null = null;
  current: T | null = null;

  constructor(
    public watchExpr: () => T,
    public onChange: (newVal: T, prevVal: T) => unknown,
    public isEqual = isSimilar,
  ) {}

  init() {
    const parentProvider = getInstanceMetadata(this).provider.options.parentProvider;
    if (!parentProvider) {
      throw new Error('This module should have a parent module');
    }

    const context = parentProvider.instance;
    this.current = this.watchExpr.call(context);
    this.unwatch = this.store.events.on('onMutation', () => {
      const prev = this.current!;
      this.current = this.watchExpr.call(context);
      if (this.isEqual(this.current, prev)) return;
      this.onChange.call(context, this.current, prev);
    });
  }

  destroy() {
    this.unwatch && this.unwatch();
  }

}
