
export interface ISceneItemState {
  id: string,
  color: string,
  angle: number,
  width: number,
  height: number,
  position: {
    x: number,
    y: number,
  }
}

export interface ISceneState {
  id: string;
  name: string;
  backgroundColor: string;
  items: Record<string, ISceneItemState>;
  selectedItemId: string;
}
