import React from 'react';
import { mutation, useModule } from '../lib';

class TodoModule {
  state = {
    counter: 3,
    tasks: [
      { id: 1, name: 'task1', completed: false },
      { id: 2, name: 'task2', completed: false },
    ],
  };

  @mutation()
  addTask() {
    this.state.counter++;
    this.state.tasks.push(
      { id: this.state.counter, name: 'new task', completed: false },
    );
  }

  @mutation()
  completeAll() {
    this.state.tasks = this.state.tasks.map((task) => ({ ...task, completed: true }));
  }
}

export function TodoList() {
  const { tasks } = useModule(TodoModule);

  return (
    <div>
      <ul>{tasks.map((task) => <li key={task.id}>{task.name}</li>)}</ul>
      <TodoListButtons />
    </div>
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
