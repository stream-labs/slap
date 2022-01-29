import { TInjector } from '../../../../lib';
import { EditorService } from './editor';

export class SceneItem {
  constructor(private inject: TInjector, public sceneId: string, public sceneItemId: string) {
  }

  private services = this.inject({ EditorService });

  get state() {
    return this.scene.items.find(item => item.id === this.sceneItemId);
  }

  get scene() {
    return this.services.EditorService.getSceneState(this.sceneId)!;
  }

  selectItem(itemId: string) {
    this.services.EditorService.selectItem(this.sceneId, itemId);
  }
}
