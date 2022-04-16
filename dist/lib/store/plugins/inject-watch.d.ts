import { Store } from '../Store';
import { isSimilar } from '../../utils';
export declare class WatchModule<T> {
    watchExpr: () => T;
    onChange: (newVal: T, prevVal: T) => unknown;
    isEqual: typeof isSimilar;
    store: import("../../scope").GetInjectedProp<{
        type: symbol;
        getValue: () => Store;
    }, Store, unknown, unknown>;
    unwatch: Function | null;
    current: T | null;
    constructor(watchExpr: () => T, onChange: (newVal: T, prevVal: T) => unknown, isEqual?: typeof isSimilar);
    load(): void;
    onDestroy(): void;
}
export declare function injectWatch<T>(expression: () => T, onChange: (newVal: T, prevVal: T) => unknown, isEqual?: (newVal: T, prevVal: T) => boolean): import("../../scope").InjectedProp<WatchModule<unknown>, import("..").GetModuleStateView<typeof WatchModule>, {}>;
