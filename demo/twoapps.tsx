import React from 'react';
import ReactDOM from 'react-dom';
import { createModuleManager, RedumbxApp, ReduxModuleManager } from '../lib';
import './index.css';
import { CounterService, MultiplePersistentCounters } from './counters-app';

export function TwoApps(p: { moduleManager: ReduxModuleManager }) {
  return (
    <>
      <RedumbxApp>
        <MultiplePersistentCounters />
      </RedumbxApp>
      <RedumbxApp moduleManager={p.moduleManager}>
        <MultiplePersistentCounters />
      </RedumbxApp>
    </>
  );
}

function main() {
  const moduleManager = createModuleManager({ CounterService });
  const counterService = moduleManager.inject(CounterService);
  counterService.increment();
  ReactDOM.render(<TwoApps moduleManager={moduleManager} />, document.getElementById('app'));
}

main();

