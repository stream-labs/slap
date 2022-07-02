import React from 'react';
import ReactDOM from 'react-dom';
import { createApp, Provider, ReactModules, useOnCreate } from '../lib';
import './index.css';
import { TodoList } from './todo-list-app';
import { Button, Layout } from 'antd';
import { Inspector } from '../inspector';
import { startInspectorInWindow } from '../inspector/inspector-server';
import { ApiClient } from '../lib/utils/remote/api-client';
import { connectPostMessageClient } from '../lib/utils/remote/post-message-transport';
import { IntrospectionApi } from '../lib/utils/remote/introspection-api';
import { ProviderModel, TempAny } from '../inspector/inspector-service';

const { Footer, Content } = Layout;

export function TodoListApp() {
  // const app = createApp();
  // useOnCreate(async () => {
  //
  //   const inspectedWin = window.opener;
  //   const connection = await connectPostMessageClient(inspectedWin);
  //   const api = new ApiClient(connection);
  //   await api.connect();
  //   const inspectorApi = api.getService(IntrospectionApi);
  //   await api.subscribe('InspectorApi', 'scopeEvents', 'onModuleInit', (provider: TempAny) => {
  //     console.log('onModuleInit', provider);
  //   });
  //   await api.subscribe('InspectorApi', 'scopeEvents', 'onModuleRegister', (provider: TempAny) => {
  //     console.log('onModuleRegister', provider);
  //   });
  //   // const providers = await core.getProviders();
  //   // console.log('fetched providers', providers);
  // });
  return (
    <Inspector />
  );

}

ReactDOM.render(<TodoListApp />, document.getElementById('app'));
