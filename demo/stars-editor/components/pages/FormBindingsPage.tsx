import React from 'react';
import {
  createFormBinding, injectFormBinding, injectState, merge, mutation, useModule,
} from '../../../../lib';
import { TextInput } from './editor/ItemProps';

class MyModule {
  state = injectState({
    name: 'My name',
    company: 'My company',
  });

  additionalState = injectState({
    phone: '+1 444 444 44',
    address: 'My address',
  });

  get mergedState() {
    return merge(this.state.getters, this.additionalState.getters);
  }

  bind = injectFormBinding(() => this.mergedState, patch => {
    this.state.update(patch);
    this.additionalState.update(patch);
  });
}

export function FormBindingsPage () {
  useModule(MyModule);

  return (
    <div>
      <BindFormFromMultipleStates />
      <BindFormFromExtendedState />
      <DirectStateBinding />
    </div>
  );

}

function BindFormFromMultipleStates() {
  const {
    bind, name, company, phone, address,
  } = useModule(MyModule);

  return (
    <div>
      <h2>Bind form from multiple states</h2>
      <div>
        Name {name} <br />
        Company: {company} <br />
        Phone {phone} <br />
        Address: {address} <br />
      </div>
      <div>Edit Name <TextInput {...bind.name} /></div>
      <div>Edit Company <TextInput {...bind.company} /></div>
      <div>Edit Phone <TextInput {...bind.phone} /></div>
      <div>Edit Address <TextInput {...bind.address} /></div>
    </div>
  );
}
function BindFormFromExtendedState() {
  const {
    bind, name, address, items, bindOrder, addItem
  } = useModule(MyModule).extend(m => {

    const orderState = injectState({
      itemName: '',
      items: ['Ball', 'Pencil'],
      addItem() {
        this.items.push(this.itemName);
        this.itemName = '';
      },
    });

    const bindOrder = injectFormBinding(() => orderState.getters, patch => orderState.update(patch));

    // orderState.setItemName('Balloon');

    return { orderState, bindOrder };
  });

  return (
    <div>
      <h2>Bind form from extended state</h2>
      <div>
        Name {name} <br />
        Address: {address} <br />
        Items: {items.join(', ')} <br />
      </div>
      <div>Edit Name <TextInput {...bind.name} /></div>
      <div>Edit Address <TextInput {...bind.address} /></div>
      <div>Add Item <TextInput {...bindOrder.itemName} /><button onClick={addItem}>Add</button></div>

    </div>
  );
}

function DirectStateBinding() {
  const {
    age,
    nickname,
    bind,
  } = useModule(() => {

    const myState = injectState({
      age: 0,
      nickname: 'My Nickname',
    });

    return { myState };

  });

  return (
    <div>
      <h2>Direct state binding</h2>
      <div>
        Age {age} <br />
        Nickname: {nickname} <br />
      </div>
      <div>Edit Age <TextInput {...bind.age} /></div>
      <div>Edit Nickname <TextInput {...bind.nickname} /></div>

    </div>
  );
}
