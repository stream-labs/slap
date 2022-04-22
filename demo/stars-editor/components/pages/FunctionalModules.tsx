import React from 'react';
import { injectState, useModule } from '../../../../lib';

export function FunctionalModulesPage() {
  return (
    <div>
      <FunctionalComp />
      <RenamedFunctionalComp />
    </div>
  );
}

function MyFunctionalModule() {

  const state = injectState({
    count: 1,
  });

  function increment() {
    state.setCount(state.count + 1);
  }

  function reset() {
    state.setCount(1);
  }

  return { state, reset, increment };
}

export function FunctionalComp() {

  const { count, reset, increment } = useModule(MyFunctionalModule);

  return (
    <div>
      <h2>MyFunctionalModule </h2>
      {count}
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export function RenamedFunctionalComp() {

  const { count, reset, increment } = useModule(MyFunctionalModule, [], 'MyModuleName');

  return (
    <div>
      <h2>RenamedFunctionalComp</h2>
      {count}
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
