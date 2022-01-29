import { Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useService } from '../../../../../lib';
import { EditorService } from '../../../services/editor';

export function EditorMenu() {
  const { scenes, activeSceneId } = useService(EditorService);

  return (
    <Menu
      mode="inline"
      selectedKeys={[activeSceneId]}
      style={{ height: '100%', borderRight: 0 }}
    >
      {scenes.map(scene => (
        <Menu.SubMenu key={scene.id} icon={<UserOutlined />} title={scene.name}>
          {scene.items.map(item => (
            <Menu.Item key={item.id}>{item.id}</Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}

    </Menu>
  );
}
