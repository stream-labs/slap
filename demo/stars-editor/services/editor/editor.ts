import { SceneItemState, SceneState } from '../../interfeaces';
import {
  mutation, TServiceView,
} from '../../../../lib';
import { ReduxModule } from '../../../../lib/service';
import { ApiService } from '../api';
import { SceneController, SceneView } from './scene';
import { createViewWithActions } from '../../../../lib/createStateView';

export class EditorService extends ReduxModule {
  dependencies = { ApiService };

  state = {
    activeSceneId: '',
    scenes: [] as SceneState[],
    isLoaded: false,
  };

  async load() {
    const scenes = await this.deps.ApiService.fetchScenes();
    const activeSceneId = scenes[0].id;
    this.setScenes(scenes);
    this.setActiveScene(activeSceneId);
    this.setIsLoaded();
  }

  get scenes() {
    return this.state.scenes.map(scene => this.getScene(scene.id));
  }

  getScene(id: string) {
    return this.createModule(SceneController, id);
  }

  getSceneState(id: string) {
    return this.state.scenes.find(scene => scene.id === id);
  }

  @mutation()
  private setScenes(scenes: SceneState[]) {
    this.state.scenes = scenes;
  }

  @mutation()
  setActiveScene(sceneId: string) {
    console.log('set active scene', sceneId);
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
  updateItem(sceneId: string, itemId: string, patch: Partial<SceneItemState>) {
    const itemState = this.getScene(sceneId).getItem(itemId).state;
    Object.assign(itemState, patch);
  }

  get view() {
    const actions = this;
    const getters = this.createModule(EditorServiceView);
    return createViewWithActions(actions, getters);
  }
}

export class EditorServiceView extends ReduxModule {
  dependencies = { EditorService };

  get state() {
    return this.deps.EditorService.state;
  }

  get activeScene() {
    return this.getScene(this.state.activeSceneId);
  }

  getScene(sceneId: string) {
    const actions = this.deps.EditorService.getScene(sceneId);
    const getters = this.createModule(SceneView, sceneId);
    const sceneView = createViewWithActions(actions, getters);
    return sceneView;
  }

  get scenes() {
    return this.state.scenes.map(sceneState => this.getScene(sceneState.id));
  }
}
