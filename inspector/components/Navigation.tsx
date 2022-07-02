import { Menu, Tag, Tree } from 'antd';
import React from 'react';
import { DataNode } from 'rc-tree/lib/interface';
import { SearchOutlined } from '@ant-design/icons';
import { useModule } from '../../lib';
import { InspectorService, ProviderModel, TempAny } from '../inspector-service';
import { TextInput } from '../../demo/stars-editor/components/pages/editor/ItemProps';
//
// export function Navigation() {
//   const {
//     providers,
//     setSelectedMenuKey,
//     selectedMenuKey,
//     expandedMenuKeys,
//     setExpandedMenuKeys,
//     persistentSettings,
//     storeModules,
//   } = useModule(InspectorService);
//
//   console.log('persistentSettings', persistentSettings);
//
//   function getProviderMenuItem(p: ProviderModel) {
//     return {
//       label: p.shortName,
//       key: `provider__${p.id}`,
//     };
//   }
//
//   function menuClickHandler(info: TempAny) {
//     setSelectedMenuKey(info.key);
//   }
//
//   const items = [
//     {
//       label: 'Logs',
//       key: 'logs',
//     },
//     {
//       label: 'Services',
//       key: 'services',
//       children: providers.filter(p => p.isService).map(getProviderMenuItem),
//     },
//     {
//       label: 'Modules',
//       key: 'modules',
//       children: providers.filter(p => !p.isService).map(getProviderMenuItem),
//     },
//     {
//       label: 'Components',
//       key: 'components',
//       children: [],
//     },
//     {
//       label: 'Store',
//       key: 'store',
//       children: storeModules.map(m => ({ key: `store__${m.id}`, label: m.id })),
//     },
//   ];
//
//   return (
//     <Menu
//       selectable
//       items={items}
//       mode="inline"
//       onClick={menuClickHandler}
//       selectedKeys={[selectedMenuKey]}
//       openKeys={expandedMenuKeys}
//       onOpenChange={keys => setExpandedMenuKeys(keys)}
//     />
//   );
// }

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

  function getProviderMenuItem(p: ProviderModel): DataNode {
    const isStatefulModule = p.id.includes('StatefulModule');
    const title = isStatefulModule ? 'State' : p.shortName;
    const children = !isStatefulModule && p.childProviders.length
      ? p.childProviders.map(getProviderMenuItem)
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
        .map(getProviderMenuItem),
    },
    {
      title: 'Modules',
      key: 'modules',
      children: Object.values(providers)
        .filter(p => !p.isService && !p.isChild)
        .map(getProviderMenuItem),
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
