import ReactDOM from 'react-dom';
import React from 'react';
import { createModuleManager, RedumbxApp } from '../../lib';
import { App } from './components/App';
import { AppService } from './services/app';
import { ApiService } from './services/api';
import { EditorService } from './services/editor';
import 'antd/dist/antd.css';
import { RemoteStoreServer } from '../../lib/plugins/RemoteStoreServer';
import { PostMessageListener } from '../../lib/plugins/PostMessageListener';
import { RemoteStoreClient } from '../../lib/plugins/RemoteStoreClient';
import { PostMessageClient } from '../../lib/plugins/PostMessageClient';
// import { createModuleManager } from '../../lib/module-manager';

function main() {
  const moduleManager = createModuleManager({
    AppService,
    ApiService,
    EditorService,
  });

  const isChild = window.location.href.includes('?id=child');

  if (isChild) {
    moduleManager.register(RemoteStoreClient);
    moduleManager.init(RemoteStoreClient, PostMessageClient);
  } else {
    moduleManager.register(RemoteStoreServer);
    moduleManager.init(RemoteStoreServer, PostMessageListener);
    moduleManager.init(AppService);
  }


  ReactDOM.render(
    <RedumbxApp moduleManager={moduleManager}>
      <App />
    </RedumbxApp>,
    document.getElementById('app'),
  );
}

main();
