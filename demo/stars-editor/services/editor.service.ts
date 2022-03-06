import { mutation } from '../../../lib';
import { createSchema, injectCollection } from '../../../lib/slapp/db.service';

export class EditorService {
  state = {
    activeSceneId: '',
    activeItemId: '',
  };

  scenesCollection = injectCollection(sceneSchema);
  itemsCollection = injectCollection(sceneItemSchema);

  async load() {
    await Promise.all([
      ...initialScenes.map(scene => this.addScene(scene)),
      ...initalItems.map(scene => this.addSceneItem(scene)),
    ]);
    this.setActiveScene('scene1');
  }

  @mutation()
  setActiveScene(id: string) {
    this.state.activeSceneId = id;
  }

  @mutation()
  setActiveItem(id: string) {
    this.state.activeItemId = id;
  }

  async addScene(scene: TScene) {
    await this.scenesCollection.insert(scene);
  }

  async addSceneItem(sceneItem: TSceneItem) {
    await this.itemsCollection.insert(sceneItem);
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
