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
    state: import("../../../lib").InjectedProp<import("../../../lib").GetStateControllerFor<typeof EditorState, EditorState, import("../../../lib").WritablePart<EditorState>>, import("../../../lib").GetStateViewFor<typeof EditorState>, import("../../../lib").GetStateViewFor<typeof EditorState>>;
    scope: import("../../../lib").Scope;
    init(): Promise<void>;
    get myRandomVal(): string;
    bindActiveItem: import("../../../lib").GetInjectedFormBinding<TSceneItem, {}>;
    getSceneController(id: string): SceneController;
    getSceneItemController(sceneId: string, itemId: string): SceneController;
}
export declare class SceneController {
    id: string;
    editor: import("../../../lib").InjectedProp<EditorService, import("../../../lib").GetModuleStateView<typeof EditorService>, {}>;
    constructor(id: string);
    makeActive(): void;
    selectItem(id: string): void;
}
export declare class SceneItemController {
    sceneId: string;
    id: string;
    editor: import("../../../lib").InjectedProp<EditorService, import("../../../lib").GetModuleStateView<typeof EditorService>, {}>;
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
