import { Dict } from '../scope';
import { Store } from '../store/Store';
import { ComponentView } from '../store';
export declare class ReactStoreAdapter {
    store: import("../scope").InjectedProp<Store, unknown>;
    load(): void;
    watchers: Record<string, Function>;
    watchersOrder: string[];
    components: Dict<ComponentView<any>>;
    stateIsInvalidated: boolean;
    createComponent(component: ComponentView<any>): void;
    mountComponent(component: ComponentView<any>): void;
    hasUnmountedComponents(): string | undefined;
    createWatcher(watcherId: string, cb: Function): string;
    removeWatcher(watcherId: string): void;
    updateIsInProgress: boolean;
    onMutation(): void;
    updateUI(): void;
}
