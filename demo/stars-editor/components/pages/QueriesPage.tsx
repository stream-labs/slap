import React from 'react';
import { Slider } from 'antd';
import { injectQuery, injectState, useModule } from '../../../../lib';
import {
  fetchBannedUsers, fetchOnlineUsers, TAccount, TUser,
} from './UsersPage';

export async function fetchAccountsWithBalanceSync(balance = 0) {

  const accounts: TAccount[] = [
    { id: 'acc1', name: 'Account 1', balance: 0 },
    { id: 'acc2', name: 'Account 2', balance: 100 },
    { id: 'acc3', name: 'Account 3', balance: 1000 },
    { id: 'acc4', name: 'Account 4', balance: 10000 },
  ];

  return accounts.filter(acc => acc.balance <= balance);
}

export async function fetchAccountsWithBalance(balance = 0) {

  const accounts = fetchAccountsWithBalanceSync(balance);

  return new Promise<TAccount[]>(r => {
    setTimeout(() => r(accounts), 2000);
  });
}

export class QueriesModule {

  state = injectState({
    balance: 0,
  });

  onlineUsersQuery = injectQuery({
    fetch: fetchOnlineUsers,
    initialData: [{ name: 'Default Online User', id: 2 }],
  });

  bannedUsersQuery = injectQuery({
    fetch: fetchBannedUsers,
  });

  accountsSyncQuery = injectQuery([], () => fetchAccountsWithBalanceSync(this.state.balance), () => this.state.balance);

  accountsQuery = injectQuery({
    fetch: () => fetchAccountsWithBalance(this.state.balance),
    getParams: () => this.state.balance,
  });

  allAccountsQuery = injectQuery(fetchAccountsWithBalance);

  // TODO add sync query
  // TODO add conditional query

}

export function QueriesPage() {
  const {
    onlineUsersQuery,
    bannedUsersQuery,
    accountsQuery,
    balance,
    setBalance,
    accountsSyncQuery,
    allAccountsQuery,
    componentView,
  } = useModule(QueriesModule);
  // console.log('last snapshot', componentView.lastSnapshot);
  const bu = bannedUsersQuery.data;
  const ou = onlineUsersQuery.data;
  const ac = accountsQuery.data;
  const acs = accountsSyncQuery.data;
  const allcs = allAccountsQuery.data;

  return (
    <div>

      <Slider value={balance} onChange={setBalance} min={0} max={10000} step={10} />

      <h2>Accounts Sync:</h2>
      {acs && acs.map(user => (
        <div key={user.id}>
          {user.name} {user.balance}
        </div>
      ))}


      <h2>Accounts:</h2>
      {ac && ac.map(user => (
        <div key={user.id}>
          {user.name} {user.balance}
        </div>
      ))}

      <h2>All accounts:</h2>
      {allcs && allcs.map(user => (
        <div key={user.id}>
          {user.name} {user.balance}
        </div>
      ))}

      <h2>Online users:</h2>
      {onlineUsersQuery.isLoading && 'loading...'}
      {ou && ou.map(user => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
      <button onClick={onlineUsersQuery.refetch}>Refetch</button>

      <h2>Banned users:</h2>
      {bannedUsersQuery.isLoading && 'loading...'}
      {bu && bu.map(user => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
}
