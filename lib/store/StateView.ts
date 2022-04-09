// composition layer
// construct a ReactiveObject based on given presets
// has module,stateSelector and allow extending
import {
  defineGetter, Dict, forEach, Scope, TModuleInstanceFor,
} from '../scope';
import { getInstanceMetadata } from '../scope/provider';
import { pickProps } from './plugins/pickProps';
import { Store } from './Store';
import {
  GetAllInjectedProps,
  GetInjectedProps,
  pickInjectors
} from './plugins/pickInjectors';
export class StateView<TProps = {}> {

  props: TProps = {} as TProps;
  proxy: TProps;
  descriptors = {} as TGetDescriptorsForProps<TProps>;
  selectedDescriptors = {} as TGetDescriptorsForProps<TProps>;
  hasReactiveProps = false;
  hasSelectedProps = false;
  hasWildcardProps = false;
  wildcardPropCreator = null as null | ((propName: string) => unknown);

  constructor(public scope?: Scope) {
    this.proxy = new Proxy(
      {
        __proxyName: 'StateViewProxy', // set proxy name for debugging
      },
      {
        get: (target: any, propName: string) => {
          if (propName === 'hasOwnProperty') return target.hasOwnProperty;
          if (propName in target) return (target as any)[propName];
          const value = this.selectValue(propName as keyof TProps);
          return value;
        },
      },
    ) as any;
  }

  defineProp<TValue>(descriptorParams: TConstructDescriptorProps<TValue>) {
    const descriptor: TModulePropDescriptor<TValue> = {
      configurable: true,
      enumerable: true,
      reactive: false,
      getRev: descriptorParams.getValue,
      stateView: null,
      dynamic: false,
      ...descriptorParams,
    };
    (this.descriptors as any)[descriptor.name] = descriptor;
    if (descriptor.reactive) this.hasReactiveProps = true;
    defineGetter(this.props as any, descriptor.name, () => descriptor.getValue());
  }

  defineWildcardProp(cb: StateView['wildcardPropCreator']) {
    this.hasWildcardProps = true;
    this.wildcardPropCreator = cb;
  }

  private selectValue(propName: keyof TProps) {
    let descriptor = this.descriptors[propName];

    if (!descriptor) {
      if (!this.wildcardPropCreator) {
        throw new Error(`Property ${propName} is not defined`);
      }
      this.wildcardPropCreator(propName as string);
      descriptor = this.descriptors[propName];
    }

    if (descriptor.reactive) {
      this.selectedDescriptors[propName] = descriptor;
      if (!this.hasSelectedProps) this.hasSelectedProps = true;
      if (descriptor.stateView) return descriptor.stateView.proxy;
    }
    return descriptor.getValue();
  }

  getSnapshot() {
    const selectedDescriptors = this.selectedDescriptors;
    const props = {} as TProps;


    forEach(selectedDescriptors, (descr, propName) => {
      let value: unknown;
      if (descr.stateView) {
        const getRev = (this.descriptors as any).getRev;
        if (getRev) {
          value = getRev.getValue();
        } else {
          value = descr.stateView.getSnapshot();
        }
      } else {
        value = descr.getRev();
      }

      (props as any)[propName] = value;
    });
    return props;
  }

  // use for debugging
  get selectedProps() {
    const selectedDescriptors = this.selectedDescriptors;
    const result = {} as TProps;
    forEach(selectedDescriptors, (descr, propName) => {
      if (!descr.reactive) return;
      // @ts-ignore
      result[propName] = descr.getRev();
    });
    return result;
  }

  getAnalytics() {
    // TODO ?
  }

  // DEFINE MULTIPLE WAYS FOR EXTENDING THE ModuleView
  // TODO: remove overloads that we will never use

  /**
   * // Extend with a factory returning a new ModuleView
   *
   * module.extend((props, view) => {
   *   const module = scope.resolve(MyModule)
   *   return new ModuleView(module)
   * })
   */
  select<TNewView extends StateView<any>>(newViewFactory: (props: TProps, view: StateView<TProps>) => TNewView): TNewView {
    return newViewFactory(this.props, this);
  }

