import React, { useRef } from 'react';
import { Input } from 'antd';
import { TextInput } from './editor/ItemProps';
import {
  injectState, useModule,
} from '../../../../lib';

export function ShouldComponentUpdatePage() {

  const minNameLength = 3;
  const renderCount = useRef(0);

  const { name, setName, componentView } = useModule(() => {

    const userState = injectState({
      name: '',
    });

    return { userState };
  });

  componentView.setShouldComponentUpdate(defaultShouldComponentUpdate => {
    const prevName = (componentView.lastSnapshot.props as any).name;
    const newName = (componentView.makeSnapshot().props as any).name;
    const nameBecameValid = prevName.length < minNameLength && newName.length >= minNameLength;
    const nameBecameInvalid = prevName.length >= minNameLength && newName.length < minNameLength;
    const shouldUpdate = nameBecameValid || nameBecameInvalid;
    return shouldUpdate;

  });

  renderCount.current++;

  return (
    <div>
      <div>Render Count: {renderCount.current}</div>
      Type your character name <Input type={name} onChange={ev => setName(ev.currentTarget.value)} />
      {(name.length < minNameLength) && <div>Should be at least {minNameLength} characters</div>}
    </div>
  );
}
