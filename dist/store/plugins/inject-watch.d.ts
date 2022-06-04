import { InjectableModule } from '../../scope';
import { Store } from '../Store';
import { isSimilar } from '../../utils';
/**
 * Creates a watcher that call a callback on state change
 * @param expression a function that returns a piece of state to compare. The source of state should be reactive
 * @param onChange call this callback if expression result changed
 * @param isEqual a comparison function
 */
export declare function injectWatch<T>(expression: () => T, onChange: (newVal: T, prevVal: T) => unknown, isEqual?: (newVal: T, prevVal: T) => boolean): import("../../scope").InjectedProp<WatchModule<unknown>, import("./createModuleView").GetModuleStateView<typeof WatchModule>, {}>;
export declare class WatchModule<T> implements InjectableModule {
    watchExpr: () => T;
    onChange: (newVal: T, prevVal: T) => unknown;
    isEqual: typeof isSimilar;
    store: Store;
    unwatch: Function | null;
    current: T | null;
    constructor(watchExpr: () => T, onChange: (newVal: T, prevVal: T) => unknown, isEqual?: typeof isSimilar);
    init(): void;
    destroy(): void;
}
