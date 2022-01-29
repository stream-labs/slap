export interface StarState {
  id: string,
  color: string,
  angle: number,
  position: {
    x: number,
    y: number,
  }
}

export interface SceneState {
  id: string;
  name: string;
  backgroundColor: string;
  items: StarState[];
  selectedItemId: string;
}
