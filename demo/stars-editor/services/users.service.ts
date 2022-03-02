import { v4 as uuid } from 'uuid';
import { inject } from '../../../lib';
import { DBService } from '../../../lib/slapp/db.service';
import { injectCollections } from '../../../lib/slapp/injectors';

export class UsersService {
  services = inject({ DBService });
  collections = injectCollections({ users: userSchema });

  async addUser() {
    const id = uuid();
    this.collections.users.upsert({
      id,
      name: `User ${id}`,
      color: 'green',
    });
  }

  removeUser() {
    this.collections.users.findOne().exec().then(item => item.remove());
  }
}

export const userSchema = {
  name: 'users',
  title: 'Users schema',
  description: 'describes users',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
  required: [
    'id',
    'name',
  ],
};
