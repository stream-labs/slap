import { Menu, Tag, Tree } from 'antd';
import React from 'react';
import { DataNode } from 'rc-tree/lib/interface';
import { SearchOutlined } from '@ant-design/icons';
import { useModule } from '../../lib';
import { InspectorService, ProviderModel, TempAny } from '../inspector.service';
import { TextInput } from '../../demo/stars-editor/components/pages/editor/ItemProps';

export function NavigationTree() {
  const {
    providers,
    setSelectedMenuKey,
    selectedMenuKey,
    expandedMenuKeys,
    setExpandedMenuKeys,
    persistentSettings,
    storeModules,
  } = useModule(InspectorService);

  function getProviderMenuItem(id: string): DataNode {
    const p = providers[id];
    if (!p) {
      return {
        title: <span> unloaded {id} </span>,
        key: `provider__${id}`,
      };
    }

    const isStatefulModule = p.id.includes('StatefulModule');
    const title = isStatefulModule ? 'State' : p.shortName;
    const children = !isStatefulModule && p.childIds.length
      ? p.childIds.map(getProviderMenuItem)
      : undefined;
    const areChildrenHaveState = p.hasState && !isStatefulModule;

    let className = p.isInited ? '' : 'not-inited-module';
    if (isStatefulModule) className += ' is-stateful-module';

    return {
      title: <span className={className}>{title} {areChildrenHaveState && <Tag color="orange">Stateful</Tag>}</span>,
      key: `provider__${p.id}`,
      children,
    };
  }

  function onSelectHandler(selectedKeys: TempAny[]) {
    setSelectedMenuKey(selectedKeys[0]);
  }

  const treeData = [
    {
      title: 'Services',
      key: 'services',
      children: Object.values(providers)
        .filter(p => p.isService)
        .map(p => getProviderMenuItem(p.id)),
    },
    {
      title: 'Modules',
      key: 'modules',
      children: Object.values(providers)
        .filter(p => !p.isService && !p.parentId)
        .map(p => getProviderMenuItem(p.id)),
    },
    {
      title: 'Components',
      key: 'components',
      children: [],
    },
    {
      title: 'Store',
      key: 'store',
      children: Object.values(providers)
        .filter(p => p.moduleType === 'state')
        .map(m => ({ key: `store__${m.id}`, title: m.id })),
    },
  ];

  return (
    <Tree
      className="nav-tree"
      treeData={treeData}
      onSelect={onSelectHandler}
      selectedKeys={[selectedMenuKey]}
      expandedKeys={expandedMenuKeys}
      onExpand={keys => setExpandedMenuKeys(keys as string[])}
      // rootStyle={{ color: '#008777' }}
    />
  );
}

export function SearchBar() {
  return (
    <TextInput
      prefix={<SearchOutlined style={{ color: '#999' }} />}
      value=""
      bordered={false}
      style={{ borderBottom: '1px solid #ddd' }}
    />
  );
}
