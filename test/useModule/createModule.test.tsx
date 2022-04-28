/**
 * @jest-environment jsdom
 */
import {
  render, fireEvent, waitFor, screen, getByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { alertMock, renderApp, useModule, forEach } from '../helpers';

const snapshot = `
  <button>
    Hello World
  </button>
`;

function MyFunctionModule() {
  const message = 'Hello World';

  function sayHello() {
    alert(message);
  }

  return { message, sayHello };
}

function MyFunctionComponent() {
  const { message, sayHello } = useModule(MyFunctionModule);
  return (<button onClick={sayHello}>{message}</button>);
}




class MyClassModule {
  message = 'Hello World';
  sayHello() {
    alert(this.message);
  }
}

function MyClassComponent() {
  const { message, sayHello } = useModule(MyClassModule);
  return (<button onClick={sayHello}>{message}</button>);
}


function MyInlineComponent() {
  const { message, sayHello } = useModule(() => ({
    message: 'Hello World',

    sayHello() {
      alert(this.message);
    },
  }));
  return (<button onClick={sayHello}>{message}</button>);
}


describe('Test different module notations', () => {

  const components = {
    classNotation: MyClassComponent,
    functionNotation: MyFunctionComponent,
    inlineNotation: MyInlineComponent,
  };

  forEach(components, (Component, notationName) => {

    it(`Create module with ${notationName}`, () => {
      const container = renderApp(<Component />);
      fireEvent.click(screen.getByRole('button'));
      expect(container).toMatchInlineSnapshot(snapshot);
      expect(alertMock).toBeCalledWith('Hello World');
    });

  });
});
