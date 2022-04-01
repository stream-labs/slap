import React from 'react';
import { useModule, injectState } from '../../../../lib';
import { generateId } from '../../../../lib/scope';

type TUser = {
  id: string;
  name: string;
}

export class UsersState {
  state = {
    selectedUser: '',
    users: [] as TUser[],
  };

  addUser(id: string, name: string) {
    this.state.users.push({ id, name });
  }
}

export class UsersModule {

  state = injectState(UsersState);

  createUser() {
    const id = generateId();
    this.state.addUser(id, `User ${id}`);
  }
}

export function UsersPage() {
  const { users, createUser } = useModule(UsersModule);

  // function openChildWindow() {
  //   const myWindow = window.open('?id=child', '_blank');
  //   console.log('open window', myWindow);
  //   console.log('opener', myWindow?.opener);
  // }

  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={createUser}>Add user</button>
      {/* <a onClick={openChildWindow}>Open the Child window</a> */}
    </div>
  );
}
