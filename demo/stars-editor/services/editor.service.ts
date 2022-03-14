import { createSchema, injectCollection } from '../../../lib/slapp/db.service';
import { injectState } from '../../../lib/slapp/injectState';
import { injectQuery } from '../../../lib/slapp/query';
import { inject, injectScope } from '../../../lib/scope/injector';

class EditorState {
  persistent = true;

  state = {
    activeSceneId: '',
    activeItemId: '',
  };

  setActiveScene(id: string) {
    this.state.activeSceneId = id;
  }

  setActiveItem(id: string) {
    this.state.activeItemId = id;
  }
}

export class EditorService {

  state = injectState(EditorState);

  scenesCollection = injectCollection(sceneSchema);

  itemsCollection = injectCollection(sceneItemSchema);

  queryScenes = injectQuery(this.scenesCollection);

  querySceneItems = injectQuery(this.itemsCollection);

  scope = injectScope();

  async load() {
    await Promise.all([
      ...initialScenes.map(scene => this.addScene(scene)),
      ...initalItems.map(scene => this.addSceneItem(scene)),
    ]);
    this.state.setActiveScene('scene1');
  }

  async addScene(scene: TScene) {
    await this.scenesCollection.items.insert(scene);
  }

  async addSceneItem(sceneItem: TSceneItem) {
    await this.itemsCollection.items.insert(sceneItem);
  }

  getSceneController(id: string) {
    return this.scope.create(SceneController, id);
  }
}

export class SceneController {

  editor = inject(EditorService);

  constructor(public id: string) {}

  makeActive() {
    this.editor.state.setActiveScene(this.id);
  }

  selectItem(id: string) {
    this.editor.state.setActiveItem(id)
  }

}

const sceneSchema = createSchema({
  name: 'scenes',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    backgroundColor: { type: 'string' },
  },
  required: ['id', 'name'],
} as const);

const sceneItemSchema = createSchema({
  name: 'scene_items',
  version: 0,
  title: 'Scene schema',
  description: 'describes scenes',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string' },
    sceneId: { type: 'string' },
    name: { type: 'string' },
    color: { type: 'string' },
    position: {
      type: 'object',
      properties: {
        x: { type: 'number' },
        y: { type: 'number' },
      },
    },
  },
  required: ['id', 'sceneId', 'name'],
} as const);

export type TScene = typeof sceneSchema.docType;
export type TSceneItem = typeof sceneItemSchema.docType;

const initialScenes: TScene[] = [
  { id: 'scene1', name: 'Scene 1' },
  { id: 'scene2', name: 'Scene 1' },
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
