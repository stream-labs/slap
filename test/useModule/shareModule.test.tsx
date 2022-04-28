/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import { renderApp, useModule } from '../helpers';

let instanceCounter = 0;

class MyModule {

  moduleNumber = 0;

  init() {
    instanceCounter++;
    this.moduleNumber = instanceCounter;
  }

}

function RootComponentWithSharedModule() {
  useModule(MyModule);
  return (
    <div>
      <ChildComponent1 />
      <ChildComponent2 />
    </div>
  );
}

function RootComponentWithIndependentModules() {
  return (
    <div>
      <ChildComponent3 />
      <ChildComponent4 />
    </div>
  );
}

function ChildComponent1() {
  const { moduleNumber } = useModule(MyModule);
  return (<div>module:{moduleNumber}</div>);
}

function ChildComponent2() {
  const { moduleNumber } = useModule(MyModule);
  return (<div>module:{moduleNumber}</div>);
}

function ChildComponent3() {
  const { moduleNumber } = useModule(MyModule, true);
  return (<div>module:{moduleNumber}</div>);
}

function ChildComponent4() {
  const { moduleNumber } = useModule(MyModule, true);
  return (<div>module:{moduleNumber}</div>);
}

describe('Share module between components', () => {

  it('Share module instance between components', () => {
    const component = renderApp(<RootComponentWithSharedModule />);

    expect(component).toMatchInlineSnapshot(`
      <div>
        <div>
          module:
          1
        </div>
        <div>
          module:
          1
        </div>
      </div>
    `);
  });

  it('Share module class between components', () => {
    const component = renderApp(<RootComponentWithIndependentModules />);

    expect(component).toMatchInlineSnapshot(`
      <div>
        <div>
          module:
          2
        </div>
        <div>
          module:
          3
        </div>
      </div>
    `);
  });
});
