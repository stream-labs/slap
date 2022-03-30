import React, { CSSProperties } from 'react';
import { Rnd } from 'react-rnd';
import { EditorService, TSceneItem } from '../../../services/editor.service';
import { inject } from '../../../../../lib/scope/injector';
import { injectState } from '../../../../../lib/slapp/injectState';
import { useModule } from '../../../../../lib';
// import {
//   useModule, inject, mutation, TModuleView,
// } from '../../../../../lib';
// import {
//   EditorService, SceneItemState,
// } from '../../../services/editor';
// import { ISceneItemState } from '../../../interfeaces';
// import { injectViews } from '../../../../../lib/plugins/injectView';

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
  editor = inject(EditorService);

  state = injectState({
    draggingItem: null as TSceneItem | null,

    startDrag(item: TSceneItem) {
      console.log('start dragging');
      this.draggingItem = { ...item, color: 'red' };
    },

    stopDrag() {
      this.draggingItem = null;
    },

    setDraggedItemPos(pos: {x: number, y: number }) {
      this.draggingItem!.position = pos;
    },
  });

  get items() {
    return this.editor.state.sceneItems;
  }

  get activeItemId() {
    return this.editor.state.activeItemId;
  }

  getItem(itemId: string) {
    if (this.state.draggingItem?.id === itemId) return this.state.draggingItem;
    return this.items.find(item => item.id === itemId);
  }

  isSelected(itemId: string) {
    return this.editor.state.activeItemId === itemId;
  }

  selectItem(itemId: string) {
    this.editor.state.setActiveItemId(itemId);
  }

  async move(itemId: string, position: {x: number, y: number }) {

    this.state.setDraggedItemPos(position);
    // await this.getItemView(itemId).move(pos);
    this.editor.state.updateItem(itemId, { position });
    console.log('stop dragging');
    this.state.stopDrag();
  }
}

export function EditorCanvas() {
  const {
    items, isSelected, selectItem, startDrag, move, componentView, activeItemId,
  } = useModule(EditorCanvasModule);

  console.log('ComponentView for EditorMenu', componentView);
  // console.log('Render selected item', JSON.stringify(selectedItem));

  return (
    <div style={wrapperStyle}>
      <div style={canvasStyle}>
        {items.map(item => (
          <Rnd
            key={item.id}
            style={{ color: item.color, border: isSelected(item.id) ? '1px solid green' : '1px solid rgba(0,255,255, 0.3)' }}
            size={{ width: 100, height: 100 }}
            position={item.position as {x: number, y: number }}
            enableResizing={false}
            onMouseDown={() => selectItem(item.id)}
            onDragStart={(e, d) => startDrag(item)}
            onDragStop={(e, d) => { move(item.id, { x: d.x, y: d.y }); }}
          >
            {item.name}
          </Rnd>
        ))}
      </div>
    </div>
  );
}
