import React from 'react';
import { injectState, useModule } from '../../../../lib';

class BaseState {

  foo = 1;
  bar = 2;

}

class ChildState extends BaseState {

  zoom = 3;
  farZoom = 2;

  incrementZoom() {
    this.zoom++;
  }
}

class ExtendedStateModule {

  state = injectState(ChildState);

}

export function ExtendedStatePage () {
  const { foo, zoom, incrementZoom } = useModule(ExtendedStateModule);

  return (
    <div>foo: {foo} Zoom: {zoom} <button onClick={incrementZoom}>increment</button></div>
  );
}
