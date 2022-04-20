import { Layout } from 'antd';
import React from 'react';
import { EditorMenu } from './EditorMenu';
import { EditorCanvas } from './EditorCanvas';
import { EditorService } from '../../../services/editor.service';
import { useModule } from '../../../../../lib';
import { ItemProps } from './ItemProps';

export function EditorPage() {
  useModule(EditorService);
  const isLoading = false;
  return (
    <>
      {isLoading && 'loading...'}
      {!isLoading && (
      <Layout>
        <Layout.Sider width={200} className="site-layout-background">
          <EditorMenu />
        </Layout.Sider>
        <Layout>
          <Layout.Content>
            <EditorCanvas />
          </Layout.Content>
        </Layout>
        <Layout.Sider width={200} className="site-layout-background">
          <ItemProps />
        </Layout.Sider>
      </Layout>
      )}
    </>

  );
}
