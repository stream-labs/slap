import { Menu } from 'antd';
import React from 'react';
import { useModule } from '../../lib';
import { InspectorService, ProviderModel, TempAny } from '../useInspector';




export function Logs() {

  const {} = useModule(InspectorService);

  return (
    <Menu
      selectable
      items={items}
      mode="inline"
      onClick={menuClickHandler}
      selectedKeys={[selectedMenuKey]}
      openKeys={expandedMenuKeys}
      onOpenChange={keys => setExpandedMenuKeys(keys)}
    />
  );
}
