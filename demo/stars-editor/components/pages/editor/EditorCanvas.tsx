import React, { CSSProperties } from 'react';
import { Rnd } from 'react-rnd';
import { useService } from '../../../../../lib';
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


export function EditorCanvas() {
  // TODO make sure its reactive
  // const { activeScene } = useService(EditorService);
  //
  // const items = activeScene.items;

  return (
    <div style={wrapperStyle}>
      <div style={canvasStyle}>
        {/* {items.map(item => ( */}
        {/*   <Rnd */}
        {/*     key={item.id} */}
        {/*     style={{ color: item.color, border: `1px solid ${item.color}` }} */}
        {/*     size={{ width: 100, height: 100 }} */}
        {/*     position={item.position} */}
        {/*     // onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }} */}
        {/*     // onResizeStop={(e, direction, ref, delta, position) => { */}
        {/*     //   this.setState({ */}
        {/*     //     width: ref.style.width, */}
        {/*     //     height: ref.style.height, */}
        {/*     //     ...position, */}
        {/*     //   }); */}
        {/*     // }} */}
        {/*   > */}
        {/*     {item.id} */}
        {/*   </Rnd> */}
        {/* ))} */}
      </div>
    </div>
  );
}
