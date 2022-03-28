import {
  Dict, forEach, Scope, TModuleInstanceFor,
} from '../../scope';
import { pickState, PickState } from './pickState';
import { pickControllers, PickControllers } from './pickControllers';
import { PickLoadingState, pickLoadingState } from './pickLoadingState';
import { StateSelector } from './state-selector';
import { PickModuleProps, pickProps } from './pickProps';

// composition layer
// construct a ReactiveObject based on given presets
// has module,stateSelector and allow extending
export class StateView<TModule, TProps = TModule> {

  // propsDescriptors = {} as TGetDescriptorsForProps<TProps>;
  stateSelector = new StateSelector<TProps>();

  constructor(public module: TModule) {
    this.stateSelector = new StateSelector();
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
  extend<TNewView extends StateView<any, any>>(newViewFactory: (props: TProps, view: StateView<TModule, TProps>) => TNewView): TNewView;

  // eslint-disable-next-line no-dupe-class-members
  extend<TNewProps>(newProps: TNewProps): MergeViews<StateView<TModule, TProps>, TDefaultViewFor<TNewProps>>;
  // eslint-disable-next-line no-dupe-class-members
  extend(fn: Function): StateView<any> {
    const extendResult = fn(this.stateSelector.props, this);

    if (extendResult instanceof StateView) {
      return extendResult;
    }

    if (typeof extendResult === 'object') {
      const scope: Scope = (this.module as any).__provider.scope;
      const extendedModule = scope.create(extendResult);// TODO destroy module after component destroy, create a component scope
      const extendedModuleView = createDefaultModuleView(extendedModule); // TODO do not use the same pickers
      const result = this.mergeView(extendedModuleView);
      // result.module = extendedModule;
      return result;
    }

    throw new Error('Can not extend the module');
  }

  clone() {
    const clone = new StateView<TModule, TProps>(this.module);
    clone.stateSelector = this.stateSelector.clone();
    clone.components = this.components;
    return clone;
  }

  mergeView<
    TExtension extends StateView<any, any>,
    TResult = MergeViews<StateView<TModule, TProps>, TExtension>
    >(extension: TExtension): TResult {
    // merge one view into another
    const mergeResult = this.clone();
    forEach(extension.stateSelector.descriptors, descriptor => mergeResult.stateSelector.defineProp(descriptor as any));
    return mergeResult as any as TResult;
  }

  components = {} as Dict<ComponentView<any>>;

  registerComponent<TView extends StateView<TModule, TProps>>(componentId: string, forceUpdate: Function): ComponentView<TView> {
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

export function createModuleView<T>(module: T) {
  return new StateView(module);
}

export function createDefaultModuleView<T>(module: T) {
  return createModuleView(module)
    .extend(pickProps)
    .extend(pickLoadingState)
    .extend(pickState)
    .extend(pickControllers);
}

export type TDefaultViewFor<TModuleConfig> =
  PickControllers<
    PickState<
      PickLoadingState<
        PickModuleProps<
          StateView<
            TModuleInstanceFor<TModuleConfig>>
  >>>>;

export type MergeViews<
  TView1 extends StateView<any, any>,
  TView2 extends StateView<any, any>
> = StateView<GetModule<TView2>, GetProps<TView1> & GetProps<TView2>>

export class ComponentView<TModuleView extends StateView<any, any>> {

  public stateSelector: StateSelector<GetProps<TModuleView>>;

  constructor(public moduleView: TModuleView, public id: string, public forceUpdate: Function) {
    this.stateSelector = moduleView.stateSelector.clone();
  }

}

// const editor = new EditorService();
// const ev = createModuleView(editor).extend(pickState).extend(pickControllers)
// ev.reactiveObject.proxy.scenesCollection
// ev.props.scenesCollection;
// ev.props.setActiveSceneId(1);
// ev.props.getScene(1);
// ev.props.getSceneController(1);
// ev.props.state;

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
  childSelector: StateSelector<any> | null;
  getValue(): TValue,
  getHash(): unknown; // used for fast comparison of complex object, use getValue() as default value
  enumerable: boolean,
  configurable: boolean,
  // module: unknown, // one module view can be assembled from multiple modules
}

export type TConstructDescriptorProps<TValue, TDescriptor = TModulePropDescriptor<TValue>> = Partial<TDescriptor> & Required<Pick<TModulePropDescriptor<TValue>, 'type' | 'name' | 'getValue'>>
export type TGetDescriptorsForProps<TProps extends Dict<any>> = {[P in keyof TProps]: TModulePropDescriptor<TProps[P]>}
export type GetModule<TModuleView> = TModuleView extends StateView<infer TModule, any> ? TModule : never;
export type GetProps<TModuleView> = TModuleView extends StateView<any, infer TProps> ? TProps : never;
