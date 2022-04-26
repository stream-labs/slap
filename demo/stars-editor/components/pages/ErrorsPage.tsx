import React from 'react';
import {
  injectState, useModule,
} from '../../../../lib';

class MyModule {
  state = injectState({
    count: 0,
    increment() {
      this.count++;
    },
  });
}

export function ErrorsPage() {

  return (
    <div>
      <CounterWithoutError />
      <CounterWithError />
      <CounterWithoutError />
    </div>
  );
}


function CounterWithoutError() {
  const { count, increment } = useModule(MyModule, true);
  return <div>Count: {count}<button onClick={increment}>+</button></div>;
}

function CounterWithError() {
  const { count, increment } = useModule(MyModule, true).extend(() => ({
    init() {
      throw new Error('Init error');
    }
  }));
  return <div>Count1 {count}<button onClick={increment}>+</button></div>;
}
