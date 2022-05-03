/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import {
  renderApp, TextInput, useModule, injectState, mutation,
} from '../helpers';
class UserModule1 {

  state = injectState({
    name: 'Alex',
    address: 'Earth',

    reset() {
      this.name = '';
      this.address = '';
    },
  });
}

function UserFormComponentStyle1() {

  const {
    name, address, bind, reset,
  } = useModule(UserModule1);

  return (
    <div>
      <h1>Hello {name} from {address}</h1>
      Name:<TextInput {...bind.name} />
      Address:<TextInput {...bind.address} />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function UserFormComponentStyle2() {

  const {
    name, setName, address, setAddress, reset,
  } = useModule(() => {

    const state = injectState({
      name: 'Alex',
      address: 'Earth',
    });

    function reset() {
      state.mutate(() => {
        state.name = '';
        state.address = '';
      });
    }

    return { state, reset };
  });

  return (
    <div>
      <h1>Hello {name} from {address}</h1>
      Name:<TextInput name="name" value={name} onChange={setName} />
      Address:<TextInput name="address" value={address} onChange={setAddress} />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

class UserModule3 {

  state = injectState({
    name: 'Alex',
    address: 'Earth',
  });

  @mutation()
  reset() {
    this.state.name = '';
    this.state.address = '';
  }
}

function UserFormComponentStyle3() {

  const {
    name, address, bind, reset,
  } = useModule(UserModule3);

  return (
    <div>
      <h1>Hello {name} from {address}</h1>
      Name:<TextInput {...bind.name} />
      Address:<TextInput {...bind.address} />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

describe('Inject reactive state', () => {

  it('Inject state into a ClassModule', () => {
    const component = renderApp(<UserFormComponentStyle1 />);
    testComponent(component);
  });

  it('Inject state into an anonymous Module', () => {
    const component = renderApp(<UserFormComponentStyle2 />);
    testComponent(component);
  });

  it('Use mutation decorator', () => {
    const component = renderApp(<UserFormComponentStyle3 />);
    testComponent(component);
  });

  function testComponent(component: Element) {
    // check initial state
    const $name = component.querySelector('input[name="name"]')!;
    const $address = component.querySelector('input[name="address"]')!;
    expect(screen.getByRole('heading')).toHaveTextContent('Hello Alex from Earth');
    expect($name).toHaveValue('Alex');
    expect($address).toHaveValue('Earth');

    // change name
    fireEvent.change($name, { target: { value: 'Bob' } });
    expect($name).toHaveValue('Bob');

    // change address
    fireEvent.change($address, { target: { value: 'Mars' } });
    expect($address).toHaveValue('Mars');
    expect(screen.getByRole('heading')).toHaveTextContent('Hello Bob from Mars');

    // call "reset" mutation
    const $resetBtn = screen.getByText('Reset');
    fireEvent.click($resetBtn);
    expect($name).toHaveValue('');
    expect($address).toHaveValue('');
  }

});
