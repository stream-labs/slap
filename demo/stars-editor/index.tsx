import ReactDOM from 'react-dom';
import React from 'react';
import { RedumbxApp } from '../../lib';
import { App } from './components/App';
import { AppService } from './services/app';
import { ApiService } from './services/api';
import { EditorService } from './services/editor';
import 'antd/dist/antd.css';
import { createModuleManager } from '../../lib/module-manager';

function main() {
  const moduleManager = createModuleManager({
    AppService,
    ApiService,
    EditorService,
  });

  const app = moduleManager.getService(AppService);
  app.start();

  ReactDOM.render(
    <RedumbxApp moduleManager={moduleManager}>
      <App />
    </RedumbxApp>,
    document.getElementById('app'),
  );
}

main();
