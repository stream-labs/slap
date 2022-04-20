import { GetProps, StateView } from '../StateView';
import {
  forEach, getInstanceMetadata, InjectableModule, Injector, Provider,
} from '../../scope';
import { Flatten } from '../../scope/flatten';
import { traverse } from '../../utils';

export function pickInjectors<
  TView extends StateView<any>,
  TModule
  >(module: TModule): (props: GetProps<TView>, view: TView) => PickInjectedViews<TView, TModule> {

  return function (props, view) {

    let newView = view;

    traverse(module as any as object, (propName, descr) => {

      if (descr.get) return;
      const provider = descr.value.__provider as Provider<any>;
      if (!provider) return;

      const module = provider.instance as InjectableModule;
      const componentData = module.exportComponentData && module.exportComponentData();
      const injectedValue = module.exportInjectorValue ? module.exportInjectorValue() : module;

      const extraProps = componentData && componentData.extra;
      if (extraProps) {
        const extraPropsView = extraProps as StateView<any>;
        forEach(extraPropsView.descriptors, (descriptor, p) => {
          if (!(descriptor.name in module)) newView.defineProp(descriptor);
        });
        newView = newView.mergeView(extraProps as any);
      }

      const selfProps = componentData && componentData.self;
      if (selfProps) {
        newView.defineProp({
          type: 'InjectorView',
          name: propName,
          reactive: true,
          stateView: selfProps as any,
          getValue() {
            return injectedValue;
          },
        });
      }
    });

    // const provider = getInstanceMetadata(module).provider;
    // let newView = view;
    //
    // forEach(provider.injectors, injector => {
    //   const componentData = injector.getComponentData();
    //
    //   const extraProps = componentData.extra;
    //   if (extraProps) {
    //     const extraPropsView = extraProps as StateView<any>;
    //     forEach(extraPropsView.descriptors, (descriptor, p) => {
    //       if (!(descriptor.name in module)) newView.defineProp(descriptor);
    //     });
    //     newView = newView.mergeView(extraProps as any);
    //   }
    //
    //   const selfProps = componentData.self;
    //   if (selfProps) {
    //     newView.defineProp({
    //       type: 'InjectorView',
    //       name: injector.propertyName,
    //       reactive: true,
    //       stateView: selfProps as any,
    //       getValue() {
    //         return injector.resolveValue();
    //       },
    //     });
    //   }
    //
    // });

    return newView;
  };
}

export type GetInjectedPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends { __injector: Injector<any, any, any>} ? TProp : never;
export type GetInjectedExtraPropName<TModule, TProp extends keyof TModule> = TModule[TProp] extends { __injector: Injector<any, any, infer TExtraProps>} ? TExtraProps extends StateView ? TProp : never : never;

export type GetInjectedProps<TModule> = {[K in keyof TModule as GetInjectedPropName<TModule, K>]: TModule[K] extends { __injector: Injector<any, StateView<infer TInjectorView>, any>} ? TInjectorView: never }
export type GetExtraInjectedProps<TModule> = {[K in keyof TModule as GetInjectedExtraPropName<TModule, K>]: TModule[K] extends { __injector: Injector<any, any, StateView<infer TExtraProps>>} ? TExtraProps: never }
export type GetFlattenExtraProps<TModule> = keyof GetExtraInjectedProps<TModule> extends never ? {} : Flatten<GetExtraInjectedProps<TModule>>
export type GetAllInjectedProps<TModule> = GetFlattenExtraProps<TModule> & GetInjectedProps<TModule>;

export type PickInjectedViews<TView, TModule> = StateView<GetProps<TView> & GetAllInjectedProps<TModule>>;

// type Keytype = keyof GetExtraInjectedProps<QueriesModule>;
// type Queryprops = keyof GetExtraInjectedProps<QueriesModule> extends never ? {} : Flatten<GetExtraInjectedProps<QueriesModule>>

// const injProps: Queryprops;
// injProps.onlineUsersQuery

// const injProps: GetAllInjectedProps<QueriesModule>;
// injProps.onlineUsersQuery
// injProps.onlineUsersQuery.setData;
// injProps.setData
// //
// const injProps2: GetFlattenExtraProps<QueriesModule>;
// injProps2.onlineUsersQuery.setData;
// injProps2.setData
//
//
// const injPropsExtra: GetExtraInjectedProps<QueriesModule>;
// const injPropsExtra2: GetModuleExtraView<QueriesModule>;
// injPropsExtra2.

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
