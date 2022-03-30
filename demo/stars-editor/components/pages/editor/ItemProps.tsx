import React from 'react';
import { Form, Input, InputProps } from 'antd';
import { useModule } from '../../../../../lib';
import { EditorService } from '../../../services/editor.service';

export function TextInput(p: Omit<InputProps, 'onChange'> & {onChange: (val: any) => unknown}) {
  const onChange = (ev: {currentTarget: {value: any}}) => p.onChange(ev.currentTarget.value);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Input {...p} onChange={onChange} />;
}

export function ItemProps() {

  const { activeItemId, bindActiveItem } = useModule(EditorService);

  if (!activeItemId) return <div>No items selected</div>;

  return (
    <Form>
      <div>Hello</div>
      <TextInput {...bindActiveItem.name} />
    </Form>
  );

}
