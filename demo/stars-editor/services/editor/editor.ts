import { SceneState } from '../../interfeaces';
import {
  mutation,
  ReduxModuleManager,
  TInjector,
  TInstances,
  TPromisifyFunctions,
} from '../../../../lib';
import { Service } from '../../../../lib/service';
import { ApiService } from '../api';
import { Scene, SceneView } from './scene';
import { createView } from '../../../../lib/createStateView';

export class EditorService extends Service {
  state = {
    activeSceneId: '',
    scenes: [] as SceneState[],
    isLoaded: false,
  };

  dependencies = { ApiService };

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
    return new Scene(this.inject, id);
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
    this.state.activeSceneId = sceneId;
  }

  @mutation()
  private setIsLoaded() {
    this.state.isLoaded = true;
  }

  @mutation()
  selectItem(sceneId: string, itemId: string) {
    const sceneState = this.getSceneState(sceneId);
    if (!sceneState) return;
    sceneState.selectedItemId = itemId;
  }

  get view() {
    return new EditorServiceView(this.inject);
  }

  createSceneView(sceneId: string) {
    return createView(this.getScene(sceneId), new SceneView(this.inject, sceneId));
  }
}

export class EditorServiceView {
  services = this.inject({ EditorService });

  get state() {
    return this.services.EditorService.state;
  }

  get activeScene() {
    return this.state.scenes.find(scene => scene.id === this.state.activeSceneId)!;
  }

  constructor(private inject: TInjector) {
  }

  getScene(id: string) {
    return this.services.EditorService.createSceneView(id);
  }
}

// export function createView<
//   TStateType,
//   TService extends { state: TStateType },
//   >
// (service: TService, view: any) {
//   const actions = {} as TPromisifyFunctions<TService>;
//   const getters = view;
//   const originalState = {} as any as TService['state'];
//   const combinedView = {} as any as typeof actions & typeof getters & TService['state'];
//   return combinedView;
//   // return {
//   //   actions, getters, combinedView, originalState,
//   // };
// }

// export function createService(moduleManager: ReduxModuleManager) {
//
// }

// export class SuperEditorView {
//   state = {
//     activeSceneId: '',
//   };
//
//   protected services = this.inject({ ApiService });
//
//   constructor(protected inject: TInjector) {}
// }
//
// export class SuperEditorService extends SuperEditorView {
//   reduxView =
//
//   @mutation()
//   setActiveScene(sceneId: string) {
//     this.state.activeSceneId = sceneId;
//   }
// }
