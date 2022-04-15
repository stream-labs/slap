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
    state: import("../../../lib").InjectedProp<import("../../../lib").TStateControllerFor<typeof EditorState, EditorState, {
        activeSceneId: string;
        activeItemId: string;
        scenes: TScene[];
        sceneItems: TSceneItem[];
        updateItem: (itemId: string, patch: Omit<Partial<TSceneItem>, "id">) => void;
        addScene: (scene: TScene) => void;
        addSceneItem: (sceneItem: TSceneItem) => void;
    }>, import("../../../lib").StateView<import("../../../lib").TStateViewForStateConfig<typeof EditorState>>, import("../../../lib").StateView<import("../../../lib").TStateViewForStateConfig<typeof EditorState>>>;
    loading: import("../../../lib").InjectedProp<import("../../../lib").TStateControllerFor<typeof import("../../../lib").LoadingState, import("../../../lib").LoadingState, {
        loadingStatus: import("../../../lib").TLoadingStatus;
    }>, import("../../../lib").StateView<import("../../../lib").TStateViewForStateConfig<typeof import("../../../lib").LoadingState>>, import("../../../lib").StateView<import("../../../lib").TStateViewForStateConfig<typeof import("../../../lib").LoadingState>>>;
    scope: import("../../../lib").GetInjectedProp<{
        type: symbol;
        getValue: () => import("../../../lib").Scope;
    }, import("../../../lib").Scope, unknown, unknown>;
    load(): Promise<void>;
    get myRandomVal(): string;
    bindActiveItem: import("../../../lib").InjectedProp<import("../../../lib").StateView<{
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
    }>, import("../../../lib").StateView<{
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
    }>, null>;
    getSceneController(id: string): SceneController;
    getSceneItemController(sceneId: string, itemId: string): SceneController;
}
export declare class SceneController {
    id: string;
    editor: import("../../../lib").GetInjectedProp<{
        type: symbol;
        getValue: () => EditorService;
    }, EditorService, unknown, unknown>;
    constructor(id: string);
    makeActive(): void;
    selectItem(id: string): void;
}
export declare class SceneItemController {
    sceneId: string;
    id: string;
    editor: import("../../../lib").GetInjectedProp<{
        type: symbol;
        getValue: () => EditorService;
    }, EditorService, unknown, unknown>;
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
