import React from 'react';
import { Layout, Menu } from 'antd';
import { WindowService } from '../services/window.service';
import { useModule } from '../../../lib';

export function Header() {
  const { pages, activePage, setActivePage } = useModule(WindowService);

  // const app = useService(AppService);
  // app.pages;

  return (
    <Layout.Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[activePage]}>
        {pages.map(page => (
          <Menu.Item key={page.id} onClick={() => setActivePage(page.id)}>{page.title}</Menu.Item>
        ))}
      </Menu>
    </Layout.Header>
  );
}
