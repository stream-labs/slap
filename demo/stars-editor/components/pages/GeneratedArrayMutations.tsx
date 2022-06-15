import React from 'react';
import { message } from 'antd';
import {
  injectState, useModule,
} from '../../../../lib';
import { TextInput } from './editor/ItemProps';

class MyModuleWithArrays {

  state = injectState({
    counter: 0,
    selectedId: 0,
    items: [] as {id: number, name: string}[],

  });

  get selectedItem() {
    return this.state.findItems(this.state.selectedId);
  }

  addItem() {
    this.state.mutate(state => {
      const id = state.counter++;
      state.pushItems({ id, name: `Item${id}` });
    });
  }

  removeWithFunction(id: number) {
    this.state.removeItems(item => item.id === id);
  }

  removeWithObject(id: number) {
    this.state.removeItems({ id });
  }

  renameWithFunction(id: number, newName: string) {
    this.state.updateItems(item => item.id === id, item => item.name = newName);
  }

  renameWithObject(id: number, newName: string) {
    this.state.updateItems({ id }, item => item.name = newName);
  }

  renameWithId(id: number, newName: string) {
    this.state.updateItems(id, item => item.name = newName);
  }

  async init() {
    try {
      await this.state.waitFor(() => this.state.items.find(item => item.id === 2), { timeout: 10000 });
      message.info('Item 2 is created');
    } catch (e) {
      message.error('Waiting timeout');
    }
  }
}

export function GeneratedArrayMutationsPage() {
  const {
    items, addItem, removeWithFunction, removeWithObject, setSelectedId, selectedItem, renameWithFunction, renameWithId, renameWithObject, selectedId,
  } = useModule(MyModuleWithArrays);

  return (
    <div>
      <ul role="list">
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => removeWithFunction(item.id)}>Remove with function</button>
            <button onClick={() => removeWithObject(item.id)}>Remove with object</button>
            <button onClick={() => setSelectedId(item.id)}>Select</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add item</button>
      <div>
        {selectedItem && (
        <p>
          Selected item <TextInput value={selectedItem.name} />

          <button onClick={() => renameWithFunction(selectedId, 'Renamed with function')}>Rename with function</button>
          <button onClick={() => renameWithObject(selectedId, 'Renamed with object')}>Rename with object</button>
          <button onClick={() => renameWithId(selectedId, 'Renamed with id')}>Rename with id</button>
        </p>
        )}
      </div>
    </div>
  );
}
