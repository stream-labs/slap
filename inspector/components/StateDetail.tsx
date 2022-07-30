import React from 'react';
import { Layout, PageHeader } from 'antd';
import { JSONEditor } from 'svelte-jsoneditor';
import {
  inject, injectState, StatefulModuleMetadata, useModule,
} from '../../lib';
import { InspectorService, TempAny } from '../inspector.service';
import { TextInput } from '../../demo/stars-editor/components/pages/editor/ItemProps';
import SvelteJSONEditor from './JSONEditor';

const { Content } = Layout;

class StateInspectorModule {

  private inspector = inject(InspectorService);

  state = injectState({
    moduleName: '',
    data: {} as TempAny,
  });

  // metadata: StatefulModuleMetadata | null = null;
  //
  // setModuleId(id: string) {
  //   if (this.state.moduleName === id) return;
  //   this.state.mutate(state => {
  //     state.moduleName = id;
  //     this.refresh();
  //   });
  // }

  unsubscribe: null | (() => void) = null;

  constructor(public moduleName: string) {
  }

  async init() {
    this.refresh();
    this.unsubscribe = await this.inspector.remoteStore.subscribe('events').on('onMutation', (moduleName) => {
      if (moduleName !== this.moduleName) return;
      this.refresh();
    });
  }

  destroy() {
    this.unsubscribe && this.unsubscribe();
    console.log('destroy module', this.moduleName);
  }

  async refresh() {
    const id = this.moduleName;
    const data = await this.inspector.remoteApp.getState(id);
    this.state.setData(data);
  }

  // get inspectedStateController() {
  //   // return this.inspector.inspectedApp.store.modulesMetadata[this.moduleName].controller;
  // }

  // setProp(propName: string, value: unknown) {
  //   this.inspector.remoteApp.updateState(this.moduleName, { [propName]: value });
  //   // const stateController = this.inspectedStateController;
  //   // stateController.mutate((state: TempAny) => {
  //   //   state[propName] = value;
  //   // });
  // }

  setData(value: {json: any, text: string}) {
    console.log('set data', value);

    let data = value.json;
    if (value.text) {
      try {
        data = JSON.parse(value.text);
      } catch (e) {
        return; // invalid json
      }
    }
    // stateController.update(data);
    this.inspector.remoteApp.updateState(this.moduleName, data);
  }
}

export function StateDetail() {
  const { selectedProvider } = useModule(InspectorService);
  if (selectedProvider?.moduleType !== 'state') return <div />;

  return (
    <Layout style={{ height: '100%' }}>
      <PageHeader
        title={selectedProvider.id}
      />

      <Content style={{ padding: '0 24px' }}>
        <StateInspector stateId={selectedProvider.id} key={selectedProvider.id} />
      </Content>

    </Layout>

  );
}

export function StateInspector(p: { stateId: string}) {
  // TODO sync constructor args with state
  const { data, setData } = useModule(StateInspectorModule, [p.stateId]);

  return (
    <div>
      State:
      {/* {Object.keys(data).map(propName => ( */}
      {/*   <div key={propName}> */}
      {/*     {propName}: */}
      {/*     {typeof data[propName] === 'number' || typeof data[propName] === 'string' */}
      {/*       ? <TextInput value={data[propName]} onChange={(val) => setProp(propName, val)} /> */}
      {/*       : JSON.stringify(data[propName])} */}
      {/*   </div> */}
      {/* ))} */}

      <SvelteJSONEditor
        content={{ json: data }}
        onChange={setData}
      />
    </div>
  );
}
