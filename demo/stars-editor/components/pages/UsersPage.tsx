import React from 'react';
import {
  useModule,
  injectState,
  TModuleInstanceFor,
  inject,
  useModuleInstance
} from '../../../../lib';
import { generateId } from '../../../../lib/scope';
import { injectQuery } from '../../../../lib/store/Query';
import { injectLoading } from '../../../../lib/store/plugins/pickLoadingState';
import { EditorService } from '../../services/editor.service';

export type TUser = {
  id: string;
  name: string;
}

export type TAccount = {
  id: string;
  name: string;
  balance: number;
}

export class UsersState {
  state = {
    users: [
      { id: 'user1', name: 'User 1' },
      { id: 'user2', name: 'User 2' },
    ] as TUser[],
  };

  getters = {

    get foo() {
      return 'Foo';
    },

    getHelloWorld(tmpl: string) {
      return 'Hello' + tmpl + this.foo;
    },
  };

  addUser(id: string, name: string) {
    this.state.users.push({ id, name });
  }
}

export async function fetchOnlineUsers() {
  return new Promise<TUser[]>(r => {
    setTimeout(() => r([{ id: 'online1', name: 'Online User 1' }, { id: 'online2', name: 'Online User 2' }]), 3000);
  });
}

export async function fetchBannedUsers() {
  return new Promise<TUser[]>(r => {
    setTimeout(() => r([{ id: 'banned1', name: 'Banned User 1' }, { id: 'banned2', name: 'Banned User 2' }]), 8000);
  });
}

export class UsersModule {

  editor = inject(EditorService);
  state = injectState(UsersState);
  loading = injectLoading();

  bannedUsersQuery = injectQuery({
    fetch: fetchBannedUsers,
  });

  onlineUsersQuery = injectQuery({
    fetch: fetchOnlineUsers,
    initialData: [{ name: 'Default Online User', id: 2 }],
  });

  async load() {
    await new Promise(r => { setTimeout(r, 1000); });
  }

  createUser() {
    const id = generateId();
    this.state.addUser(id, `User ${id}`);
  }
}

export function UsersPage() {
  const { createUser, foo, getHelloWorld } = useModule(UsersModule);

  return (
    <div>
      <div>
        Message: {getHelloWorld('Woaha')}
        Foo: {foo}
      </div>

      <UsersList />
      <button onClick={createUser}>Add user</button>
      <UsersQueries />

      <RootLoadingState />
      <NestedLoadingState />
      <UsersFooter />

    </div>
  );
}

function UsersQueries() {
  const { bannedUsersQuery, onlineUsersQuery } = useModule(UsersModule);
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

// nested store
export function UsersList() {
  const { users, selectedUserId, setSelectedUserId } = useModule(UsersModule).extend(users => ({

    extendedFoo: 1,

    state: injectState({
      selectedUserId: 'user2',
    }),
  }));

  return (
    <div>
      {users.map(user => (
        <div
          role="button"
          onClick={() => setSelectedUserId(user.id)}
          style={{ outline: selectedUserId === user.id ? '1px solid green' : 'none' }}
          key={user.id}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}

export function UsersFooter() {

  const stateView = useModule(() => ({

    state: injectState({
      counter: 1,
    }),

    onButtonClick() {
      this.state.setCounter(this.state.counter + 1);
      console.log('Button clicked');
    },
  }));

  const { onButtonClick, counter } = stateView;

  return <button onClick={onButtonClick}> Inc counter {counter}</button>;
}

export function RootLoadingState() {
  const { loadingStatus } = useModule(UsersModule);

  return (
    <div>
      RootLoadingStatus <br />
      LoadingStatus: {loadingStatus},
    </div>
  );
}

export function NestedLoadingState() {

  const { loadingStatus, loadedValues, foo, componentView } = useModule(UsersModule).extend(() => ({

    state: injectState({
      loadedValues: '',
    }),

    async load() {
      await new Promise(r => { setTimeout(r, 2000); });
      this.state.setLoadedValues('Loaded Values');
    },

    foo() {
      return 1;
    }

  }));

  return (
    <div>
      NestedLoadingStatus <br />
      LoadingStatus: {loadingStatus},
      LoadedValues: {loadedValues}
    </div>
  );
}

// const buttonModule = () => ({
//
//   onButtonClick() {
//     console.log('Button clicked');
//     return 1;
//   },
// });
//
// const mi: TModuleInstanceFor<typeof buttonModule>;
// const { onButtonClick } = mi;
// onButtonClick();


const myBaseModule = useModuleInstance(UsersModule);
myBaseModule.state
