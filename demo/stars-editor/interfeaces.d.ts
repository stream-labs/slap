
export interface ISceneItemState {
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
  name: string;
  backgroundColor: string;
  items: Record<string, ISceneItemState>;
  selectedItemId: string;
}
