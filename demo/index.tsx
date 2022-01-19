import React from 'react';
import ReactDOM from 'react-dom';
import { RedumbxApp } from '../lib';
import { TodoList } from './todolist';
import { Counter } from './counter';
import { ChatPage, HomePage } from './chat';

ReactDOM.render(
  <RedumbxApp>
    <Counter />
    <TodoList />
    <ChatPage />
    <HomePage />
  </RedumbxApp>,
  document.getElementById('app'),
);
