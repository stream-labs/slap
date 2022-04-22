import React from 'react';
import { GetUseModuleResult, injectState, useModule } from '../../../../lib';

export function FunctionalModulesPage() {
  return (
    <div>
      <FunctionalComp />
      <RenamedFunctionalComp />
    </div>
  );
}

function FuncModule1(initialCount = 1) {

  const state = injectState({
    count: initialCount,
  });

  function increment() {
    state.setCount(state.count + 1);
  }

  function multiply() {
    state.setCount(state.count * 10);
  }

  function reset() {
    state.setCount(1);
  }

  return { state, reset, increment, multiply };
}

export function FunctionalComp() {

  const { count, reset, increment } = useModule(FuncModule1);

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

  const { multiply } = useModule(FuncModule1, [55], 'FuncModule2');

  return (
    <div>
      <Header />
      <Buttons />
      <button onClick={multiply}>Multiply</button>
    </div>
  );
}

function Header() {
  const { count } = useModule('FuncModule2') as GetUseModuleResult<typeof FuncModule1>;

  return (
    <div>
      <h2>RenamedFunctionalComp</h2>
      {count}
    </div>
  );
}

function Buttons() {
  const { increment, reset } = useModule('FuncModule2') as GetUseModuleResult<typeof FuncModule1>;

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
