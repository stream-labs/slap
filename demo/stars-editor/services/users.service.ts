import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import {
  TPromisifyFunctions, useProvider, useComponentView, mutation,
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
    return this.usersCollection.find().$;
  }

  get onlineUsers$() {
    return this.usersCollection.find().where({ isOnline: true }).$;
  }

  get queryOfflineUsers() {
    return this.usersCollection.find().where({ isOnline: false });
  }

  async onLoad() {
    const users = this.usersCollection;
    users.find().$.subscribe(users => {
      console.log('users updated', users);
      this.setUsersCnt(users.length);
    });// TODO unsubscribe
    await this.addUser();
    await this.addUser();
  }

  async addUser() {
    const id = uuid();
    await this.usersCollection.upsert({
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
    this.usersCollection.findOne().exec().then(item => item && item.remove());
  }

  getHelloWorld(name: string) {
    return `Hello ${name}`;
  }

  getUserController() {

  }
}

export function createServiceView<TService extends Object>(service: TService): TServiceView<TService> {
  const view = {
    moduleSchema: {},
  } as any;
  const module = service as any;

  // append state and flatten state
  if (module.state) {
    defineGetter(view, 'state', () => module.state);
    traverseClassInstance(module.state, stateKey => {
      view.moduleSchema[stateKey] = 'state';
      defineGetter(view, stateKey, () => module.state[stateKey]);
    });
  }

  // append methods
  traverseClassInstance(service, (propName, descriptor) => {
    const module = service as any;

    if (propName.endsWith('$')) { // handle behavior-subject
      view.moduleSchema[propName] = 'behaviorSubject';
      defineGetter(view, propName, () => module[propName]);
      return;
    }

    if (descriptor.get) {
      view.moduleSchema[propName] = 'getter';
      defineGetter(view, propName, () => module[propName]);
      return;
    }
    view[propName] = (...args: any) => module[propName](...args);
  });
  return view as TServiceView<TService>;
}

export interface IModuleView {
  moduleSchema: Dict<'state' | 'getter' | 'getterFunction' | 'behaviorSubject' | 'behaviorSubjectValue'>
}

function defineGetter(target: object, methodName: string, getter: () => any) {
  Object.defineProperty(target, methodName, {
    configurable: true,
    enumerable: true,
    get: getter,
  });
}

export function useService<
  TService,
  TSelectorResult,
  TResult extends TMerge<TServiceView<TService>, TSelectorResult>
  >
(ModuleClass: new(...args: any[]) => TService, selectorFn: (view: TServiceView<TService>) => TSelectorResult = () => ({} as TSelectorResult)): TResult {
  const moduleMetadata = useProvider(ModuleClass, (instance: any) => createServiceView(instance));
  const selectResult = useComponentView(moduleMetadata.view, selectorFn);
  return selectResult as TResult;
}

export type TServiceView<
  TService extends Object,
  TState = TService extends { state?: any } ? TService['state'] : {},
  > =
  TState &
  { isLoaded: boolean } &
  PickGetters<TService> &
  PickGetterFunctions<TService> &
  PickAsyncMethods<TService> &
  PickSubjectValues<TService>;

// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];
type WritablePart<T> = Pick<T, WritableKeysOf<T>>;

type FilterConditionally<Source, Condition> = Pick<Source, {[K in keyof Source]: Source[K] extends Condition ? K : never}[keyof Source]>;
type TIsGetterFunctionName<Key> = Key extends `get${string}` ? Key : never;
type TIsControllerFactoryName<Key> = Key extends `${string}Controller` ? Key : never;
type TIsBehaviorSubjectName<Key> = Key extends `${string}$` ? Key : never;
type TIsMethodName<T, K extends keyof T> = T[K] extends Function ? K : never;
type TPickFunctions<T> = FilterConditionally<T, Function>
type PickAsyncMethods<T> = TPromisifyFunctions<Omit<TPickFunctions<T>, TIsGetterFunctionName<keyof T>>>;

// type TBehaviorSubjectName<T, Key> = T[Key] extends BehaviorSubject<any>

type PickGetterFunctions<T> = Pick<T, TIsGetterFunctionName<keyof T>>
type PickGetters<T> = Omit<T, WritableKeysOf<T>>;
type PickBehaviorSubjects<T> = Pick<T, TIsBehaviorSubjectName<keyof T>>

type Erase$<TStr> = TStr extends `${infer TName}$` ? TName : never;
type PickSubjectValues<T> = {[K in keyof T as Erase$<K>]: T[K] extends Observable<infer TValue> ? TValue : never }

// const sv: PickSubjectValues<UsersService>;
// sv.users

// export const userSchema = {
//   name: 'users',
//   title: 'Users schema',
//   description: 'describes users',
//   version: 0,
//   primaryKey: 'id',
//   type: 'object',
//   properties: {
//     id: {
//       type: 'string',
//     },
//     name: {
//       type: 'string',
//     },
//     isOnline: {
//       type: 'boolean',
//     },
//   },
//   required: [
//     'id',
//     'name',
//   ],
// } as const;

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
