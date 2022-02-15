import { ISceneItemState, ISceneState } from '../../interfeaces';
import {
  inject, injectScope, injectState,
  mutation,
} from '../../../../lib';
import { ApiService } from '../api';
import { SceneController, SceneView } from './scene';
import { createViewWithActions } from '../../../../lib/createStateView';

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

  get scenes() {
    return Object.keys(this.state.scenes).map(id => this.getScene(id));
  }

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
}

export class EditorView extends EditorState {
  state = injectState(EditorService);

  scope = injectScope();

  getScene(sceneId: string) {
    const view = this.scope.create(SceneView, sceneId);
    const controller = this.scope.create(SceneController, sceneId);
    const result = createViewWithActions(view, controller);
    return result;
  }

  get scenes() {
    return Object.keys(this.state.scenes).map(sceneId => this.getScene(sceneId));
  }

  get activeScene() {
    return this.getScene(this.state.activeSceneId);
  }
}
