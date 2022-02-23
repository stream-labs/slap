import { ISceneItemState, ISceneState } from '../../interfeaces';
import {
  inject, injectScope, injectState,
  mutation, Scope, TPromisifyFunctions,
} from '../../../../lib';
import { ApiService } from '../api';
import { SceneController, SceneState } from './scene';
import { SceneItemController, SceneItemState } from './scene-item';
import { createView } from '../../../../lib/plugins/useService';

export class EditorState {
  state = {
    activeSceneId: '',
    scenes: {} as Record<string, ISceneState>,
    isLoaded: false,
  };

  get scenesCount() {
    return Object.keys(this.state.scenes);
  }

  get firstSceneId() {
    const ids = Object.keys(this.state.scenes);
    return ids[0];
  }
}

export class EditorService extends EditorState {
  services = inject({ ApiService });

  scope = injectScope();

  async load() {
    const scenes = await this.services.ApiService.fetchScenes();
    this.setScenes(scenes);
    this.setActiveScene(this.firstSceneId);
    this.setIsLoaded();
  }

  // get scenes() {
  //   return Object.keys(this.state.scenes).map(id => this.getScene(id));
  // }

  getScene(id: string) {
    return this.scope.create(SceneController, id);
  }

  getSceneState(id: string) {
    return this.state.scenes[id];
  }

  @mutation()
  private setScenes(scenes: Record<string, ISceneState>) {
    this.state.scenes = scenes;
  }

  @mutation()
  setActiveScene(sceneId: string) {
    this.state.activeSceneId = sceneId;
  }

  @mutation()
  private setIsLoaded() {
    this.state.isLoaded = true;
  }

  // TODO move to SceneItem
  @mutation()
  selectItem(sceneId: string, itemId: string) {
    const sceneState = this.getSceneState(sceneId);
    if (!sceneState) return;
    sceneState.selectedItemId = itemId;
  }

  @mutation()
  updateItem(sceneId: string, itemId: string, patch: Partial<ISceneItemState>) {
    const itemState = this.getScene(sceneId).getItem(itemId).state;
    Object.assign(itemState, patch);
  }

  // TODO move to components?
  createView() {
    return createView({
      path: 'EditorService',
      stateGetter: () => this.state,
      controllerClass: EditorService,
      gettersClass: EditorState,
      viewFactoryClass: EditorViewFactory,
      scope: this.scope,
      shouldCache: true,
      args: [],
    });
  }
}

export class EditorViewFactory {
  services = inject({ EditorService });
  scope = injectScope();

  getState() {
    return this.services.EditorService.state;
  }

  getScene(sceneId: string) {
    const v = createView({
      path: ['EditorService', ['getScene', sceneId]],
      stateGetter: () => this.getState().scenes[sceneId],
      controllerClass: SceneController,
      gettersClass: SceneState,
      viewFactoryClass: SceneViewFactory,
      scope: this.scope,
      shouldCache: false,
      args: [sceneId],
    });
    return v;
  }

  getItem(sceneId: string, itemId: string) {
    const v = createView({
      path: ['EditorService', ['getScene', sceneId], ['getItem', itemId]],
      stateGetter: () => this.getState().scenes[sceneId].items[itemId],
      controllerClass: SceneItemController,
      gettersClass: SceneItemState,
      viewFactoryClass: SceneItemViewFactory,
      scope: this.scope,
      shouldCache: false,
      args: [sceneId, itemId],
    });
    return v;
  }

  get activeScene() {
    return this.getScene(this.getState().activeSceneId);
  }

  get scenes() {
    return Object.keys(this.getState().scenes).map(sceneId => this.getScene(sceneId));
  }
}

export class SceneViewFactory {
  constructor(public sceneId: string) {
  }

  services = inject({ EditorService });

  get editorView() {
    return this.services.EditorService.createView();
  }

  get state() {
    return this.editorView.getState().scenes[this.sceneId];
  }

  getItem(itemId: string) {
    return this.editorView.getItem(this.sceneId, itemId);
  }

  get items() {
    return Object.keys(this.editorView.getState().scenes[this.sceneId].items).map(id => this.getItem(id));
  }
}

export class SceneItemViewFactory {
  constructor(public sceneId: string, public itemId: string) {
  }

  services = inject({ EditorService });

  get editorView() {
    return this.services.EditorService.createView();
  }

  get state() {
    return this.editorView.getState().scenes[this.sceneId].items[this.itemId];
  }

  getScene() {
    this.editorView.getScene(this.sceneId);
  }
}
