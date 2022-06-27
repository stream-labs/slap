import React from 'react';
import { Layout, PageHeader } from 'antd';
import { JSONEditor } from 'svelte-jsoneditor';
import {
  inject, injectState, StatefulModuleMetadata, useModule,
} from '../../lib';
import { InspectorService, TempAny } from '../useInspector';
import { TextInput } from '../../demo/stars-editor/components/pages/editor/ItemProps';
import SvelteJSONEditor from './JSONEditor';

const { Content } = Layout;

class StateInspectorModule {

  private inspector = inject(InspectorService);

  state = injectState({
    // moduleName: '',
    data: {} as TempAny,
  });
  //
  // metadata: StatefulModuleMetadata | null = null;

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

  init() {
    console.log('create module', this.moduleName);
    const inspectedStore = this.inspector.inspectedApp.store;
    this.refresh();
    this.unsubscribe = inspectedStore.events.on('onMutation', (mutation, moduleName) => {
      if (moduleName !== this.moduleName) return;
      this.refresh();
    });
  }

  destroy() {
    this.unsubscribe && this.unsubscribe();
    console.log('destroy module', this.moduleName);
  }

  refresh() {
    const id = this.moduleName;
    const metadata = this.inspector.inspectedApp.store.modulesMetadata[id];
    const data = metadata.controller.state;
    this.state.setData(data);
  }

  get inspectedStateController() {
    return this.inspector.inspectedApp.store.modulesMetadata[this.moduleName].controller;
  }

  // setProp(propName: string, value: unknown) {
  //   const stateController = this.inspectedStateController;
  //   stateController.mutate((state: TempAny) => {
  //     state[propName] = value;
  //   });
  // }

  setData(value: {json: any, text: string}) {
    console.log('set data', value);
    const stateController = this.inspectedStateController as any;

    let data = value.json;
    if (value.text) {
      try {
        data = JSON.parse(value.text);
      } catch (e) {
        return; // invalid json
      }
    }
    stateController.update(data);
  }
}

export function StateDetail() {

  const { selectedStateModule } = useModule(InspectorService);
  if (!selectedStateModule) return <div />;

  return (
    <Layout style={{ height: '100%' }}>
      <PageHeader
        title={selectedStateModule.id}

      />

      <Content style={{ padding: '0 24px' }}>
        <StateInspector stateId={selectedStateModule.id} key={selectedStateModule.id} />
      </Content>

    </Layout>

  );
}

export function StateInspector(p: { stateId: string}) {
  // TODO sync constructor args with state
  const { data, setData } = useModule(StateInspectorModule, [p.stateId]);

  return (
    <div>
      {/* State: */}
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
