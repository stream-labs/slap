import React from 'react';
import { Layout } from 'antd';
import { useModule } from '../../lib';
import { InspectorService, ProviderModel } from '../inspector.service';
import { PanelHeader } from './PanelHeader';
import { LoggerService } from '../logger.service';

const { Content } = Layout;

export function Logs() {

  const { logs } = useModule(LoggerService);

  return (

    <Layout>
      <PanelHeader title="Logs" />
      <Content>
        {logs.map(log => <div key={log.id}>{log.message} <ProviderTag provider={log.provider} /></div>)}
      </Content>
    </Layout>
  );
}

function ProviderTag(p: {provider: string | ProviderModel }) {
  const { provider } = p;
  const providerName = typeof provider === 'string' ? provider : provider.name;
  return <span>{providerName}</span>;
}
