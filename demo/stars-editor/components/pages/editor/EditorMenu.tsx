import React from 'react';
import { EditorService } from '../../../services/editor.service';
import { useModule } from '../../../../../lib';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export function EditorMenu() {
  const {
    scenes,
    sceneItems,
    activeSceneId,
    activeItemId,
    onItemClick,
    onSceneClick,
  } = useModule(EditorService, editor => ({


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
      <span style={{ color: 'yellow' }}>Selected Item {activeItemId}</span>
      <Menu
        mode="inline"
        selectedKeys={[activeSceneId, activeItemId]}
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
            {sceneItems.filter(item => item.sceneId === scene.id).map(item => (
              <Menu.Item key={item.id}>{item.id}</Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}

      </Menu>
    </div>

  );
}
