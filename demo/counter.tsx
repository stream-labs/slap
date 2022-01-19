import React from 'react';
import { mutation, useModule } from '../lib';

class CounterModule {
  state = {
    counter: 1,
  };

  @mutation()
  increment() {
    this.state.counter++;
  }

  @mutation()
  decrement() {
    this.state.counter--;
  }
}

export function Counter() {
  const { counter, increment, decrement } = useModule(CounterModule);
  return (
    <div>
      Counter Value =
      {counter}
      <button onClick={increment}>Decrement</button>
      <button onClick={decrement}>Increment</button>
    </div>
  );
}
