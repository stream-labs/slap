import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';
import { store } from './store';

export function RedumbxApp(p: {children: ReactNode | ReactNode[]}) {
  return <Provider store={store}>{p.children}</Provider>;
}
