import React from 'react';
import { Layout, Menu } from 'antd';
import { useService } from '../../../lib';
import { AppService } from '../services/app';

export function Header() {
  const { pages, activePage, setActivePage } = useService(AppService);

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
