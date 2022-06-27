import React from 'react';
import {
  Button, Col, Layout, Row, Space, Switch,
} from 'antd';
import {
  injectState, useModule, injectExposed,
} from '../../../../lib';

type ShoppingCartItem = {
  id: number;
  name: string;
  price: string;
  amount: number;
}

class UserModule {

  state = injectState({
    username: 'Alex',
    balance: 100,
  });

}

class ShoppingCartModule {

  state = injectState({
    items: [
      {
        id: 1, name: 'Pencil', price: 5, quantity: 10,
      },
      {
        id: 2, name: 'Ruler', price: 10, quantity: 2,
      },
    ],
    shouldAddBag: false,
  });

  get total() {
    return this.state.items.map(item => item.price * item.quantity).reduce((a, b) => a + b);
  }

  setQuantity(id: number, quantity: number) {
    this.state.updateItems(id, { quantity });
  }
}

class CheckoutPageModule {

  userService = injectExposed(UserModule);
  shoppingCartService = injectExposed(ShoppingCartModule);

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
    total, username, balance, isEnoughMoney, items, buy, setQuantity, shouldAddBag, setShouldAddBag,
  } = useModule(CheckoutPageModule);

  const rowStyle = { marginBottom: '32px' };

  return (
    <Row justify="center">
      <Col>
        <h2 style={rowStyle}>Hello {username}. Your balance is {balance} </h2>

        <div style={rowStyle}>
          You have {items.length} items in your cart
        </div>

        <div style={rowStyle}>
          <ul>
            {items.map(item => (
              <li key={item.name}>
                {item.name}, price: <b>{item.price}$</b>, quantity: <b>{item.quantity}</b>
                <Space style={{ marginLeft: '16px' }}>
                  <Button onClick={() => setQuantity(item.id, item.quantity + 1)}> Add </Button>
                  <Button onClick={() => setQuantity(item.id, item.quantity - 1)}> Remove </Button>
                </Space>
              </li>
            ))}
          </ul>
        </div>

        <div style={rowStyle}>
          <div style={rowStyle}>
            <Switch checked={shouldAddBag} onChange={val => setShouldAddBag(val)} style={{ marginRight: '16px' }} /> Add a Bag
          </div>
          {shouldAddBag && <div> A bag has been added to your order </div>}
        </div>

        <Row style={rowStyle}>
          <p>Total is <b>{total}$</b></p>
        </Row>

        {!isEnoughMoney && <p style={{ color: 'red' }}> Your balance is too low to buy items</p>}
        {isEnoughMoney && <button onClick={buy}>Checkout</button>}
      </Col>

    </Row>
  );
}
