import React from 'react';
import { Button } from 'antd';
import { UsersService } from '../services/users.service';
import { useModule } from '../../../lib';
// import { useModule } from '../../../lib';
// import { UsersService } from '../services/users';

export function ServerApp() {
  const {
    isLoaded, usersCnt, addUser, removeUser, users, onlineUsers
  } = useModule(UsersService);

  return (
    <div>
      <a onClick={openChildWindow}>Open a Child window</a>
      {!isLoaded && 'loading users...'}
      {isLoaded && (
      <>
        <div>
          UsersCnt = {usersCnt};
        </div>


        {users && users.map(user => <div key={user.id} style={{ color: user.isOnline ? 'green' : 'gray' }}>${user.name}</div>)}

        <div>
          Online users:
        </div>

        {onlineUsers && onlineUsers.map(user => <div key={user.id} style={{ color: user.isOnline ? 'green' : 'gray' }}>${user.name}</div>)}

        <Button onClick={addUser}> Add user</Button>
        {/* <br /> */}
        <Button onClick={removeUser}> Remove user</Button>
      </>
      )}

    </div>
  );
}


function openChildWindow() {
  const myWindow = window.open('?id=child', '_blank');
}
