import { EditorService } from './editor';
import { SceneItemController, SceneItemState } from './scene-item';
import { inject, injectScope } from '../../../../lib';

export class SceneState {
  services = inject({ EditorService });

  get state() {
    return this.services.EditorService.state.scenes[this.id];
  }

  get isActive() {
    return this.id === this.services.EditorService.state.activeSceneId;
  }

  constructor(public id: string) {}
}

export class SceneController extends SceneState {
  scope = injectScope();

  makeActive() {
    this.services.EditorService.setActiveScene(this.id);
  }

  selectItem(itemId: string) {
    this.services.EditorService.selectItem(this.id, itemId);
  }

  getItem(id: string) {
    return this.scope.create(SceneItemController, this.id, id);
  }

  createView() {
    // TODO
  }
}

// export class SceneView extends SceneState {
//   scope = injectScope();
//
//   getItem(itemId: string) {
//     // const getters = this.scope.create(SceneItemView, this.id, itemId);
//     // const controler = this.scope.create(SceneItemController, this.id, itemId);
//     // const result = createViewWithActions(getters, controler);
//     // return result;
//
//     const sceneId = this.id;
//     const path = ['EditorService', ['getScene', sceneId], ['getItem', itemId]];
//     return createRemoteView(path, SceneItemController, SceneItemState, this.scope, sceneId, itemId);
//   }
//
//   get items() {
//     return Object.keys(this.state.items).map(id => this.getItem(id));
//   }
// }
