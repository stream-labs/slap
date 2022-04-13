export declare class EditorState {
    readonly persistent = true;
    activeSceneId: string;
    activeItemId: string;
    scenes: TScene[];
    sceneItems: TSceneItem[];
    get activeItem(): TSceneItem | undefined;
    updateItem(itemId: string, patch: Omit<Partial<TSceneItem>, 'id'>): void;
    addScene(scene: TScene): void;
    addSceneItem(sceneItem: TSceneItem): void;
}
export declare class EditorService {
    state: import("../../../lib/scope/injector").InjectedProp<import("../../../lib").TStateControllerFor<typeof EditorState, EditorState, {
        activeSceneId: string;
        activeItemId: string;
        scenes: TScene[];
        sceneItems: TSceneItem[];
        updateItem: (itemId: string, patch: Omit<Partial<TSceneItem>, "id">) => void;
        addScene: (scene: TScene) => void;
        addSceneItem: (sceneItem: TSceneItem) => void;
    }>, import("../../../lib").StateView<import("../../../lib").TStateViewForStateConfig<typeof EditorState>>, import("../../../lib").StateView<import("../../../lib").TStateViewForStateConfig<typeof EditorState>>>;
    loading: import("../../../lib/scope/injector").InjectedProp<import("../../../lib").TStateControllerFor<typeof import("../../../lib/store/plugins/pickLoadingState").LoadingState, import("../../../lib/store/plugins/pickLoadingState").LoadingState, {
        loadingStatus: import("../../../lib").TLoadingStatus;
    }>, import("../../../lib").StateView<import("../../../lib").TStateViewForStateConfig<typeof import("../../../lib/store/plugins/pickLoadingState").LoadingState>>, import("../../../lib").StateView<import("../../../lib").TStateViewForStateConfig<typeof import("../../../lib/store/plugins/pickLoadingState").LoadingState>>>;
    scope: import("../../../lib/scope/injector").InjectedProp<import("../../../lib").Scope, unknown, null>;
    load(): Promise<void>;
    get myRandomVal(): string;
    bindActiveItem: {
        id: {
            name: "id";
            value: string;
            onChange: (newVal: string) => unknown;
        };
        sceneId: {
            name: "sceneId";
            value: string;
            onChange: (newVal: string) => unknown;
        };
        name: {
            name: "name";
            value: string;
            onChange: (newVal: string) => unknown;
        };
        color: {
            name: "color";
            value: string;
            onChange: (newVal: string) => unknown;
        };
        position: {
            name: "position";
            value: {
                x: number;
                y: number;
            };
            onChange: (newVal: {
                x: number;
                y: number;
            }) => unknown;
        };
    };
    getSceneController(id: string): SceneController;
    getSceneItemController(sceneId: string, itemId: string): SceneController;
}
export declare class SceneController {
    id: string;
    editor: import("../../../lib/scope/injector").InjectedProp<EditorService, unknown, null>;
    constructor(id: string);
    makeActive(): void;
    selectItem(id: string): void;
}
export declare class SceneItemController {
    sceneId: string;
    id: string;
    editor: import("../../../lib/scope/injector").InjectedProp<EditorService, unknown, null>;
    constructor(sceneId: string, id: string);
    makeActive(): void;
    isSelected(): boolean;
}
export declare type TScene = {
    id: string;
    name: string;
};
export declare type TSceneItem = {
    id: string;
    sceneId: string;
    name: string;
    color: string;
    position: {
        x: number;
        y: number;
    };
};
