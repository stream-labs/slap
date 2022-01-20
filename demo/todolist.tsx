import React from 'react';
import { mutation, useModule } from '../lib';

export function TodoListApp() {
  return (
    <>
      <TodoListCounter />
      <TodoListItems />
      <TodoListButtons />
    </>
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
      {tasks.map((task) => (<li key={task.id} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.name}</li>))}
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
      { id: 1, name: 'task1', isCompleted: false },
      { id: 2, name: 'task2', isCompleted: false },
    ],
  };

  get itemsCount() {
    return this.state.tasks.length;
  }

  @mutation()
  addTask() {
    this.state.counter++;
    this.state.tasks.push(
      { id: this.state.counter, name: 'new task', isCompleted: false },
    );
  }

  @mutation()
  completeAll() {
    this.state.tasks = this.state.tasks.map((task) => ({ ...task, completed: true }));
  }
}
