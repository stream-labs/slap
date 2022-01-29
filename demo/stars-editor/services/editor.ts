import { SceneState } from '../interfeaces';
import { mutation } from '../../../lib';
import { Services } from './service-provider';

export interface EditorState {
  scenes: SceneState[];
  activeSceneId: string;
  isLoaded: boolean;
}

export class EditorService {
  state: EditorState = {
    activeSceneId: '',
    scenes: [],
    isLoaded: false,
  };

  async load() {
    const scenes = await Services.ApiService.fetchScenes();
    const activeSceneId = scenes[0].id;
    this.setScenes(scenes);
    this.setActiveScene(activeSceneId);
    this.setIsLoaded();
  }

  get activeScene() {
    return this.state.scenes.find(scene => scene.id === this.state.activeSceneId)!;
  }

  @mutation()
  private setScenes(scenes: SceneState[]) {
    this.state.scenes = scenes;
  }

  @mutation()
  private setActiveScene(sceneId: string) {
    this.state.activeSceneId = sceneId;
  }

  @mutation()
  private setIsLoaded() {
    this.state.isLoaded = true;
  }

  @mutation()
  private selectItem(sceneId: string, itemId: string) {
    this.state.isLoaded = true;
  }
}

// class Scene {
//
//   selectItem(itemId: string) {
//
//   }
//
// }
