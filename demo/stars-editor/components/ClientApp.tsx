import React from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import { EditorPage } from './pages/editor/EditorPage';
import { AboutPage } from './pages/AboutPage';
import { WindowService } from '../services/window.service';
import { useModule } from '../../../lib';
import { HighloadPage } from './pages/HighloadPage';

export function ClientApp() {
  const { isLoading, activePage } = useModule(WindowService);

  console.log('render root isLoading', isLoading);

  if (isLoading) return <div>App loading...</div>;

  return (
    <Layout style={{ height: '100%' }}>
      <Header />
      {activePage === 'editor' && <EditorPage /> }
      {activePage === 'about' && <AboutPage /> }
      {activePage === 'highload' && <HighloadPage /> }
    </Layout>
  );
}
