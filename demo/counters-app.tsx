import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { injectState, useModule, ReactModules, useAppContext } from '../lib';

function CountersApp() {
  return (
    <ReactModules>
      <Counter />
      <MultipleCounters />
      {/* <MultipleIndependentCounters /> */}
      <MultipleIndependentCountersV2 />
      TODO
      {/* <MultiplePersistentCounters /> */}
    </ReactModules>
  );
}

class CounterModule {

  constructor(public initialValue = 0) {
  }

  state = injectState({
    counter: this.initialValue,

    increment() {
      this.counter++;
    },

    decrement() {
      this.counter--;
    },
  });

}

export function Counter() {
  const { counter, bigCounter } = useModule(CounterModule).extend(view => ({
    get bigCounter() {
      return view.counter + 10;
    },
  }));

  console.log('update root counter');
  // const { counter } = useModule(CounterModule);
  return (
    <div>
      Counter Value =
      {counter}
      BigCounter Value =
      {bigCounter}
      <CounterButtons />
    </div>
  );
}

export function CounterButtons() {
  const { increment, decrement } = useModule(CounterModule);
  console.log('update buttons');
  return (
    <>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </>
  );
}

export function MultipleCounters() {
  useModule(CounterModule, true);
  return (
    <>
      <h1>Multiple counters with shared state</h1>
      <Counter />
      <Counter />
    </>
  );
}

// export function IndependentCounter() {
//   return <SlapModuleRoot module={CounterModule}><Counter /></SlapModuleRoot>;
// }

export function IndependentCounterV2() {
  useModule(CounterModule, [33]);
  return <Counter />;
}

//
// export function MultipleIndependentCounters() {
//   return (
//     <>
//       <h1>Multiple counters with independent state</h1>
//       <IndependentCounter />
//       <IndependentCounter />
//     </>
//   );
// }

export function MultipleIndependentCountersV2() {
  return (
    <>
      <h1>Multiple counters with independent state V2</h1>
      <IndependentCounterV2 />
      <IndependentCounterV2 />
    </>
  );
}

export class CounterService extends CounterModule {}

export function PersistentCounter() {
  const mm = useAppContext().servicesScope;
  if (!mm.isRegistered(CounterService)) mm.register(CounterService);
  const { counter, decrement, increment } = useModule(CounterService);
  return (
    <div>
      Counter Value =
      {counter}
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export function MultiplePersistentCounters() {
  return (
    <>
      <h1>Multiple counters with persistent state</h1>
      <PersistentCounter />
      <PersistentCounter />
    </>
  );
}

ReactDOM.render(<CountersApp />, document.getElementById('app'));
