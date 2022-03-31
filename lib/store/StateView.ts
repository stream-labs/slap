// composition layer
// construct a ReactiveObject based on given presets
// has module,stateSelector and allow extending
import { defineGetter, Dict, forEach, Scope, TModuleInstanceFor } from '../scope';
import { getInstanceMetadata } from '../scope/provider';
import { pickProps } from './plugins/pickProps';
import { GetStateViewProps, pickStateViews } from './plugins/pickStateViews';
import { GetLoadingState, pickLoadingState } from './plugins/pickLoadingState';
import { GetModuleState, pickState } from './plugins/pickState';
import { GetControllerProps, pickControllers } from './plugins/pickControllers';

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

    const value = descriptor.getValue();
    if (descriptor.reactive) {
      this.selectedDescriptors[propName] = descriptor;
      if (!this.hasSelectedProps) this.hasSelectedProps = true;
    }
    return value;
  }

  getSnapshot() {

    // TODO get affected modules?
    const selectedDescriptors = this.selectedDescriptors;
    const result = {} as TProps;
    forEach(selectedDescriptors, (descr, propName) => {
      (result as any)[propName] = descr.stateView ? descr.stateView.getSnapshot() : descr.getRev();
    });
    return result;
  }

  // use for debugging
  get selectedProps() {
    const selectedDescriptors = this.selectedDescriptors;
    const result = {} as TProps;
    forEach(selectedDescriptors, (descr, propName) => {
      if (!descr.reactive) return;
      // @ts-ignore
      result[propName] = descr.getHash();
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
  extend<TNewView extends StateView<any>>(newViewFactory: (props: TProps, view: StateView<TProps>) => TNewView): TNewView;

  // eslint-disable-next-line no-dupe-class-members
  extend<TNewProps>(newProps: TNewProps): MergeViews<StateView<TProps>, TStateViewFor<TNewProps>>;
  // eslint-disable-next-line no-dupe-class-members
  extend(fn: Function): StateView<any> {
    const extendResult = fn(this.props, this);

    if (extendResult instanceof StateView) {
      return extendResult;
    }

    if (typeof extendResult === 'object') {
      if (!this.scope) {
        throw new Error('You should define a Scope to use .extend()');
      }
      const extendedModule = this.scope.create(extendResult);// TODO destroy module after component destroy, create a component scope
      const extendedModuleView = createStateViewForModule(extendedModule); // TODO do not use the same pickers
      const result = this.mergeView(extendedModuleView);
      return result;
    }

    throw new Error('Can not extend the module');
  }

  clone() {
    const clone = new StateView<TProps>(this.scope);
    forEach(this.descriptors, descriptor => clone.defineProp(descriptor));
    clone.components = this.components;
    return clone;
  }

  mergeView<
    TExtension extends StateView<any>,
    TResult = MergeViews<StateView<TProps>, TExtension>
    >(extension: TExtension): TResult {
    // merge one view into another
    const mergeResult = this.clone();
    forEach(extension.descriptors, descriptor => mergeResult.defineProp(descriptor as any));
    return mergeResult as any as TResult;
  }

  components = {} as Dict<ComponentView<any>>;

  registerComponent<TView extends StateView<TProps>>(componentId: string, forceUpdate: Function): ComponentView<TView> {
    const componentView = new ComponentView<TView>(this as any, componentId, forceUpdate);
    this.components[componentId] = componentView;
    return componentView;
  }

  destroyComponent(componentId: string) {
    const componentView = this.components[componentId];
    if (!componentView) return;

    delete this.components[componentId];
  }

}

export function createStateViewForModule<T>(module: T) {
  const scope = getInstanceMetadata(module).provider.scope;
  const stateView = new StateView(scope);
  return stateView
    .extend(pickProps(module)) // expose the module props
    .extend(pickStateViews(module)) // expose children stateViews
    .extend(pickLoadingState(module)) // expose the module loading state
    .extend(pickState(module)) // expose the reactive state
    .extend(pickControllers(module)); // expose controllers
}

export type TStateViewFor<TModuleConfig, TModule = TModuleInstanceFor<TModuleConfig>> =
  StateView< TModule & GetStateViewProps<TModule> & GetLoadingState & GetModuleState<TModule> & GetControllerProps<TModule>>

export type MergeViews<
  TView1 extends StateView<any>,
  TView2 extends StateView<any>
  > = StateView<GetProps<TView1> & GetProps<TView2>>

export class ComponentView<TStateView extends StateView<any>> {
  constructor(public stateView: TStateView, public id: string, public forceUpdate: Function) {
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

