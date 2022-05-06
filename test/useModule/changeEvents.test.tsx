/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import {
  alertMock, renderApp, useModule, injectState, GetStateControllerFor
} from '../helpers';
// import { GetStateControllerFor } from '../../lib';



// const state = {
//   counter: 0,
//   items: [] as string[],
//   addItem() {
//     this.counter++;
//     this.items.push(`Item${this.counter}`);
//   },
//   resetItems() {
//     this.items = [];
//   },
// };
//
// const controller: GetStateControllerFor<typeof state>;
// controller.onItemsChange()

class MyModule {

  state = injectState({
    counter: 0,
    items: [] as string[],
    addItem() {
      this.counter++;
      this.items.push(`Item${this.counter}`);
    },
    resetItems() {
      this.items = [];
    },
  });

  init() {
    this.state.onItemsChange((newValue, prevValue) => {
      alert(`newItems: ${newValue.join(', ')}; prevItems: ${prevValue.join(', ')}`);
    });
  }

}
function MyComponent() {
  const { addItem, resetItems } = useModule(MyModule);
  return (
    <div>
      <button onClick={addItem}>Add item</button>
      <button onClick={resetItems}>Reset items</button>
    </div>
  );
}

describe('State change events', () => {

  it('Should fire change events', () => {
    const container = renderApp(<MyComponent />);
    const $addBtn = screen.getByText('Add item');
    const $resetBtn = screen.getByText('Reset items');

    fireEvent.click($addBtn);
    expect(alertMock).toBeCalledWith('newItems: Item1; prevItems: ');

    fireEvent.click($addBtn);
    expect(alertMock).toBeCalledWith('newItems: Item1, Item2; prevItems: Item1');

    fireEvent.click($resetBtn);
    expect(alertMock).toBeCalledWith('newItems: ; prevItems: Item1, Item2');

    fireEvent.click($resetBtn);
    expect(alertMock).toBeCalledTimes(3);
  });

});
