import React from 'react';
import { Button } from 'antd';
import { useDB, useObservable } from '../../../lib/slapp/hooks';
import { inject, useScope } from '../../../lib';
import { UsersService } from '../services/users.service';
// import { useModule } from '../../../lib';
// import { UsersService } from '../services/users';

export function ServerApp() {
  const scope = useScope();
  const usersService = scope.resolve(UsersService);
  const [users] = useObservable<{id: string, name: string}[]>(usersService.collections.users.find().$);

  return (
    <div>
      <a onClick={openChildWindow}>Open a Child window</a>
      {users.map(user => <div key={user.id}>${user.name}</div>)}
      {/* <Button onClick={addUser}> Add user</Button> */}
      {/* <br /> */}
      {/* <Button onClick={removeUser}> Remove user</Button> */}
    </div>
  );
}

function openChildWindow() {
  const myWindow = window.open('?id=child', '_blank');
}
