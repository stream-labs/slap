import { Layout } from 'antd';
import React from 'react';
import { EditorMenu } from './EditorMenu';
import { EditorCanvas } from './EditorCanvas';
import { useServiceView } from '../../../../../lib';
import { EditorService } from '../../../services/editor';

export function EditorPage() {
  const { isLoaded } = useServiceView(EditorService);
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
