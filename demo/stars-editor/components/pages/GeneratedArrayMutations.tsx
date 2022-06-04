import React from 'react';
import { message } from 'antd';
import {
  injectState, useModule,
} from '../../../../lib';

class MyModuleWithArrays {

  state = injectState({
    counter: 0,
    items: [] as {id: number, name: string}[],
  });

  addItem() {
    this.state.mutate(state => {
      const id = state.counter++;
      state.pushItems({ id, name: `Item${id}` });
    });
  }

  removeItem(id: number) {
    this.state.removeItems(item => item.id === id);
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
  const { items, addItem, removeItem } = useModule(MyModuleWithArrays);

  return (
    <div>
      <ul role="list">
        {items.map(item => <li key={item.id}>{item.name} <button onClick={() => removeItem(item.id)}>Remove</button></li>)}
      </ul>
      <button onClick={addItem}>Add item</button>
    </div>
  );
}
