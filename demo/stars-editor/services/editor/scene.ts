import { TInjector } from '../../../../lib';
import { EditorService } from './editor';
import { SceneItem } from './scene-item';

export class SceneView {
  protected services = this.inject({ EditorService });

  get state() {
    return this.services.EditorService.state.scenes.find(scene => scene.id === this.sceneId)!;
  }

  getItem(itemId: string) {
    return new SceneItem(this.inject, this.sceneId, itemId);
  }

  constructor(protected inject: TInjector, public sceneId: string) {
  }
}

export class Scene extends SceneView {
  makeActive(sceneId: string) {
    this.services.EditorService.setActiveScene(sceneId);
  }
}


