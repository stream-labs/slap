import { Dict } from '../scope';
import { Store } from '../store/Store';
import { StateView } from '../store';
export declare class ReactStoreAdapter {
    store: Store;
    components: Dict<ComponentView>;
    registerComponent(moduleView: StateView, componentId: string, forceUpdate: Function): ComponentView;
    destroyComponent(componentId: string): void;
    init(): void;
    watchers: Record<string, Function>;
    watchersOrder: string[];
    createWatcher(watcherId: string, cb: Function): string;
    removeWatcher(watcherId: string): void;
    updateIsInProgress: boolean;
    onMutation(): void;
    updateUI(): void;
}
export declare type ComponentSnapshot = {
    affectedModules: Dict<number>;
    props: Dict<any>;
};
export declare class ComponentView {
    store: Store;
    stateView: StateView;
    id: string;
    forceUpdate: Function;
    isDestroyed: boolean;
    isMounted: boolean;
    isInvalidated: boolean;
    lastSnapshot: ComponentSnapshot;
    constructor(store: Store, stateView: StateView, id: string, forceUpdate: Function);
    makeSnapshot(): ComponentSnapshot;
    needUpdate(): boolean;
    setMounted(): void;
    setInvalidated(invalidated: boolean): void;
    setDestroyed(): void;
    defaultShouldComponentUpdate(): boolean;
    shouldComponentUpdate(): boolean;
    customShouldComponentUpdate: ShouldComponentUpdateFN | null;
    setShouldComponentUpdate(shouldUpdateCb: ShouldComponentUpdateFN): void;
}
export declare type ShouldComponentUpdateFN = (defaultShouldComponentUpdate: ShouldComponentUpdateFN) => boolean;
export declare type WillComponentUpdateFN = (newSnapshot: ComponentSnapshot, prevSnapshot: ComponentSnapshot) => boolean;
