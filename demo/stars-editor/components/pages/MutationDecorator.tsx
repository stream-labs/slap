import React from 'react';
import { injectState, mutation, useModule } from '../../../../lib';

export function MutationsPage() {
  return (
    <div>
      <MutationDecorators />
      <MutationMethods />
    </div>
  );
}


class CounterModuleWithDecorators {

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



export function MutationDecorators () {

  const {
    count, reset, increment, setCount,
  } = useModule(CounterModuleWithDecorators);

  function multiplyBy10() {
    setCount(count * 10);
  }

  return (
    <div>
      <h2>MutationDecorators </h2>
      {count}
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
      <button onClick={multiplyBy10}>Multiply by 10</button>
    </div>
  );
}


class CounterModuleWithMutationMethods {

  state = injectState({
    count: 1,
  });

  reset() {
    this.state.count = 1;
  }

  increment() {
    this.state.count++;
  }

  incrementAndmultiplyBy10() {
    this.increment();
    this.state.count = this.state.count * 10;
  }
}

export function MutationMethods() {
  const {
    count, increment, reset, incrementAndmultiplyBy10,
  } = useModule(CounterModuleWithMutationMethods);

  return (
    <div>
      <h2>MutationMethods</h2>
      {count}
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
      <button onClick={incrementAndmultiplyBy10}>Inc and Multiply by 10</button>
    </div>
  );
}
