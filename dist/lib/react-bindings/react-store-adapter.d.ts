import { Dict } from '../scope';
import { Store } from '../store/Store';
import { StateView } from '../store';
export declare class ReactStoreAdapter {
    store: import("../scope").InjectedProp<Store, unknown, null>;
    components: Dict<ComponentView>;
    registerComponent(moduleView: StateView, componentId: string, forceUpdate: Function): ComponentView;
    destroyComponent(componentId: string): void;
    load(): void;
    watchers: Record<string, Function>;
    watchersOrder: string[];
    createWatcher(watcherId: string, cb: Function): string;
    removeWatcher(watcherId: string): void;
    updateIsInProgress: boolean;
    onMutation(): void;
    updateUI(): void;
}
export declare class ComponentView {
    store: Store;
    stateView: StateView;
    id: string;
    forceUpdate: Function;
    isDestroyed: boolean;
    isMounted: boolean;
    isInvalidated: boolean;
    lastSnapshot: {
        affectedModules: Dict<number>;
        props: unknown;
    };
    constructor(store: Store, stateView: StateView, id: string, forceUpdate: Function);
    makeSnapshot(): {
        affectedModules: {};
        props: {};
    };
    needUpdate(): boolean;
    setMounted(): void;
    setInvalidated(invalidated: boolean): void;
    setDestroyed(): void;
}
