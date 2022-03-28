import ReactDOM from 'react-dom';
import React from 'react';
import {
  createApp,
  ReactModules, Scope
} from '../../lib';
import { AppService } from './services/app.service';
import 'antd/dist/antd.css';
import { ServerApp } from './components/ServerApp';
import { BootstrapService } from '../../lib/slapp/bootstrap.service';
import { ClientApp } from './components/ClientApp';
import { EditorService } from './services/editor.service';
import { WindowService } from './services/window.service';

function main() {

  // // allow other windows to communicate with services
  // const remoteServices = {
  //   AppService, // add navigation service
  //   UsersService,
  // };

  const isChild = window.location.href.includes('?id=child');

  // create the worker app
  if (!isChild) {
    // // rxdb app
    // const server = new Scope();
    // server.start(BootstrapService, AppService);

    const app = createApp({ AppService, WindowService, EditorService });

    ReactDOM.render(
      <ReactModules app={app}>
        <ClientApp />
      </ReactModules>,
      document.getElementById('app'),
    );
  }

  // create client app
  if (isChild) {
    // const app = new Scope({ Store, RemoteStoreClient });
    // app.init(Store, { isRemote: true });
    // app.init(RemoteStoreClient, PostMessageTransport, remoteServices);
    // app.resolve(DBService).createDB();
    // ReactDOM.render(
    //   <RedumbxApp moduleManager={app}>
    //     <ClientApp />
    //   </RedumbxApp>,
    //   document.getElementById('app'),
    // );
  }

  // const app = isChild ? createClientApp() : createServerApp();
  //
  // function createServerApp() {
  //   const app = new Scope({ ...remoteServices, Store, RemoteStoreServer });
  //   app.init(Store);
  //   app.init(RemoteStoreServer, PostMessageListener);
  //   app.init(AppService);
  //   return app;
  // }
  //
  // ReactDOM.render(
  //   <RedumbxApp moduleManager={app}>
  //     <App />
  //   </RedumbxApp>,
  //   document.getElementById('app'),
  // );
}

main();
//
//
// function createSlappServer() {
//   const server = new Scope();
//   server.start(AppService);
// }
