import { ReduxModule } from '../../../../lib/service';
import { EditorService } from './editor';
import { SceneItemController, SceneItemView } from './scene-item';
import { createViewWithActions } from '../../../../lib/createStateView';

export class SceneView extends ReduxModule {
  dependencies = { EditorService };

  get state() {
    return this.deps.EditorService.state.scenes.find(scene => scene.id === this.id)!;
  }

  get isActive() {
    return this.id === this.deps.EditorService.state.activeSceneId;
  }

  getItemView(itemId: string) {
    const actions = this.deps.EditorService.getScene(this.id).getItem(itemId);
    const getters = this.createModule(SceneItemView, this.id, itemId);
    return createViewWithActions(actions, getters);
  }

  get itemViews() {
    return this.state.items.map(item => this.getItemView(item.id));
  }

  constructor(public id: string) {
    super();
  }
}

export class SceneController extends SceneView {
  makeActive() {
    this.deps.EditorService.setActiveScene(this.id);
  }

  selectItem(itemId: string) {
    this.deps.EditorService.selectItem(this.id, itemId);
  }

  getItem(id: string) {
    return this.createModule(SceneItemController, this.id, id);
  }
}
