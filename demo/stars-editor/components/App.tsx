import React from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import { EditorPage } from './pages/editor/EditorPage';
import { useServiceView } from '../../../lib';
import { AppService } from '../services/app';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const { activePage } = useServiceView(AppService);

  return (
    <Layout style={{ height: '100%' }}>
      <Header />
      {activePage === 'editor' && <EditorPage /> }
      {activePage === 'about' && <AboutPage /> }
    </Layout>
  );
}
