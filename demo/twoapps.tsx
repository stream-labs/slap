import React from 'react';
import ReactDOM from 'react-dom';
import { createApp, ReactModules } from '../lib';
import './index.css';
import { CounterService, MultiplePersistentCounters } from './counters-app';
import { Scope } from '../lib/scope/scope';

export function TwoApps() {
  return (
    <>
      <ReactModules>
        <MultiplePersistentCounters />
      </ReactModules>
      <ReactModules>
        <MultiplePersistentCounters />
      </ReactModules>
    </>
  );
}

function main() {
  ReactDOM.render(<TwoApps/>, document.getElementById('app'));
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

