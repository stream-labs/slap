import React from 'react';
import { injectState, mutation, useModule } from '../../../../lib';

class CounterModule {

  state = injectState({
    count: 1,
  });

  // timerState = injectState({
  //   timer: 10,
  // });

  init() {
    this.reset();
    this.state.setCount(2);
  }

  @mutation()
  reset() {
    this.state.count = 1;
  }

  @mutation()
  increment() {
    this.state.count++;
  }
}

export function MutationDecoratorPage () {

  const {
    count, reset, increment, setCount,
  } = useModule(CounterModule);

  function multiplyBy10() {
    setCount(count * 10);
  }

  return (
    <div>
      {count}
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
      <button onClick={multiplyBy10}>Multiply by 10</button>
    </div>
  );
}
