import { GetProps, StateView } from '../StateView';
import { forEach, getInstanceMetadata, Injector } from '../../scope';
import { Flatten } from '../../scope/flatten';

export function pickInjectors<
  TView extends StateView<any>,
  TModule
  >(module: TModule): (props: GetProps<TView>, view: TView) => PickInjectedViews<TView, TModule> {

  return function (props, view) {

    const provider = getInstanceMetadata(module).provider;
    let newView = view;

    forEach(provider.injectors, injector => {
      if (!injector.hasViewValue()) return;

      const injectorView = injector.resolveViewValue() as StateView<any>;
      newView = newView.mergeView(injectorView);
      newView.defineProp({
        type: 'InjectorView',
        name: injector.propertyName,
        reactive: true,
        stateView: injectorView,
        getValue() {
          return injectorView;
        },
      });
    });

    return newView;
  };
}

export type GetInjectedPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends { __injector: Injector<any, any>} ? TProp : never;
export type GetInjectedProps<TModule> = {[K in keyof TModule as GetInjectedPropName<TModule, K>]: TModule[K] extends { __injector: Injector<any, StateView<infer TInjectorView>>} ? TInjectorView: never }
export type GetFlattenInjectedProps<TModule> = Flatten<GetInjectedProps<TModule>>
export type GetAllInjectedProps<TModule> = GetFlattenInjectedProps<TModule> & GetInjectedProps<TModule>;

export type PickInjectedViews<TView, TModule> = StateView<GetProps<TView> & GetFlattenInjectedProps<TModule>>;


// type TSuperUser = {
//   id: string,
//   name: string,
// }
//
// const usersModule = new UsersModule();
//
//
// const userBase = {
//
//   loading: injectLoading(),
//
//   state: injectState({
//     users: [] as TSuperUser[],
//   }),
// }
//
// const userExtention = {
//
//   extendedFoo: 1,
//
//   state: injectState({
//     selectedUserId: 'user2',
//   }),
// }


// type BaseUser = GetAllInjectedProps<typeof userBase> & typeof userBase;
// type ExtendedUser = GetAllInjectedProps<typeof userExtention> & typeof userExtention
// const baseUser: BaseUser;
// baseUser.users;
// baseUser.state;
// baseUser.loading
//
// const extendedUser: ExtendedUser;
// extendedUser.selectedUserId;
// extendedUser.state;
//
//
// const mergedUser: Omit<BaseUser, keyof ExtendedUser> & ExtendedUser;
//
// mergedUser.users
// mergedUser.selectedUserId
// mergedUser.state
