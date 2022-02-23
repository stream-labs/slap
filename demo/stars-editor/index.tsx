import ReactDOM from 'react-dom';
import React from 'react';
import {
  RedumbxApp, Scope, Store,
} from '../../lib';
import { App } from './components/App';
import { AppService } from './services/app';
import { ApiService } from './services/api';
import { EditorService } from './services/editor';
import 'antd/dist/antd.css';
import { RemoteStoreServer } from '../../lib/plugins/RemoteStoreServer';
import { PostMessageListener } from '../../lib/plugins/PostMessageListener';
import { RemoteStoreClient } from '../../lib/plugins/RemoteStoreClient';
import { PostMessageTransport } from '../../lib/plugins/PostMessageTransport';
import { RemoteStore } from '../../lib/plugins/RemoteStore';

function main() {
  // just replace deps to change the store that needs to sync

  const remoteServices = {
    AppService, // add navigation service
    ApiService,
    EditorService,
    RemoteStore,
  };

  const isChild = window.location.href.includes('?id=child');

  // create the worker app
  if (!isChild) {
    const server = new Scope({ Store, RemoteStoreServer });
    server.init(Store);
    server.init(RemoteStoreServer, PostMessageListener, remoteServices);
    server.init(AppService);
    ReactDOM.render(
      <div>
        <a onClick={openChildWindow}>Open a Child window</a>
      </div>,
      document.getElementById('app'),
    );
  }

  // create client app
  if (isChild) {
    const app = new Scope({ Store, RemoteStoreClient });
    app.init(Store, { isRemote: true });
    app.init(RemoteStoreClient, PostMessageTransport, remoteServices);
    ReactDOM.render(
      <RedumbxApp moduleManager={app}>
        <App />
      </RedumbxApp>,
      document.getElementById('app'),
    );
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

function openChildWindow() {
  const myWindow = window.open('?id=child', '_blank');
}
