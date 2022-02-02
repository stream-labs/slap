import React from 'react';
import ReactDOM from 'react-dom';
import { mutation, RedumbxApp, useModule } from '../lib';
import './index.css';

export function TodoListApp() {
  return (
    <RedumbxApp>
      <section className="todo-list">
        <h2>Todo List</h2>
        <TodoInput />
        <TodoItems />
        <TodoCompleteButton />
      </section>
    </RedumbxApp>
  );
}

export function TodoInput() {
  const {
    canAddTask,
    addTask,
    inputValue,
    setInputValue,
  } = useModule(TodoModule);

  return (
    <div className="input-box todo-input">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={ev => setInputValue(ev.currentTarget.value)}
        onKeyPress={event => event.key === 'Enter' && addTask()}
      />
      <button disabled={!canAddTask} onClick={addTask}>
        Add
      </button>
    </div>
  );
}

export function TodoItems() {
  const { tasks, setCompleted, removeTask } = useModule(TodoModule);
  return (
    <ul className="todo-items">
      {tasks.map((task) => (
        <li key={task.id} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
          {task.name}
          <div className="todo-actions">
            <button className="danger" onClick={() => removeTask(task.id)}>Delete</button>

            {!task.isCompleted
              && (<button onClick={() => setCompleted(task.id, true)}>Done</button>)}

            {task.isCompleted
              && (<button onClick={() => setCompleted(task.id, false)}>Undone</button>)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function TodoCompleteButton() {
  const { hasIncompleted, completeAll, itemsCount } = useModule(TodoModule);
  return (
    <div className="todo-footer">
      <button onClick={completeAll} disabled={!hasIncompleted}>
        Complete all {itemsCount} tasks
      </button>
    </div>
  );
}

class TodoModule {
  state = {
    tasks: [
      { id: 1, name: 'Buy milk', isCompleted: false },
      { id: 2, name: 'Wash the car', isCompleted: false },
      { id: 3, name: 'Write a todo list app', isCompleted: false },
    ],
    inputValue: '',
    counter: 3,
  };

  get itemsCount() {
    return this.state.tasks.length;
  }

  get canAddTask() {
    return this.state.inputValue.trim() !== '';
  }

  get hasIncompleted() {
    return !!this.state.tasks.find(task => !task.isCompleted);
  }

  @mutation()
  setInputValue(text: string) {
    this.state.inputValue = text;
  }

  @mutation()
  addTask() {
    this.state.counter++;
    this.state.tasks.unshift(
      { id: this.state.counter, name: this.state.inputValue, isCompleted: false },
    );
    this.state.inputValue = '';
  }

  @mutation()
  removeTask(id: number) {
    this.state.tasks = this.state.tasks.filter(task => task.id !== id);
  }

  @mutation()
  setCompleted(id: number, isCompleted: boolean) {
    const task = this.state.tasks.find(task => task.id === id)!;
    task.isCompleted = isCompleted;
  }

  @mutation()
  completeAll() {
    this.state.tasks = this.state.tasks.map((task) => ({ ...task, isCompleted: true }));
  }
}

ReactDOM.render(<TodoListApp />, document.getElementById('app'));
