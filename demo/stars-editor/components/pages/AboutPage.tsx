import React from 'react';
import { useModule } from '../../../../lib';
// import { ServerApp } from '../ServerApp';




export function AboutPage () {

  // type GetUseModuleResult<TModuleConfig> = TModuleConfig & {
  //   extend: <TNewProps>(newPropsFactory: (props: TModuleConfig) => TNewProps) => TNewProps
  // }
  //
  class MyModule {
    foo = 1;
    bar = 2;
  }
  //
  // const mBase1 = null as any as GetUseModuleResult<MyModule>;
  // let { zoom } = mBase1.extend(m => ({
  //   zoom: 1,
  // }));
  //
  // zoom = '1';

  // const { zoom } = mExtended;
  // mExtended.bar;
  // mExtended.zoom;
  // const zoom = mExtended.zoom;

  // let {
  //   foo, bar, zoom, log, badaboom
  // } = useModule(MyModule).extend(m => {
  //
  //   class MyModuleExtended extends MyModule {
  //     boom = 4;
  //     badaboom = this.boom + 5;
  //   }
  //
  //   return MyModuleExtended;
  //
  //   // const result = {
  //   //   zoom: 3,
  //   //   log: this.zoom,
  //   // }
  //   // return result;
  //
  // });



  return <div>This is about page</div>;
  // return <ServerApp />;
}





