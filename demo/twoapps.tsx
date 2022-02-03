import React from 'react';
import ReactDOM from 'react-dom';
import { RedumbxApp } from '../lib';
import './index.css';
import { CounterService, MultiplePersistentCounters } from './counters-app';
import { createModuleManager, ModuleManager } from '../lib/module-manager';

export function TwoApps(p: { moduleManager: ModuleManager }) {
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
  const counterService = moduleManager.getService(CounterService);
  counterService.increment();
  ReactDOM.render(<TwoApps moduleManager={moduleManager} />, document.getElementById('app'));
}

main();

