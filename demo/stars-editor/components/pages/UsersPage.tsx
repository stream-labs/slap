import React from 'react';
import { useModule } from '../../../../lib';
import { UsersService } from '../../services/users';

export class UsersModule {


  state = {
    selectedUser: '',
    users: [] as any,
  };

  init() {

  }

}

export function UsersPage() {
  const { users } = useModule(UsersService);

  // function openChildWindow() {
  //   const myWindow = window.open('?id=child', '_blank');
  //   console.log('open window', myWindow);
  //   console.log('opener', myWindow?.opener);
  // }

  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
      {/* <a onClick={openChildWindow}>Open the Child window</a> */}
    </div>
  );
}
