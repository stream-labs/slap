import React from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EditorService } from '../../../services/editor';
import { useService } from '../../../../../lib/plugins/useService';

export function EditorMenu() {
  const {
    scenes,
    selectedItemId,
    onItemClick,
    onSceneClick,
    activeSceneId,
  } = useService(EditorService, editor => ({

    get selectedItemId() {
      return editor.activeScene.selectedItemId;
    },

    onSceneClick(ev: { key: string }) {
      editor.getScene(ev.key).makeActive();
    },

    onItemClick(ev: { keyPath: string[]}) {
      const [itemId, sceneId] = ev.keyPath;
      editor.getScene(sceneId).selectItem(itemId);
    },

  }));

  return (
    <div>
      <span style={{ color: 'yellow' }}>Selected Scene {activeSceneId}</span>
      <span style={{ color: 'yellow' }}>Selected Item {selectedItemId}</span>
      <Menu
        mode="inline"
        selectedKeys={[activeSceneId, selectedItemId]}
        style={{ height: '100%', borderRight: 0 }}
        onSelect={onItemClick}
      >
        {scenes.map(scene => (
          <Menu.SubMenu
            key={scene.id}
            icon={<UserOutlined />}
            title={scene.name}
            onTitleClick={onSceneClick}
          >
            {scene.items.map(item => (
              <Menu.Item key={item.id}>{item.id}</Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}

      </Menu>
    </div>

  );
}
