import React from 'react';
import ReactDOM from 'react-dom';
import {
  mutation, RedumbxApp, useModule, useScope,
} from '../lib';
import { ModuleRoot } from '../lib/RedumbxApp';
import './index.css';

function CountersApp() {
  return (
    <RedumbxApp>
      <Counter />
      <MultipleCounters />
      <MultipleIndependentCounters />
      TODO
      <MultiplePersistentCounters />
    </RedumbxApp>
  );
}

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
  const { counter, bigCounter } = useModule(CounterModule, view => ({
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
  return (
    <ModuleRoot module={CounterModule}>
      <h1>Multiple counters with shared state</h1>
      <Counter />
      <Counter />
    </ModuleRoot>
  );
}

export function IndependentCounter() {
  return <ModuleRoot module={CounterModule}><Counter /></ModuleRoot>;
}

export function MultipleIndependentCounters() {
  return (
    <>
      <h1>Multiple counters with independent state</h1>
      <IndependentCounter />
      <IndependentCounter />
    </>
  );
}

export class CounterService extends CounterModule {}

export function PersistentCounter() {
  const mm = useScope();
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
