import { inject, injectForm, injectLoading, injectScope, injectState } from '../../../lib';

export class EditorState {
  readonly persistent = true;

  activeSceneId = '';
  activeItemId = '';
  scenes: TScene[] = [];
  sceneItems: TSceneItem[] = [];

  get activeItem() {
    return this.sceneItems.find(item => item.id === this.activeItemId);
  }

  updateItem(itemId: string, patch: Omit<Partial<TSceneItem>, 'id'>) {
    const item = this.sceneItems.find(item => item.id === itemId);
    Object.assign(item, patch);
  }

  addScene(scene: TScene) {
    this.scenes.push(scene);
  }

  addSceneItem(sceneItem: TSceneItem) {
    this.sceneItems.push(sceneItem);
  }
}

export class EditorService {

  state = injectState(EditorState);
  loading = injectLoading();

  // scenesCollection = injectCollection(sceneSchema);
  //
  // itemsCollection = injectCollection(sceneItemSchema);

  // scenesQuery = injectQuery(this.scenesCollection);
  //
  // sceneItemsQuery = injectQuery(this.itemsCollection);

  scope = injectScope();

  async load() {
    await Promise.all([
      ...initialScenes.map(scene => this.state.addScene(scene)),
      ...initalItems.map(scene => this.state.addSceneItem(scene)),
    ]);
    this.state.setActiveSceneId('scene1');
  }

  get myRandomVal() {
    return this.state.activeItemId + 1;
  }

  bindActiveItem = injectForm(() => this.state.activeItem!, patch => this.state.updateItem(this.state.activeItemId, patch));

  getSceneController(id: string) {
    return this.scope.create(SceneController, id);
  }

  getSceneItemController(sceneId: string, itemId: string) {
    return this.scope.create(SceneController, sceneId, itemId);
  }
}

export class SceneController {

  editor = inject(EditorService);

  constructor(public id: string) {}

  makeActive() {
    this.editor.state.setActiveSceneId(this.id);
  }

  selectItem(id: string) {
    this.editor.state.setActiveItemId(id);
  }

}

export class SceneItemController {

  editor = inject(EditorService);

  constructor(public sceneId: string, public id: string) {}

  makeActive() {
    this.editor.state.setActiveSceneId(this.id);
  }

  isSelected() {
    return this.editor.state.activeItemId === this.id;
  }

}

export type TScene = {
  id: string,
  name: string,
}

export type TSceneItem = {
  id: string,
  sceneId: string,
  name: string,
  color: string,
  position: { x: number, y: number },
}

const initialScenes: TScene[] = [
  { id: 'scene1', name: 'Scene 1' },
  { id: 'scene2', name: 'Scene 2' },
];

const initalItems: TSceneItem[] = [
  {
    id: 'item1',
    sceneId: 'scene1',
    name: 'Item 1',
    color: 'yellow',
    position: { x: 0, y: 0 },
  },
  {
    id: 'item2',
    sceneId: 'scene1',
    name: 'Item 2',
    color: 'yellow',
    position: { x: 50, y: 50 },
  },
  {
    id: 'item3',
    sceneId: 'scene1',
    name: 'Item 2',
    color: 'yellow',
    position: { x: 100, y: 100 },
  },

  {
    id: 'item4',
    sceneId: 'scene2',
    name: 'Item 2',
    color: 'yellow',
    position: { x: 150, y: 50 },
  },
  {
    id: 'item5',
    sceneId: 'scene2',
    name: 'Item 2',
    color: 'yellow',
    position: { x: 10, y: 80 },
  },
];
