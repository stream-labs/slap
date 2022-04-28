/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
export * from '../dist';
import { ReactModules } from '../dist';
import { Input, InputProps } from 'antd';


export function renderApp(el: React.ReactElement) {
  const result = render(
    <ReactModules>
      {el}
    </ReactModules>,
  );
  return result.container.firstElementChild!;
}


export const alertMock = jest.spyOn(window, 'alert').mockImplementation();

export function TextInput(p: Omit<InputProps, 'onChange'> & {onChange?: (val: any) => unknown}) {
  const onChange = (ev: {currentTarget: {value: any}}) => p.onChange && p.onChange(ev.currentTarget.value);
  return <Input {...p} onChange={onChange} />;
}
