// module aggregation

import { IfEquals } from '../useModule';

class UserService {

  users = [];

}

class LogsService {

  logs = [];
}

class WrapperModule {

  usersService!: UserService;
  logsService!: LogsService;

  wrappers = [];
  private privateWrappers = [];
  readonly readWrappers = [];
}


type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;

type WritableKeysOf<T> = {
  // eslint-disable-next-line no-undef
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];

const wkeys: WritableKeysOf<WrapperModule>[] = ['wrappers', 'readWrappers'];

const view1: PickAndFlatten<WrapperModule, 'usersService'> = null as any;

type TIsQueryName<Key> = Key extends `query${string}` ? Key : never;
type PickQueries<T> = Pick<T, TIsQueryName<keyof T>>;

