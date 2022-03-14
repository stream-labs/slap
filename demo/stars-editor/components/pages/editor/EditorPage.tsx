import { Layout } from 'antd';
import React from 'react';
import { EditorMenu } from './EditorMenu';
import { EditorCanvas } from './EditorCanvas';
import { EditorService } from '../../../services/editor.service';
import { useModule } from '../../../../../lib';

export function EditorPage() {
  const { isLoaded } = useModule(EditorService);
  return (
    <>
      {!isLoaded && 'loading...'}
      {isLoaded && (
      <Layout>
        <Layout.Sider width={200} className="site-layout-background">
          <EditorMenu />
        </Layout.Sider>
        <Layout>
          <Layout.Content>
            <EditorCanvas />
          </Layout.Content>
        </Layout>
      </Layout>
      )}
    </>

  );
}
