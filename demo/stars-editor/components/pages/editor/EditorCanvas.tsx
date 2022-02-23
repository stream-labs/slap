import React, { CSSProperties } from 'react';
import { Rnd } from 'react-rnd';
import {
  useModule, inject, mutation, TModuleView,
} from '../../../../../lib';
import {
  EditorService, SceneItemState,
} from '../../../services/editor';
import { ISceneItemState } from '../../../interfeaces';
import { injectViews } from '../../../../../lib/plugins/injectView';

const wrapperStyle: CSSProperties = {
  height: '100%',
  width: '100%',
  backgroundColor: '#D2D2D2',
};

const canvasStyle: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '500px',
  height: '400px',
  margin: '0 auto',
  backgroundColor: 'black',
};

class EditorCanvasModule {
  services = inject({ EditorService });

  state = {
    draggingItem: null as ISceneItemState | null,
  };

  // selectItem = this.views.EditorView.se

  get editorView() {
    return this.services.EditorService.createView(); // views.EditorView as EditorService['view'];
  }

  get items() {
    return this.editorView.activeScene.items.map(item => this.getItem(item.id));
  }

  getItem(itemId: string) {
    if (this.state.draggingItem?.id === itemId) return this.state.draggingItem;
    return this.editorView.activeScene.state.items[itemId];
  }

  // get items() {
  //   return this.editorView.activeScene.state.items.map(item => (item.id === this.state.draggingItem?.id ? this.state.draggingItem : item));
  // }

  @mutation()
  startDrag(item: ISceneItemState) {
    console.log('start dragging');
    this.state.draggingItem = { ...item, color: 'red' };
  }

  @mutation()
  stopDrag() {
    this.state.draggingItem = null;
  }

  async move(itemId: string, pos: {x: number, y: number }) {
    this.setDraggedItemPos(pos);
    await this.getItemView(itemId).move(pos);
    console.log('stop dragging');
    this.stopDrag();
  }

  @mutation()
  setDraggedItemPos(pos: {x: number, y: number }) {
    this.state.draggingItem!.position = pos;
  }

  // TODO remove:

  getItemView(itemId: string) {
    return this.editorView.activeScene.getItem(itemId);
  }

  isSelected(itemId: string) {
    return this.getItemView(itemId).isSelected;
  }

  selectItem(itemId: string) {
    this.getItemView(itemId).selectItem();
  }

  get selectedItem() {
    return this.getItem(this.editorView.activeScene.selectedItemId);
  }
}

export function EditorCanvas() {
  const {
    items, isSelected, selectItem, startDrag, move, selectedItem,
  } = useModule(EditorCanvasModule);

  console.log('Render selected item', JSON.stringify(selectedItem));

  return (
    <div style={wrapperStyle}>
      <div style={canvasStyle}>
        {items.map(item => (
          <Rnd
            key={item.id}
            style={{ color: item.color, border: isSelected(item.id) ? '1px solid green' : '1px solid rgba(0,255,255, 0.3)' }}
            size={{ width: item.width, height: item.height }}
            position={item.position}
            enableResizing={false}
            onMouseDown={() => selectItem(item.id)}
            onDragStart={(e, d) => startDrag(item)}
            onDragStop={(e, d) => { move(item.id, { x: d.x, y: d.y }); }}
          >
            {item.id}
          </Rnd>
        ))}
      </div>
    </div>
  );
}
