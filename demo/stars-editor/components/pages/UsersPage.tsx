import React from 'react';
import { useModule, injectState, TModuleInstanceFor } from '../../../../lib';
import { generateId } from '../../../../lib/scope';

type TUser = {
  id: string;
  name: string;
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
      return 'Hello' + tmpl;
    },
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
  const { createUser, foo, getHelloWorld } = useModule(UsersModule);

  return (
    <div>
      <div>
        Message: {getHelloWorld('Woaha')}
        Foo: {foo}
      </div>

      <UsersList />
      <button onClick={createUser}>Add user</button>
      <UsersFooter />
    </div>
  );
}

// nested store
export function UsersList() {
  const { users, selectedUserId, setSelectedUserId } = useModule(UsersModule).extend(users => ({

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
      // eslint-disable-next-line react/no-this-in-sfc
      this.state.setCounter(this.state.counter + 1);
      console.log('Button clicked');
    },
  }));

  const { onButtonClick, counter } = stateView;

  return <button onClick={onButtonClick}> Inc counter {counter}</button>;
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
