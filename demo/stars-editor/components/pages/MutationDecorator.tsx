import React from 'react';
import { injectState, mutation, useModule } from '../../../../lib';

class CounterModule {

  state = injectState({
    count: 0,
  });

  load() {
    this.reset();
  }

  @mutation()
  reset() {
    this.state.count = 0;
  }

  @mutation()
  increment() {
    this.state.count++;
  }
}

export function MutationDecoratorPage () {

  const { count, reset, increment } = useModule(CounterModule);

  return (
    <div>
      {count}
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
