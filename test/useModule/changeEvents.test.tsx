/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import {
  alertMock, renderApp, useModule, injectState, GetStateControllerFor,
} from '../helpers';
import useFakeTimers = jest.useFakeTimers;
import runAllTimers = jest.runAllTimers;
import { sleep } from '../../demo/stars-editor/utils/sleep';

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

// TODO write waitFor tests
// function MyComponent2() {
//   useModule(() => {
//
//     const state = injectState({
//       isFooLoaded: true,
//       isBarLoaded: true,
//       isBazLoaded: true,
//     });
//
//     async function init() {
//       setTimeout(() => state.setIsBarLoaded(true), 500);
//       setTimeout(() => state.setIsBazLoaded(true), 1000);
//
//       await state.waitFor(() => state.isFooLoaded);
//       alert('Foo is loaded');
//
//       await state.waitFor(() => state.isBarLoaded);
//       alert('Foo is loaded');
//
//       try {
//         await state.waitFor(() => state.isBazLoaded, { timeout: 600 });
//         alert('Bar is loaded');
//       } catch (e) {
//         alert('Bar is not loaded');
//       }
//     }
//
//     return {
//       init,
//       state,
//     };
//   });
//   return (
//     <div />
//   );
// }
//
// describe('Wait for state', () => {
//   useFakeTimers();
//   jest.spyOn(global, 'setTimeout');
//
//   it('Wait for needed state', async () => {
//     await renderApp(<MyComponent2 />);
//     // await sleep(100);
//     runAllTimers();
//     expect(window.setTimeout).toBeCalledTimes(2);
//
//     expect(alertMock).toBeCalledWith('Foo is loaded', 'Bar is not loaded');
//   });
//
// });
