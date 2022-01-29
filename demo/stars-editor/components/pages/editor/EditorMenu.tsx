import { Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useServiceView } from '../../../../../lib';
import { EditorService } from '../../../services/editor';

export function EditorMenu() {
  const { setActiveScene, activeScene, activeSceneId, scenes } = useServiceView(EditorService);

  return (
    <Menu
      mode="inline"
      selectedKeys={[activeSceneId]}
      style={{ height: '100%', borderRight: 0 }}
    >
      {scenes.map(scene => (
        <Menu.SubMenu key={scene.state.id} icon={<UserOutlined />} title={scene.state.name}>
          {scene.state.items.map(item => (
            <Menu.Item key={item.id}>{item.id}</Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}

    </Menu>
  );
}
