import React from 'react';
import ReactDOM from 'react-dom';
import {
  ReactModules, useModule, injectChild, inject, generateId, injectQuery, injectState,
} from '../lib';
import './index.css';

export class ShopModule {

  shopName = `My Shop ${generateId()}`;
  shopTitle = `Welcome to ${this.shopName}`;

  itemList = injectChild(ShopItemsModule);
  cart = injectChild(CartModule);

  init() {
    console.log('ShopModule inited');
    this.cart.addItem({ id: 'item1', name: 'Notebook', amount: 1 });
  }

}

type ShopItem = {
  id: string;
  name: string;
  price: number;
}

export class ShopItemsModule {

  items: ShopItem[] = [
    { id: 'item1', name: 'Notebook', price: 10 },
    { id: 'item2', name: 'Laptop', price: 500 },
    { id: 'item3', name: 'Mouse', price: 50 },
  ];

  init() {
    console.log('ShopItemsModule inited');
  }

}

type CartItem = {
  id: string;
  name: string;
  amount: number;
}

export class CartModule {

  items: CartItem[] = [];

  init() {
    console.log('CartModule inited');
  }

  addItem(item: CartItem) {
    this.items.push(item);
  }

}

function ShopApp() {
  return (
    <ReactModules>
      <ShopPage />
    </ReactModules>
  );
}

function ShopPage() {

  const { shopTitle } = useModule(ShopModule);

  return (
    <div>
      <h2>{shopTitle}</h2>
      {/* <ItemsList /> */}
      {/* <Cart /> */}
      <BookmarkedItems />
      <RecommendedItems />
    </div>
  );

}

function ItemsList() {

  const { itemList } = useModule(ShopModule);

  return (
    <div>
      <h3>Items:</h3>
      {itemList.items.map(item => <div key={item.id}>{item.name} {item.price}$</div>)}
    </div>
  );

}

function Cart() {

  const { cart, discount, discountMessage } = useModule(ShopModule).extend(shop => {

    const injectedShop = inject(ShopModule);

    return {
      discount: 10,
      discountMessage: `Discount for the shop ${injectedShop.shopName} today`,
    };
  });

  return (
    <div>
      <h3>Cart:</h3>
      {cart.items.map(item => <div key={item.id}>{item.name} {item.amount}$</div>)}
      <h4>{discountMessage}: {discount}%</h4>
    </div>
  );

}

async function fetchRecommendedItems() {

  await new Promise(r => setTimeout(r, 2000));
  return [
    { id: 'item5', name: 'Headphones', price: 10 },
    { id: 'item6', name: 'Monitor', price: 500 },
    { id: 'item7', name: 'Keyboard', price: 50 },
  ];
}

function BookmarkedItems() {

  const { bookmarks, clearBookmarks, componentView } = useModule(ShopModule).extend(shop => {
    const bookmarks = injectState({ items: [{ id: 'item5', name: 'Headphones', price: 10 }] as ShopItem[] });

    function clearBookmarks() {
      bookmarks.setItems([]);
    }

    return {
      bookmarks,
      clearBookmarks,
    };
  });

  console.log('componentView for Bookmarks', componentView);

  return (
    <div>
      <h3>Bookmarked items:</h3>
      {bookmarks.items.map(item => <div key={item.id}>{item.name} {item.price}$</div>)}
      <button onClick={clearBookmarks}> Clear Bookmarks </button>
    </div>
  );

}

function RecommendedItems() {

  const { recommendedItemsQuery } = useModule(ShopModule).extend(shop => {

    const recommendedItemsQuery = injectQuery(fetchRecommendedItems);

    return {
      recommendedItemsQuery,
    };
  });

  return (
    <div>
      <h3>Recommended items:</h3>
      <div>
        {recommendedItemsQuery.isLoading && 'loading...'}
        {!recommendedItemsQuery.isLoading && recommendedItemsQuery.data.map(item => <div key={item.id}>{item.name} {item.price}$</div>)}
      </div>
      <button onClick={recommendedItemsQuery.refetch}>Reload</button>
    </div>
  );

}

ReactDOM.render(<ShopApp />, document.getElementById('app'));
