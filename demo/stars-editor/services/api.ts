import { sleep } from '../utils/sleep';
import { SceneState } from '../interfeaces';

export class ApiService {
  async fetchScenes(): Promise<SceneState[]> {
    await sleep(1000);
    return scenesData;
  }
}

const scenesData: SceneState[] = [
  {
    id: 'scene1',
    name: 'Scene 1',
    backgroundColor: 'blue',
    selectedItemId: 'star1',
    items: [
      {
        id: 'star1', color: 'yellow', angle: 0, position: { x: 0, y: 0 },
      },
      {
        id: 'star2', color: 'yellow', angle: 0, position: { x: 100, y: 100 },
      },
      {
        id: 'star3', color: 'yellow', angle: 0, position: { x: 200, y: 200 },
      },
    ],
  },

  {
    id: 'scene2',
    name: 'Scene 2',
    backgroundColor: 'black',
    selectedItemId: 'star4',
    items: [
      {
        id: 'star4', color: 'yellow', angle: 0, position: { x: 0, y: 0 },
      },
      {
        id: 'star5', color: 'yellow', angle: 0, position: { x: 100, y: 100 },
      },
      {
        id: 'star6', color: 'yellow', angle: 0, position: { x: 200, y: 200 },
      },
    ],
  },

];
