import React from 'react';
import ReactDOM from 'react-dom';
import { ReactModules, useModule } from '../lib';
import './index.css';
import { injectState } from '../lib/store/injectState';

export function TodoListApp() {
  return (
    <ReactModules>
      {/* <Module module={TodoModule}> */}
        <section className="todo-list">
          <h2>Todo List</h2>
          <TodoInput />
          <TodoItems />
          <TodoCompleteButton />
        </section>
      {/* </Module> */}
    </ReactModules>
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
  state = injectState({
    tasks: [
      { id: 1, name: 'Buy milk', isCompleted: false },
      { id: 2, name: 'Wash the car', isCompleted: false },
      { id: 3, name: 'Write a todo list app', isCompleted: false },
    ],
    inputValue: '',
    counter: 3,

    setInputValue(text: string) {
      this.inputValue = text;
    },

    addTask() {
      this.counter++;
      this.tasks.unshift(
        { id: this.counter, name: this.inputValue, isCompleted: false },
      );
      this.inputValue = '';
    },

    removeTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    setCompleted(id: number, isCompleted: boolean) {
      const task = this.tasks.find(task => task.id === id)!;
      task.isCompleted = isCompleted;
    },

    completeAll() {
      this.tasks = this.tasks.map((task) => ({ ...task, isCompleted: true }));
    },
  });

  get itemsCount() {
    return this.state.tasks.length;
  }

  get canAddTask() {
    return this.state.inputValue.trim() !== '';
  }

  get hasIncompleted() {
    return !!this.state.tasks.find(task => !task.isCompleted);
  }
}

ReactDOM.render(<TodoListApp />, document.getElementById('app'));
