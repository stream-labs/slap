/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  screen, fireEvent, waitFor, getByText,
} from '@testing-library/react';
import { renderApp, TextInput, useModule, injectQuery, injectState, alertMock } from '../helpers';

class QueriesModule {

  state = injectState({
    maxPrice: 100,
  });

  get itemPrefix() {
    return 'Shop Item';
  }

  getFilter() {
    return this.state.maxPrice;
  }

  async fetchShopItems(maxPrice: number): Promise<{ id: string, name: string}[]> {
    const prefix = this.itemPrefix;
    const shopItems = [
      { id: '1', name: `${prefix} Item 1`, price: 10 },
      { id: '2', name: `${prefix} Item 2`, price: 20 },
      { id: '3', name: `${prefix} Item 3`, price: 50 },
      { id: '4', name: `${prefix} Item 4`, price: 90 },
    ];
    const filteredItems = shopItems.filter(item => item.price <= maxPrice);
    await new Promise(r => setTimeout(r, 1000));
    return filteredItems;
  }

  shopItemsQuery = injectQuery(this.fetchShopItems, this.getFilter);

  alertOnItemsChange() {
    this.shopItemsQuery.onChange(newData => {
      alert('Changed');
    })
  }

}

function QueriesComponent() {
  const {
    state, maxPrice, setMaxPrice, shopItemsQuery, alertOnItemsChange,
  } = useModule(QueriesModule);


  return (
    <div>
      <TextInput name="maxPrice" value={maxPrice} onChange={setMaxPrice} />
      <h2>Shop Items (max price is: {state.maxPrice})</h2>
      {shopItemsQuery.isLoading && '...loading'}
      {!shopItemsQuery.isLoading && <div>Items loaded</div>}
      <div role="list">
        {shopItemsQuery.data.map(item => (
          <div key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
      <button onClick={alertOnItemsChange}>Alert on items change</button>
    </div>
  );
}

describe('Inject query', () => {

  it('Inject query', async () => {
    const component = renderApp(<QueriesComponent />);

    // test initial loading
    expect(screen.getByText('...loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Items loaded')).toBeInTheDocument();
    });

    expect(screen.getByRole('list')).toMatchInlineSnapshot(`
      <div
        role="list"
      >
        <div>
          Shop Item Item 1
        </div>
        <div>
          Shop Item Item 2
        </div>
        <div>
          Shop Item Item 3
        </div>
        <div>
          Shop Item Item 4
        </div>
      </div>
    `);


    // change the maxPrice filter to trigger loading again
    const $maxPrice = component.querySelector('input[name="maxPrice"]')!;
    fireEvent.change($maxPrice, { target: { value: '10' } });

    expect(screen.getByText('...loading')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Items loaded')).toBeInTheDocument();
    });
    expect(screen.getByRole('list')).toMatchInlineSnapshot(`
      <div
        role="list"
      >
        <div>
          Shop Item Item 1
        </div>
      </div>
    `);

    // TEST ON CHANGE SUBSCRIPTION
    const $subscribeChangesBtn = screen.getByText('Alert on items change');
    fireEvent.click($subscribeChangesBtn);
    // change the maxPrice filter to trigger loading again
    fireEvent.change($maxPrice, { target: { value: '50' } });
    waitFor(() => {
      expect(alertMock).toBeCalledTimes(1);
    });

  });
});
