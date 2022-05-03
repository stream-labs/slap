# Slap

Scalable and performant architecture for large React application

- TypeScript ready
- Minimal boilerplate code
- No additional wrappers for components
- Scale your app with modules and Dependency Injection
- Use an alternative for stateful React hooks

## Example 1

```tsx

// Define a React component
function FormComponent() {
  
  // define a module
  const module = useModule(() => {

    // inject a reactive state
    const state = injectState({
      name: 'Alex',
      address: 'Earth'
    });
    
    function reset() {
      this.state.mutate(state => {
        state.name = '';
        state.address = '';
      })
    }

    // export state and method for component
    return { state, reset }
  });

  // select methods and state from the module
  const { name, setName, address, setAddress, reset } = module;
  
  // render TSX
  return (
    <div>
      <h1>Hello {name} from {address}</h1>
      Name <TextInput value={name} onChange={setName} />
      Address <TextInput value={address} onChange={setAddress} />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

```


## Alternative way

```tsx

// define a module
class UserModule {

  // inject a reactive state
  state = injectState({
    name: 'Alex',
    address: 'Earth',

    reset() {
      this.name = '';
      this.address = '';
    }
  });
  
};

// Define a React component
function FormComponent() {

  // select methods and state from the module
  const { bind, reset } = useModule(UserModule);

  // render TSX
  return (
    <div>
      <h1>Hello {name} from {address}</h1>
      Name <TextInput {...bind.name} />
      Address <TextInput {...bind.address }/>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

```

## Getting started with services

```tsx
class ShopService {

  cartState = injectState({
    items: [],
    addItem(item: string) {
      this.cart.push(item);
    }
  });

  checkout() {
    alert(`Your items: ${this.cartState.items.join(',')}`);
    this.cartState.setItems([]);
  }

};

function ShopComponent() {

  const { itemsCount, addPopcorn, checkout } = useModule(() => {
    const shop = inject(ShopService);
    function addPopcorn() {
      shop.cartState.addItem('Popcorn');
    }
    return {
      addPopcorn,
      get itemsCount() {
        return shop.items.length;
      },
      checkout() {
        shop.checkout();
      }
    }
  });

  return (
    <div>
      <h1>You have {itemsCount} in your cart</h1>
      <button onClick={addPopcorn}>Add popcorn</button>
      <button onClick={checkout}>Checkout</button>
    </div>
  )
}

function MyApp() {
  const app = createApp({ ShopService });
  return <ReactModules app={app}><ShopComponent/></ReactModules>
}




```



## Extend modules

```tsx

class FooBarModule {
  foo = 1;
  bar = 2;
};

function MyComponent() {
  const { foo, bar, sum } = useModule(FooBarModule).extend(module => {
    sum: module.foo + module.bar;
  });

  // renders "1 + 2 = 3"
  return <>{foo} + {bar} = {fooPlulBar}</>
}

```

##  Modules composition

```tsx

class FooModule {
  foo: 1;
};

class BarModule {
  bar: 2;
};

class FooBarModule {
  fooModule = injectChild(FooModule);
  barModule = injectChild(BarModule);
  get sum() {
    return this.fooModule.foo + this.barModule.bar;
  }
};

```





 ## Get started with counter application

```tsx
import { mutation, useModule, ReactModules } from 'slap';

// Define a Module
class CounterModule {

  // create reactive state
  state = injectState({
    counter: 1,
  });

  // register mutations
  @mutation()
  increment() {
    this.state.counter++;
  }

  @mutation()
  decrement() {
    this.state.counter--;
  }
}

// Define a React component
function Counter() {
  const { counter, increment, decrement } = useModule(CounterModule);
  return (
    <div>
      Counter Value = {counter}
      <button onClick={increment}> + </button>
      <button onClick={decrement}> - </button>
    </div>
  );
}

// Create your application
ReactDOM.render(
  <ReactModules>
    <Counter />
  </ReactModules>,
  document.getElementById('app'),
);
```

## Multiple components TodoList example

```tsx
import React from 'react';
import { mutation, useModule } from '../lib';
import { RedumbxApp } from './RedumbxApp';

export function TodoListApp() {
  return (
    <RedumbxApp>
      <TodoListCounter/>
      <TodoListItems/>
      <TodoListButtons/>
    </RedumbxApp>
  );
}

export function TodoListCounter() {
  const { itemsCount } = useModule(TodoModule);
  return (
    <div>
      Total items:
      {itemsCount}
    </div>
  );
}

export function TodoListItems() {
  const { tasks } = useModule(TodoModule);
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.name}</li>))}
    </ul>
  );
}

export function TodoListButtons() {
  const { addTask, completeAll } = useModule(TodoModule);
  return (
    <div>
      <button onClick={addTask}>Add Task</button>
      <button onClick={completeAll}>Complete All</button>
    </div>
  );
}

class TodoModule {
  state = {
    counter: 3,
    tasks: [
      {
        id: 1,
        name: 'task1',
        isCompleted: false
      },
      {
        id: 2,
        name: 'task2',
        isCompleted: false
      },
    ],
  };

  get itemsCount() {
    return this.state.tasks.length;
  }

  @mutation()
  addTask() {
    this.state.counter++;
    this.state.tasks.push(
      {
        id: this.state.counter,
        name: 'new task',
        isCompleted: false
      },
    );
  }

  @mutation()
  completeAll() {
    this.state.tasks = this.state.tasks.map((task) => ({
      ...task,
      completed: true
    }));
  }
}

```


