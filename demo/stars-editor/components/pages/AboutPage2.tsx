import React from 'react';
import { createStateViewForModule, useComponentView, useModuleInstance, useModule } from '../../../../dist/lib';
import { useModule } from '../../../../lib';
import { UsersModule } from './UsersPage';
// import { createStateViewForModule, useComponentView, useModuleInstance } from '../../../../lib';
// import { useModule } from '../../../../lib';

export function AboutPage () {


  const myQueriesModule = useModule(UsersModule);
  myQueriesModule.state

  const myBaseModule = useModuleInstance(UsersModule);
  myBaseModule.state.users
  // const view = createStateViewForModule(myBaseModule);
  // view.props.users;
  // const baseComp = useComponentView(myBaseModule, '1', '1');
  // myBaseModule.users;
  //
  // const myModule = useModule(UsersModule).extend(() => ({ bar: 2 }));
  // myModule.users;
  // myModule.bar;

  return <div>This is about page</div>;
  // return <ServerApp />;
}
