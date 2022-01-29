import React from 'react';
import ReactDOM from 'react-dom';
import { createModuleManager, RedumbxApp } from '../lib';
import { CounterService, MultiplePersistentCounters } from './counters-app';
import './index.css';

const moduleManager = createModuleManager();


export function TwoApps() {
  return (
    <>
      <RedumbxApp>
        <MultiplePersistentCounters />
      </RedumbxApp>
      <RedumbxApp moduleManager={moduleManager}>
        <MultiplePersistentCounters />
      </RedumbxApp>
    </>
  );
}

function main() {
  const Services = moduleManager.registerServices({ CounterService });
  Services.CounterService.increment();
  ReactDOM.render(<TwoApps />, document.getElementById('app'));
}

main();

