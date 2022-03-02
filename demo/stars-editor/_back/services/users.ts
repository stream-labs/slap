import { v4 as uuid } from 'uuid';
import { inject, mutation } from '../../../lib';
import { DBService } from './db';

export class UsersService {
  services = inject({ DBService });

  state = {
    users: [] as any[],
  };


  get users() {
    return this.services.DBService.db.collections.users;
  }

  init() {
    this.services.DBService.onReady.subscribe(async db => {
      db.collections.users.$.subscribe(async changeEvent => {
        const users = await db.collections.users.find().exec();
        this.setUsers(users);
        console.log('users updated');
      });
    });
  }

  addUser() {
    const id = uuid();
    this.users.atomicUpsert({
      id,
      name: `User ${id}`,
      color: 'green',
    });
  }

  removeUser() {
    const user = this.state.users[0];
    if (!user) return;
    this.users.findOne(user.id).exec().then(item => item.remove());
  }

  @mutation()
  setUsers(users: any[]) {
    this.state.users = users;
  }
}
