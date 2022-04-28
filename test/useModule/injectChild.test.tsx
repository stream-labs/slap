/**
 * @jest-environment jsdom
 */
import React, { useState } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderApp, useModule, injectChild } from '../helpers';

const subscriptions: string[] = [];

class ParentModule {

  childModule = injectChild(ChildModule);

  constructor() {
    subscriptions.push('parent_subscription_1');
  }

  init() {
    subscriptions.push('parent_subscription_2');
  }

  destroy() {
    const ind1 = subscriptions.indexOf('parent_subscription_1');
    subscriptions.splice(ind1, 1);
    const ind2 = subscriptions.indexOf('parent_subscription_2');
    subscriptions.splice(ind2, 1);
  }

}

class ChildModule {

  constructor() {
    subscriptions.push('child_subscription_1');
  }

  init() {
    subscriptions.push('child_subscription_2');
  }

  destroy() {
    const ind1 = subscriptions.indexOf('child_subscription_1');
    subscriptions.splice(ind1, 1);
    const ind2 = subscriptions.indexOf('child_subscription_2');
    subscriptions.splice(ind2, 1);
  }

}

function ComponentWithModule() {
  useModule(ParentModule);
  return <div>Module Created</div>;
}

function RootComponent() {
  const [moduleIsActive, setModuleIsActive] = useState(false);

  function toggleModule() {
    setModuleIsActive(!moduleIsActive);
  }

  return (
    <div>
      {!moduleIsActive && <button onClick={toggleModule}>Activate Module</button>}
      {moduleIsActive && (
        <>
          <button onClick={toggleModule}>Deactivate Module</button>
          <ComponentWithModule />
        </>
      )}
    </div>
  );

}

describe('Inject child', () => {

  it('Child modules should call a "destroy" hook', () => {
    const component = renderApp(<RootComponent />);
    const $activateBtn = screen.getByText('Activate Module');
    fireEvent.click($activateBtn);

    expect(screen.getByText('Module Created')).toBeInTheDocument();
    expect(subscriptions).toEqual([
      'child_subscription_1',
      'parent_subscription_1',
      'child_subscription_2',
      'parent_subscription_2'
    ]);

    const $deactivateBtn = screen.getByText('Deactivate Module');
    fireEvent.click($deactivateBtn);

    expect(screen.getByText('Activate Module')).toBeInTheDocument();
    expect(subscriptions).toEqual([]);
  });
});
