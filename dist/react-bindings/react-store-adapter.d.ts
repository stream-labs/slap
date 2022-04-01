import { Store } from '../store/Store';
export declare class ReactStoreAdapter {
    store: Store;
    load(): void;
    watchers: Record<string, Function>;
    watchersOrder: string[];
    createWatcher(cb: Function): string;
    removeWatcher(watcherId: string): void;
    updateUI(): void;
}