  // eslint-disable-next-line no-dupe-class-members
  extend<TNewProps>(newPropsFactory: (props: TProps, view: StateView<TProps>) => TNewProps, name: string): ExtendView<TProps, TNewProps> {
    if (!this.scope) {
      throw new Error('You should define a Scope to use .extend()');
    }

    if (!this.scope.isRegistered(name)) {
      const factory = () => newPropsFactory(this.props, this);
      const provider = this.scope.register(factory, name);
      const extendedModule = this.scope.resolve(name);
      const extendedModuleView = createStateViewForModule(extendedModule);
      const mergedView = this.mergeView(extendedModuleView);
      provider.setMetadata('StateView', mergedView);
      // TODO destroy module after component destroy, create a component scope
    }

    const provider = this.scope.resolveProvider(name);
    const extendedView = provider.getMetadata('StateView');
    return extendedView;
  }

  clone() {
    const clone = new StateView<TProps>(this.scope);
    forEach(this.descriptors, descriptor => clone.defineProp(descriptor));
    clone.components = this.components;
    return clone;
  }

  mergeView<
    TExtension extends StateView<any>,
    TResult = ExtendView<TProps, TExtension>
    >(extension: TExtension): TResult {
    // merge one view into another
    const mergeResult = this.clone();
    forEach(extension.descriptors, descriptor => mergeResult.defineProp(descriptor as any));
    return mergeResult as any as TResult;
  }

  // TODO remove components

  components = {} as Dict<ComponentView<any>>;

  registerComponent<TView extends StateView<TProps>>(store: Store, componentId: string, forceUpdate: Function): ComponentView<TView> {
    const componentView = new ComponentView<TView>(store, this as any, componentId, forceUpdate);
    this.components[componentId] = componentView;
    return componentView;
  }

  destroyComponent(componentId: string) {
    if (this.scope?.isRegistered(componentId)) {
      this.scope.unregister(componentId);
    }
    const componentView = this.components[componentId];
    if (!componentView) return;
    componentView.destroy();

    delete this.components[componentId];
  }

}

export function createStateViewForModule<T>(module: T) {
  const scope = getInstanceMetadata(module).provider.scope;
  const stateView = new StateView(scope);
  return stateView
    .select(pickProps(module)) // expose the module props
    .select(pickInjectors(module)) as StateView<GetModuleView<T>>; // expose injectors
}

export type GetModuleView<TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>> = GetAllInjectedProps<TModule> & Omit<TModule, keyof GetInjectedProps<TModule>>
export type GetModuleStateView<TModuleConfig> = StateView<GetModuleView<TModuleConfig>>;

// const userExtention = {
//
//
//   extendedFoo: 1,
//
//   state: injectState({
//     selectedUserId: 'user2',
//   }),
// }
//
// const users = new UsersModule();
// const usersView = createStateViewForModule(users);
// usersView.props.state.users
// usersView.props.users;
// const extendedUser = usersView.extend(() => userExtention, 'userext');
// extendedUser.props.users;
// extendedUser.props.state;
// extendedUser.props.selectedUserId;
// extendedUser.props.loading;



export type ExtendView<TBaseProps, TExtendedModule> = StateView<TBaseProps & GetModuleView<TExtendedModule>>;



// export type MergeViews<
//   TView1 extends StateView<any>,
//   TView2 extends StateView<any>
//   > = StateView<GetProps<TView1> & GetProps<TView2>>
//
// export type MergeModuleWithView<
//   TView1 extends StateView<any>,
//   TModule
//   > = StateView<GetProps<TView1> & GetModuleStateView<TModule> >

export class ComponentView<TStateView extends StateView<any>> {
  public isDestroyed = false;
  public isMounted = false;
  public isInvalidated = false;

  lastSnapshot = {
    affectedModules: {} as Dict<number>,
    props: null as unknown,
  }

