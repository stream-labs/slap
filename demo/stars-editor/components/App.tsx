import React from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import { EditorPage } from './pages/editor/EditorPage';
import { useModule } from '../../../lib';
import { AppService } from '../services/app';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const { activePage } = useModule(AppService);

  console.log('render page', activePage);

  return (
    <Layout style={{ height: '100%' }}>
      <Header />
      {activePage === 'editor' && <EditorPage /> }
      {activePage === 'about' && <AboutPage /> }
    </Layout>
  );
}
