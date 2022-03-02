import React from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import { EditorPage } from './pages/editor/EditorPage';
import { AppService } from '../services/app';
import { AboutPage } from './pages/AboutPage';
import { useService } from '../../../lib/plugins/useService';

export function ClientApp() {
  const { activePage } = useService(AppService);

  return (
    <Layout style={{ height: '100%' }}>
      <Header />
      {activePage === 'editor' && <EditorPage /> }
      {activePage === 'about' && <AboutPage /> }
    </Layout>
  );
}