  constructor(public store: Store, public stateView: TStateView, public id: string, public forceUpdate: Function) {
  }

  makeSnapshot() {
    const snapshot = {
      affectedModules: {},
      props: null,
    };

    snapshot.affectedModules = this.store.listenAffectedModules(() => {
      snapshot.props = this.stateView.getSnapshot();
    });

    this.lastSnapshot = snapshot;
    return snapshot;
  }

  needUpdate() {
    return this.isInvalidated && this.isMounted && !this.isDestroyed;
  }

  mount() {
    this.isMounted = true;
  }

  setInvalidated(invalidated: boolean) {
    this.isInvalidated = invalidated;
  }

  destroy() {
    this.isDestroyed = true;
    this.isMounted = false;
  }
}

// const editor = new EditorService();
// const ev = createStateViewForModule(editor);
// ev.props.getScene(1);
// ev.props.setActiveSceneId()
// ev.props.getScene(1);
// ev.props.getSceneController(1);
// ev.props.myRandomVal;
// ev.props.bindActiveItem
// //
// const evprop: GetStateViewProps<EditorService>
// evprop.bindActiveItem.props

// //
// const sv = new StateView();
// const ed2 = sv.extend(pickState(editor));
// const pickedStateFn = pickState(ed2);
// const pickedState = pickedStateFn(sv.props, sv);
// const edState: GetModuleState<EditorService>
// edState.setActiveSceneId()
//
// const ev2 = useComponentView(ev);
// ev2.isLoading
// ev2.getScene('1')

// const contProps: GetControllerProps<typeof ev.props>;
// contProps.getScene(1);
// const mergedProps: GetControllerProps<typeof ev.props> & GetProps<typeof ev>
// mergedProps.getScene(1);
// const module: GetModule<typeof ev>
// const mergedView:  ModuleView<GetModule<typeof ev>, GetProps<typeof ev> & GetControllerProps<GetModule<typeof ev>>>;
// mergedView.props.

// const evCont = ev.extend(pickControllers);
//
// evCont.props.getScene()
// evCont.props.setActiveSceneId
// e
// const ev2: PickState<ModuleView<TModuleInstanceFor<EditorService>, TModuleInstanceFor<EditorService>>> = null as any;
//
// const st: GetState<ModuleView<EditorService, EditorService>>;
// const stProps: GetState<ModuleView<EditorService, EditorService>> & GetProps<ModuleView<EditorService, EditorService>>;
// st.props
// stProps.setActiveSceneId(1)
// ev2.props.setActiveSceneId(1);
// // /**
//  * // Extend with a factory returning an object
//  *
//  * module.extend(module => {
//  *   const foo = module.foo;
//  *   const bar = 2;
//  *   const foobar = foo + bar;
//  *   return { foo, foobar };
//  * })
//  */
// // extend<TNewProps>(newPropsFactory: (props: TProps) => TNewProps): MergeViews<ModuleView<TModule, TProps>, TDefaultViewFor<TNewProps>>;
// /**
//  * // extend with an object
//  *
//  * module.extend({
//  *   foo: 1,
//  *   bar: 2,
//  * })
//  */

export type TModulePropDescriptor<TValue> = {
  type: string,
  name: string,
  reactive: boolean,
  stateView: StateView | null,
  getValue(): TValue,
  getRev(): unknown, // used for fast comparison of complex object, use getValue() as default value
  enumerable: boolean,
  configurable: boolean,
  dynamic: boolean,
  // module: unknown, // one module view can be assembled from multiple modules
}

export type TConstructDescriptorProps<TValue, TDescriptor = TModulePropDescriptor<TValue>> = Partial<TDescriptor> & Required<Pick<TModulePropDescriptor<TValue>, 'type' | 'name' | 'getValue'>>
export type TGetDescriptorsForProps<TProps extends Dict<any>> = {[P in keyof TProps]: TModulePropDescriptor<TProps[P]>}
export type GetProps<TModuleView> = TModuleView extends StateView<infer TProps> ? TProps : never;
