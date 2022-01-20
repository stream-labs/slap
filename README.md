# Redumbx

Redumbx provides a Simple and Scalable way for managing application state and sharing logic between components.

- React-Redux is under the hood
- TypeScript ready
- No additional wrappers for components
- Minimal boilerplate code


 ## Get started with counter application

```tsx
import { mutation, useModule, RedumbxApp } from 'redumbx';

// Define a RedumbxModule
class CounterModule {

  state = {
    counter: 1,
  };

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
export function Counter() {
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
  <RedumbxApp>
    <Counter />
  </RedumbxApp>,
  document.getElementById('app'),
);
```
You can compare a vanilla Redux version <a target="_blank" href="https://redux.js.org/usage/usage-with-typescript#standard-redux-toolkit-project-setup-with-typescript">here</a>

Philosophy
- keep components simple
- follow Flux pattern
- think about lifetime and encapsulation

Redumbx helps to share logic between several components without [props drilling](https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it/)
to keep your code clear

Redumbx helps to organize code splitting with help of Redux Modules
Each Redux Module controls its own chunk of state in the global Redux store
Redux Modules are objects that contain initialState, actions, mutations and getters

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

`useModule()` creates a stateful module that lives until at least one component is using this module

If you need a module that lives for the duration of the application you should use `useService()`

