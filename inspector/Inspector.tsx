import React, {
  CSSProperties, ReactChild, ReactChildren, ReactNode,
} from 'react';
import {
  Card,
  Col, Collapse, Descriptions, Layout, Row,
} from 'antd';
import {
  createApp, ReactModules, TAppContext,
} from '../lib/index';
import './Inspector.css';
import { InspectorService } from './useInspector';
import { NavigationTree, SearchBar } from './components/Navigation';
import { ProviderDetail } from './components/ProviderDetail';
import { StateDetail } from './components/StateDetail';

const { Sider, Content } = Layout;

export function Inspector(p: { inspectedApp: TAppContext}) {
  // useModule(InspectorService);

  const inspectorApp = createApp({ InspectorService });
  inspectorApp.servicesScope.init(InspectorService, p.inspectedApp);

  return (
    <ReactModules app={inspectorApp}>
      <Layout style={{ backgroundColor: 'white' }} className="inspector-root">
        <Sider width="50%" style={{ borderRight: '1px solid #ddd', overflowY: 'auto' }}>
          <SearchBar />
          <NavigationTree />
        </Sider>
        <Content style={{ overflowY: 'auto' }}>
          <ProviderDetail />
          <StateDetail />
        </Content>
      </Layout>
    </ReactModules>

  );

}

export function InspectorHeader(p: { title: string, extra: ReactChild }) {
  const { title, extra } = p;
  const colStyle: CSSProperties = {
    backgroundColor: '#e1e3e4',
    lineHeight: '30px',
    borderBottom: '1px solid #ddd',
    padding: '0 16px',
  };
  return (
    <Row
      wrap={false}
    >
      <Col flex="auto" style={{ ...colStyle, color: '#6A51B2' }}>{title}</Col>
      <Col flex="auto" style={{ ...colStyle, textAlign: 'right' }}>{extra}</Col>
    </Row>
  );
}

export function SidePanel(p: {title?: string, children: ReactNode, isExpanded?: boolean }) {
  const { title, children, isExpanded } = p;

  if (title) {
    return (
      <Collapse className="side-panel-collapse" ghost expandIconPosition="end" defaultActiveKey={isExpanded ? 'panel' : undefined}>
        <Collapse.Panel header={title} key="panel">
          {children}
        </Collapse.Panel>
      </Collapse>
    );
  }

  return <Card bodyStyle={{ padding: '8px 8px' }}>{children}</Card>;
}

export function DescriptionList(p: { items: ({label: string, value: string })[]}) {
  const { items } = p;
  return (
    <Descriptions size="small" column={1}>

      {items.map(item => (
        <Descriptions.Item
          labelStyle={{ color: 'rgba(0,0,0,0.5)' }}
          label={item.label}
          key={item.label}
        >
          {item.value}
        </Descriptions.Item>
      ))}

    </Descriptions>
  );
}
