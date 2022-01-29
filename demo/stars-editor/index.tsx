import ReactDOM from 'react-dom';
import React from 'react';
import { moduleManager, Services } from './services/service-provider';
import { RedumbxApp } from '../../lib';
import { App } from './components/App';
import 'antd/dist/antd.css';

function main() {
  const app = Services.AppService;
  app.init();

  ReactDOM.render(
    <RedumbxApp moduleManager={moduleManager}>
      <App />
    </RedumbxApp>,
    document.getElementById('app'),
  );
}

main();
