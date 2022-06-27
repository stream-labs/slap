import React from 'react';
import ReactDOM from 'react-dom';
import { createApp, ReactModules } from '../lib';
import './index.css';
import { TodoList } from './todo-list-app';
import { Layout } from 'antd';
import { Inspector } from '../inspector/Inspector';

const { Footer, Content } = Layout;

export function TodoListApp() {
  const app = createApp();
  return (
    <ReactModules app={app}>
      <Layout style={{ height: '100%' }}>
        <Content><TodoList /></Content>
        <Footer style={{ padding: 0, height: '50%', border: '1px solid #ddd' }}>
          <Inspector inspectedApp={app} />
        </Footer>
      </Layout>
    </ReactModules>
  );
}

ReactDOM.render(<TodoListApp />, document.getElementById('app'));
