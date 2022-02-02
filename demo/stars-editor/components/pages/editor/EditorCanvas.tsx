import React, { CSSProperties } from 'react';
import { Rnd } from 'react-rnd';
import { useServiceView } from '../../../../../lib';
import { EditorService } from '../../../services/editor';

const wrapperStyle: CSSProperties = {
  height: '100%',
  width: '100%',
  backgroundColor: '#D2D2D2',
};

const canvasStyle: CSSProperties = {
  position: 'relative',
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
  const { items } = useServiceView(EditorService, editor => ({
    get items() {
      return editor.activeScene.itemViews;
    },
  }));

  return (
    <div style={wrapperStyle}>
      <div style={canvasStyle}>
        {items.map(item => (
          <Rnd
            key={item.id}
            style={{ color: item.color, border: `1px solid ${item.color}`, outline: '1px solid green' }}
            size={{ width: 100, height: 100 }}
            position={item.position}
            onDragStop={(e, d) => { item.move({ x: d.x, y: d.y }); }}
            // onResizeStop={(e, direction, ref, delta, position) => {
            //   this.setState({
            //     width: ref.style.width,
            //     height: ref.style.height,
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
