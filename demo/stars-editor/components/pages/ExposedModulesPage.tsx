import React from 'react';
import { Button } from 'antd';
import {
  injectState, useModule, injectExposed,
} from '../../../../lib';

type ShoppingCartItem = {
  id: number;
  name: string;
  price: string;
  amount: number;
}

class UserService {

  state = injectState({
    username: 'Alex',
    balance: 100,
  });

}

class ShoppingCartService {

  state = injectState({
    items: [
      {
        id: 1, name: 'Pencil', price: 5, amount: 10,
      },
      {
        id: 2, name: 'Ruler', price: 10, amount: 2,
      },
    ],
  });

  get total() {
    return this.state.items.map(item => item.price * item.amount).reduce((a, b) => a + b);
  }

  setAmount(id: number, amount: number) {
    this.state.updateItems(id, { amount });
  }
}

class CheckoutPageModule {

  userService = injectExposed(UserService);
  shoppingCartService = injectExposed(ShoppingCartService);

  get isEnoughMoney() {
    return this.userService.state.balance >= this.shoppingCartService.total;
  }

  buy() {
    alert('Success');
  }

}

export function CheckoutPageComponent () {

  // return <></>;

  const {
    total, username, balance, isEnoughMoney, items, buy, setAmount,
  } = useModule(CheckoutPageModule);

  return (
    <div>
      <h2>Hello {username}. Your balance is {balance} </h2>

      <p>You have {items.length} items in your cart</p>
      <ul>
        {items.map(item => (
          <li key={item.name}>
            Item: {item.name}, price: {item.price}, amount: {item.amount}
            <Button onClick={() => setAmount(item.id, item.amount + 1)}> + </Button>
            <Button onClick={() => setAmount(item.id, item.amount - 1)}> - </Button>
          </li>
        ))}
      </ul>
      <p>Total amount is {total}$</p>

      {!isEnoughMoney && <p style={{ color: 'red' }}> Your balance is too low to buy items</p>}
      {isEnoughMoney && <button onClick={buy}>Buy</button>}
    </div>
  );
}
