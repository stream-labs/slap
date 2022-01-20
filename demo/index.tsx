import React from 'react';
import ReactDOM from 'react-dom';
import { RedumbxApp } from '../lib';
import { TodoListApp } from './todolist';
import { Counter } from './counter';
import { ChatPage, HomePage } from './chat';

ReactDOM.render(
  <RedumbxApp>
    <Counter />
    <TodoListApp />
    <ChatPage />
    <HomePage />
  </RedumbxApp>,
  document.getElementById('app'),
);
