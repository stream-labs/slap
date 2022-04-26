import React from 'react';
import { TextInput } from './editor/ItemProps';
import {
  inject, injectChild, injectState, useModule,
} from '../../../../lib';

class MyModule {

}

export function AboutPage() {

  const { name, bind, resetName } = useModule(() => {

    // const myModule = inject(MyModule);
    // const myModule2 = injectChild(MyModule);

    const userState = injectState({
      name: 'Alex',
      email: 'alex@gmail.com',

      resetName() {
        this.name = '';
      },
    });

    function resetName() {
      userState.mutate(state => {
        state.name = '';
      });
    }

    return { userState, resetName };
  });

  return (
    <div>
      Hello {name}
      <TextInput {...bind.name} />
      <TextInput {...bind.email} />
      <button onClick={resetName}>Reset</button>
    </div>
  );
}
