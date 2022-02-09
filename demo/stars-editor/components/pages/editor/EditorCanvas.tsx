import React, { CSSProperties } from 'react';
import { Rnd } from 'react-rnd';
import { useModule, useServiceView } from '../../../../../lib';
import { EditorService, EditorView } from '../../../services/editor';

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

// class EditorCanvasModule extends ReduxModule {
//   dependencies = { EditorService };
//
//   get items() {
//     return this.deps.EditorService.view.activeScene.items;
//   }
//   // state: {
//   //   items: [1, 2, 3]
//   // };
// }

export function EditorCanvas() {
  const { items } = useModule(EditorView, editor => ({
    get items() {
      return editor.activeScene.items;
    },
  }));

  return (
    <div style={wrapperStyle}>
      <div style={canvasStyle}>
        {items.map(item => (
          <Rnd
            key={item.id}
            style={{ color: item.color, border: item.isSelected ? '1px solid green' : '1px solid rgba(0,255,255, 0.3)' }}
            size={{ width: item.width, height: item.height }}
            position={item.position}
            enableResizing={false}
            onMouseDown={() => item.selectItem()}
            onDragStop={(e, d) => { item.move({ x: d.x, y: d.y }); }}
            // onResizeStop={(e, direction, ref, delta, position) => {
            //   item.update({
            //     width: parseInt(ref.style.width, 10),
            //     height: parseInt(ref.style.height, 10),
            //     ...position,
            //   });
            // }}
          >
            {item.id}
          </Rnd>
        ))}
      </div>
    </div>
  );
}
