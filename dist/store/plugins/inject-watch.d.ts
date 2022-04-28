import { Store } from '../Store';
import { isSimilar } from '../../utils';
export declare class WatchModule<T> {
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
export declare function injectWatch<T>(expression: () => T, onChange: (newVal: T, prevVal: T) => unknown, isEqual?: (newVal: T, prevVal: T) => boolean): import("../../scope").InjectedProp<WatchModule<unknown>, import("./createModuleView").GetModuleStateView<typeof WatchModule>, {}>;
