import { EditorService } from './editor';
import { ReduxModule } from '../../../../lib/service';
import { SceneItemState } from '../../interfeaces';
import { SceneView } from './scene';

export class SceneItemView extends ReduxModule {
  dependencies = { EditorService, SceneView };

  constructor(public sceneId: string, public id: string) {
    super();
  }

  get editorView() {
    return this.deps.EditorService.view;
  }

  get state() {
    return this.scene.state.items.find(item => item.id === this.id)!;
  }

  get scene() {
    return this.editorView.getScene(this.sceneId);
  }

  get isSelected() {
    return this.scene.selectedItemId === this.id;
  }
}

export class SceneItemController extends ReduxModule {
  dependencies = {
    EditorService,
  };

  constructor(public sceneId: string, public id: string) {
    super();
  }

  get editor() {
    return this.deps.EditorService;
  }

  get scene() {
    return this.editor.getScene(this.sceneId);
  }

  get state() {
    return this.scene.state.items.find(item => item.id === this.id)!;
  }

  selectItem() {
    this.scene.selectItem(this.id);
  }

  update(patch: Partial<Omit<SceneItemState, 'id'>>) {
    this.editor.updateItem(this.sceneId, this.id, patch);
  }

  move(position: {x: number, y: number}) {
    this.update({ position });
  }
}
