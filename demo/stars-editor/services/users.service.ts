import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import {
  useResolveModule, useComponentView, mutation,
} from '../../../lib';
import { traverseClassInstance } from '../../../lib/traverseClassInstance';
import { TMerge } from '../../../lib/merge';
import { Dict } from '../../../lib/scope';
import { createSchema, injectCollection } from '../../../lib/slapp/db.service';

export class UsersService {
  state = {
    usersCnt: 0,
  };

  usersCollection = injectCollection(userSchema);

  get users$() {
    return this.usersCollection.items.find().$;
  }

  get onlineUsers$() {
    return this.usersCollection.items.find().where({ isOnline: true }).$;
  }

  get queryOfflineUsers() {
    return this.usersCollection.items.find().where({ isOnline: false });
  }

  async onLoad() {
    const users = this.usersCollection;
    users.items.find().$.subscribe(users => {
      console.log('users updated', users);
      this.setUsersCnt(users.length);
    });// TODO unsubscribe
    await this.addUser();
    await this.addUser();
  }

  async addUser() {
    const id = uuid();
    await this.usersCollection.items.upsert({
      id,
      name: `User ${id}`,
      isOnline: !(Math.random() > 0.5),
    });
  }

  @mutation()
  setUsersCnt(cnt: number) {
    this.state.usersCnt = cnt;
  }

  removeUser() {
    this.usersCollection.items.findOne().exec().then(item => item && item.remove());
  }

  getHelloWorld(name: string) {
    return `Hello ${name}`;
  }

  getUserController() {

  }
}


// export function useService<
//   TService,
//   TSelectorResult,
//   TResult extends TMerge<TServiceView<TService>, TSelectorResult>
//   >
// (ModuleClass: new(...args: any[]) => TService, selectorFn: (view: TServiceView<TService>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
//   const moduleMetadata = useProvider(ModuleClass, (instance: any) => createServiceView(instance));
//   const selectResult = useComponentView(moduleMetadata.view, selectorFn);
//   return selectResult as TResult;
// }


export const userSchema = createSchema({
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
    isOnline: {
      type: 'boolean',
    },
  },
  required: [
    'id',
    'name',
  ],
} as const);
