import React from 'react';
import { injectQuery, useModule } from '../../../../lib';
import { fetchBannedUsers, fetchOnlineUsers } from './UsersPage';

export class QueriesModule {

  bannedUsersQuery = injectQuery({
    fetch: fetchBannedUsers,
  });

  onlineUsersQuery = injectQuery({
    fetch: fetchOnlineUsers,
    initialData: [{ name: 'Default Online User', id: 2 }],
  });
}

export function QueriesPage() {
  const { bannedUsersQuery, onlineUsersQuery, componentView } = useModule(QueriesModule);
  console.log('last snapshot', componentView.lastSnapshot);
  const bu = bannedUsersQuery.data;
  const ou = onlineUsersQuery.data;

  return (
    <div>
      <h2>Banned users:</h2>
      {bu && bu.map(user => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
      <h2>Online users:</h2>
      {ou && ou.map(user => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
}
