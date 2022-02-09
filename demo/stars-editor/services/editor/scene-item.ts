import { EditorService, EditorView } from './editor';
import { inject } from '../../../../lib/scope';
import { ISceneItemState } from '../../interfeaces';

export class SceneItemState {
  services = inject({ EditorService });

  constructor(public sceneId: string, public id: string) {}

  get serviceState() {
    return this.services.EditorService.state;
  }

  get state() {
    return this.serviceState.scenes[this.sceneId].items[this.id];
  }

  get isSelected() {
    return this.serviceState.scenes[this.sceneId].selectedItemId === this.id;
  }
}

export class SceneItemController extends SceneItemState {
  services = inject({ EditorService });

  get scene() {
    return this.services.EditorService.getScene(this.sceneId);
  }

  selectItem() {
    this.services.EditorService.selectItem(this.sceneId, this.id);
  }

  update(patch: Partial<Omit<ISceneItemState, 'id'>>) {
    this.services.EditorService.updateItem(this.sceneId, this.id, patch);
  }

  move(position: {x: number, y: number}) {
    this.update({ position });
  }
}

export class SceneItemView extends SceneItemState {
  views = inject({ EditorView });

  get scene() {
    return this.views.EditorView.getScene(this.sceneId);
  }

  // select next
}
