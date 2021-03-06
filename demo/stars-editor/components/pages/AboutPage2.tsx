import React from 'react';
import {
  createStateViewForModule, useComponentView, useModuleInstance, useModule, inject, QueryModule,
} from '../../../../dist';
// import { UsersModule } from './UsersPage';
// import { createStateViewForModule, useComponentView, useModuleInstance } from '../../../../lib';
// import { useModule } from '../../../../lib';

class MyModule {
  foo: 1;
  bar: 2;
}

const {
  foo, bar, zoom, log,
} = useModule(MyModule).extend(m => {

  const result = {
    zoom: 3,
    log: this.zoom,
  }
  return result;

});

//
// export function AboutPage () {
//
//   const myUsersModule = useModule(UsersModule);
//   myUsersModule.state;
//
//   const { addNewUser, query } = useModule(UsersModule, { users: [] }).extend(m => ({
//
//     query: inject(QueryModule),
//
//     addNewUser() {
//       m.createUser();
//       query.fetch();
//       return m.state.users[1];
//     },
//   }));
//
//   // const view = createStateViewForModule(myBaseModule);
//   // view.props.users;
//   // const baseComp = useComponentView(myBaseModule, '1', '1');
//   // myBaseModule.users;
//   //
//   // const myModule = useModule(UsersModule).extend(() => ({ bar: 2 }));
//   // myModule.users;
//   // myModule.bar;
//
//   return <div>This is about page</div>;
//   // return <ServerApp />;
// }
