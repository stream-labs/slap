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


  defaultResetValue = 1;

  state = injectState({
    count: this.defaultResetValue,
    count2: 0,
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
    this.state.count = this.defaultResetValue;
  }

  @mutation()
  increment() {
    this.state.count++;
  }

  @mutation()
  setCount2(val: number) {
    this.state.count = 0;
    this.state.count2 = val;
  }
}


export function MutationDecorators () {

  const {
    count, reset, increment, setCount, count2, setCount2
  } = useModule(CounterModuleWithDecorators);

  function multiplyBy10() {
    setCount(count * 10);
  }

  return (
    <div>
      <h2>MutationDecorators </h2>
      <div> count: {count} </div>
      <div> count2: {count2} </div>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
      <button onClick={multiplyBy10}>Multiply by 10</button>
      <button onClick={() => setCount2(count2 + 1)}>Increment 2</button>
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
