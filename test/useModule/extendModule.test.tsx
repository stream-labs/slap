/**
 * @jest-environment jsdom
 */
import {
  fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { alertMock, renderApp, useModule, forEach } from '../helpers';

const snapshot = `
  <button>
    Hello World
  </button>
`;

describe('Extend module', () => {

  it('Extend module', () => {

    class MyModule {
      message = 'Hello World';
    }

    function MyComponent() {
      const { message, sayHello } = useModule(MyModule).extend(module => ({

        sayHello() {
          alert(module.message);
        },

      }));
      return (<button onClick={sayHello}>{message}</button>);
    }

    const container = renderApp(<MyComponent />);
    fireEvent.click(screen.getByRole('button'));
    expect(container).toMatchInlineSnapshot(snapshot);
    expect(alertMock).toBeCalledWith('Hello World');
  });
});
