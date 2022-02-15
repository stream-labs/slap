import React from 'react';
import ReactDOM from 'react-dom';
import { RedumbxApp } from '../lib';
import './index.css';
import { CounterService, MultiplePersistentCounters } from './counters-app';
import { createModuleManager } from '../lib/module-manager';
import { Scope } from '../lib/scope';

export function TwoApps(p: { moduleManager: Scope }) {
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
  const counterService = moduleManager.resolve(CounterService);
  counterService.increment();
  ReactDOM.render(<TwoApps moduleManager={moduleManager} />, document.getElementById('app'));
}

main();


// export function TwoApps() {
//   return (
//     <>
//       <RedumbxApp>
//         <MultiplePersistentCounters />
//       </RedumbxApp>
//       <RedumbxApp>
//         <MultiplePersistentCounters />
//       </RedumbxApp>
//     </>
//   );
// }
//
// function main() {
//   // const moduleManager = createModuleManager({ CounterService });
//   // const counterService = moduleManager.resolve(CounterService);
//   // counterService.increment();
//   ReactDOM.render(<TwoApps />, document.getElementById('app'));
// }
//
// main();

