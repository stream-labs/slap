import {
  Collapse, Descriptions, PageHeader, Tag, Row, Layout, Button, Card, Tooltip,
} from 'antd';
import React, { useState } from 'react';
import { RightSquareOutlined } from '@ant-design/icons';
import { useModule } from '../../lib';
import { InspectorService, ProviderModel } from '../useInspector';
import { DescriptionList, InspectorHeader, SidePanel } from '../Inspector';
import { StateInspector } from './StateDetail';

const { Panel } = Collapse;
const { Header, Content } = Layout;

export function ProviderDetail() {
  const { selectedProvider, inspectProvider } = useModule(InspectorService);
  if (!selectedProvider) return <div />;

  const provider = selectedProvider;
  return (
    <Layout style={{ height: '100%' }}>
      <InspectorHeader
        title={provider.shortName}
        extra={(
          <Tooltip title="Expose this module to the developer's console" placement="left">
            <RightSquareOutlined style={{ cursor: 'pointer' }} onClick={() => inspectProvider(selectedProvider.id)} />
          </Tooltip>
        )}
      />

      <Content><ProviderDetailContent provider={provider} /></Content>

    </Layout>
  );
}

function ProviderDetailContent(p: { provider: ProviderModel, isCompactMode?: boolean }) {
  const { provider, isCompactMode } = p;
  const [isChildrenVisible, setIsChildrenVisible] = useState(false);
  const childProviders = provider.childProviders;
  const childrenCnt = childProviders.length;
  const shouldShowChildModulesSwitcher = isCompactMode && childrenCnt;
  const shouldShowChildModules = (!isCompactMode || isChildrenVisible) && !!childrenCnt;

  return (
    <>

      <SidePanel>
        <ProviderTags provider={provider} />
      </SidePanel>

      {provider.moduleType !== 'state' && (
        <SidePanel>
          <DescriptionList
            items={[
              { label: 'id', value: provider.id },
              { label: 'Name', value: provider.name },
            ]}
          />
        </SidePanel>
      )}

      {provider.moduleType === 'state' && (
        <StateInspector stateId={provider.id} key={provider.id} />
      )}

      {shouldShowChildModules && (
      <SidePanel title={`Child Modules (${childProviders.length})`}>
          {childProviders.map(child => (
            <div key={child.id}>
              {child.shortName} <ProviderTags provider={child} />
            </div>
          ))}

      </SidePanel>
      )}

      {shouldShowChildModulesSwitcher && (
        <>
          {!isChildrenVisible && <a onClick={() => setIsChildrenVisible(true)}>Show child modules ({childrenCnt})</a>}
          {isChildrenVisible && <a onClick={() => setIsChildrenVisible(false)}>Hide child modules</a>}
        </>
      )}
    </>
  );
}

function ProviderTags(p: {provider: ProviderModel}) {
  const { provider } = p;
  return (
    <>
      {provider.isInited && <Tag color="green">INITIALIZED</Tag>}
      {!provider.isInited && <Tag color="gray">NOT INITIALIZED</Tag>}
      {provider.hasState && <Tag color="orange">STATEFUL</Tag>}
    </>
  );
}
