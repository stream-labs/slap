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

  const {
    bind, name, company, phone, address,
  } = useModule(MyModule);

  return (
    <div>
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
