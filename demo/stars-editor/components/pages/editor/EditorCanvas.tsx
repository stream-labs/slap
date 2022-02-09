import React, { CSSProperties } from 'react';
import { Rnd } from 'react-rnd';
import { useModule } from '../../../../../lib';
import { EditorView } from '../../../services/editor';

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
          >
            {item.id}
          </Rnd>
        ))}
      </div>
    </div>
  );
}
