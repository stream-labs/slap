// import produce from 'immer';
// import { IModuleMetadata } from './module-manager';
// import {
//   assertInjectIsAllowed, getCurrentScope, injectScope, Scope, TModuleClass,
//   generateId, Subject,
// } from './scope';
//
// export class StoreBack {
//   constructor() {}
//
//   state = {
//     modules: {} as Record<string, Record<string, any>>,
//   };
//
//   scope = injectScope();
//
//   isMutationRunning = false;
//
//   modulesRevisions: Record<string, number> = {};
//
//   immerState: any = null;
//
//   watchers = new StoreWatchers();
//
//   modulesMetadata: Record<string, Record<string, IModuleMetadata>> = {};
//
//   isReady = true;
//
//   onMutation = new Subject<Mutation>();
//   onReady = new Subject<boolean>();
//
//   init() {
//     const scope = this.scope;
//
//     console.log('Create Store with scope', this.scope.id);
//
//     Object.keys(this.scope.registry).forEach(moduleName => {
//       if (moduleName === 'Store') return;
//       this.createModuleMetadata(moduleName, this.scope.id);
//     });
//
//     scope.events.on('onModuleRegister', moduleInfo => {
//       this.createModuleMetadata(moduleInfo.name, moduleInfo.scope.id);
//     });
//
//     scope.events.on('onModuleInit', provider => {
//       if (provider.name === 'Store') return;
//       const instance = provider.instance as any;
//       const scopeId = provider.scope.id;
//       this.registerModuleFromInstance(instance, provider.name, scopeId);
//     });
//
//     scope.events.on('onModuleLoad', provider => {
//       if (provider.name === 'Store') return;
//       provider.instance.setIsLoaded();
//     });
//
//     // scope.register(StoreStatus);
//     // scope.init(StoreStatus, this.settings);
//   }
//
//   setIsReady(isReady: boolean) {
//     this.isReady = isReady;
//     this.onReady.next(isReady);
//   }
//
//   registerModuleFromClass(ModuleClass: any, moduleName?: string, scopeId?: string) {
//     this.scope.register(ModuleClass, moduleName);
//     this.scope.init(ModuleClass);
//   }
//
//   registerModuleFromInstance(module: any, moduleName: string, scopeId?: string) {
//     scopeId = scopeId || this.scope.id;
//     this.createModule(moduleName, null, getModuleMutations(module), module, scopeId, module);
//     // catchDestroyedModuleCalls(module);
//   }
//
//   createModule(
//     moduleName: string,
//     state: any,
//     mutations: Record<string, Function>,
//     getters: Record<string, Function>,
//     scopeId: string,
//     instance?: any,
//   ) {
//     const metadata = this.getModuleMetadata(moduleName, scopeId)!;
//     metadata.instance = instance;
//
//     if (instance) {
//       const stateDescriptor = Object.getOwnPropertyDescriptor(instance, 'state');
//       metadata.isStateful = !!(stateDescriptor && !stateDescriptor.get && !instance.state?._isStateProxy) || !instance.state;
//       if (metadata.isStateful) state = { ...instance.state, isLoaded: false };
//     } else {
//       metadata.isStateful = !!state;
//       instance = {};
//     }
//
//     if (metadata.isStateful) this.injectReactiveState(instance, moduleName, scopeId);
//     this.injectMutations(instance, moduleName, scopeId, mutations);
//
//     this.injectMutations(
//       instance,
//       moduleName,
//       scopeId,
//       { setsLoaded () { (this.state as any).isLoaded = true; } },
//     );
//
//     if (!this.state.modules[moduleName]) this.state.modules[moduleName] = {};
//     this.state.modules[moduleName][scopeId] = state;
//     this.modulesRevisions[moduleName + scopeId] = 1;
//     return instance;
//   }
//
//   injectReactiveState(module: any, moduleName: string, scopeId: string) {
//     const store = this;
//     Object.defineProperty(module, 'state', {
//       get: () => {
//         // prevent accessing state on destroyed module
//         if (!store.state.modules[moduleName][scopeId]) {
//           throw new Error('Module_is_destroyed');
//         }
//         if (store.isRecordingAccessors) {
//           const revision = store.modulesRevisions[moduleName + scopeId];
//           this.recordedAccessors[moduleName + scopeId] = revision;
//         }
//         return store.isMutationRunning ? this.immerState : store.state.modules[moduleName][scopeId];
//       },
//       set: (newState: unknown) => {
//         if (!store.isMutationRunning) throw new Error('Can not change the state outside of mutation');
//       },
//     });
//   }
//
//   destroyModule(moduleName: string, contextId: string) {
//     delete this.state.modules[moduleName][contextId];
//     if (!Object.keys(this.state.modules[moduleName])) {
//       delete this.state.modules[moduleName];
//     }
//   }
//
//   setBulkState(bulkState: Record<string, any>) {
//     const scopeId = this.scope.id;
//     Object.keys(bulkState).forEach(moduleName => {
//       this.createModuleMetadata(moduleName, scopeId);
//       this.scope.resolve(moduleName);
//       this.state.modules[moduleName][scopeId] = bulkState[moduleName];
//     });
//     // this.scope.resolve(StoreStatus).setConnected(true);
//   }
//
//   mutateModule(moduleName: string, contextId: string, mutation: Function) {
//     mutation();
//   }
//
//   isRecordingAccessors = false;
//
//   recordedAccessors: Record<string, number> = {};
//
//   runAndSaveAccessors(cb: Function) {
//     this.isRecordingAccessors = true;
//     cb();
//     const result = this.recordedAccessors;
//     this.isRecordingAccessors = false;
//     this.recordedAccessors = {};
//     return result;
//   }
//
//   private createModuleMetadata(moduleName: string, scopeId: string): IModuleMetadata {
//     console.log('create module metadata for', moduleName, scopeId);
//
//     if (!this.modulesMetadata[moduleName]) {
//       this.modulesMetadata[moduleName] = {};
//     }
//     // eslint-disable-next-line no-multi-assign
//     const metadata = this.modulesMetadata[moduleName][scopeId] = {
//       scopeId,
//       moduleName,
//       isStateful: false,
//       instance: null,
//       createView: null,
//       view: null,
//       mutations: {},
//       originalMutations: {},
//     };
//     return metadata!;
//   }
//
//   updateModuleMetadata(moduleName: string, scopeId: string, patch: Partial<IModuleMetadata>) {
//     const metadata = this.modulesMetadata[moduleName][scopeId];
//     return Object.assign(metadata, patch);
//   }
//
//   getModuleMetadata(moduleName: string, scopeId: string): IModuleMetadata | null {
//     return this.modulesMetadata[moduleName] && this.modulesMetadata[moduleName][scopeId];
//   }
//
//   currentContext: Record<string, Scope> = {};
//
//   setModuleContext(moduleName: string, scope: Scope) {
//     this.currentContext[moduleName] = scope;
//   }
//
//   resetModuleContext(moduleName: string) {
//     delete this.currentContext[moduleName];
//   }
//
//   injectMutations(module: any, moduleName: string, scopeId: string, mutations: Record<string, Function>) {
//     // const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
//     const store = this;
//     const metadata = this.modulesMetadata[moduleName][scopeId];
//
//     Object.keys(mutations).forEach(mutationName => {
//       const originalMethod = mutations[mutationName];
//       metadata.originalMutations[mutationName] = originalMethod;
//
//       // override the original Module method to dispatch mutations
//       (module as any)[mutationName] = function (...args: any[]) {
//         // if this method was called from another mutation
//         // we don't need to dispatch a new mutation again
//         // just call the original method
//         if (store.isMutationRunning) return originalMethod.apply(module, args);
//         store.mutate({
//           id: Number(generateId()), payload: args, module: moduleName, name: mutationName,
//         }, scopeId);
//       };
//     });
//   }
//
//   mutate(mutation: Mutation, scopeId?: string) {
//     scopeId = scopeId || this.scope.id;
//     const moduleName = mutation.module;
//     const methodName = mutation.name;
//     const store = this;
//     const moduleState = store.state.modules[moduleName][scopeId];
//
//     // prevent accessing state on deleted module
//     if (!this.state.modules[moduleName][scopeId]) {
//       throw new Error('Module_is_destroyed');
//     }
//
//     const moduleMetadata = store.modulesMetadata[moduleName][scopeId];
//     const module = moduleMetadata.instance;
//
//     const nextState = produce(moduleState, (draftState: any) => {
//       store.isMutationRunning = true;
//       store.immerState = draftState;
//       console.log('RUN MUTATION', mutation.name, mutation.payload);
//       moduleMetadata.originalMutations[methodName].apply(module, mutation.payload);
//       store.modulesRevisions[moduleName + scopeId]++;
//     });
//     store.immerState = null;
//     store.state.modules[moduleName][scopeId] = nextState;
//     store.isMutationRunning = false;
//     store.onMutation.next(mutation);
//     store.watchers.run();
//   }
// }
//
// class StoreWatchers {
//   watchers = {} as Record<string, Function>;
//
//   watchersOrder = [] as string[];
//
//   create(cb: Function) {
//     const watcherId = generateId();
//     this.watchersOrder.push(watcherId);
//     this.watchers[watcherId] = cb;
//     return watcherId;
//   }
//
//   remove(watcherId: string) {
//     const ind = this.watchersOrder.findIndex(id => watcherId === id);
//     this.watchersOrder.splice(ind, 1);
//     delete this.watchers[watcherId];
//   }
//
//   run() {
//     const watchersIds = [...this.watchersOrder];
//     watchersIds.forEach(id => this.watchers[id] && this.watchers[id]());
//   }
// }
//
// /**
//  * A decorator that registers the object method as an mutation
//  */
// export function mutation() {
//   return function (target: any, methodName: string) {
//     target.mutations = target.mutations || [];
//     // mark the method as an mutation
//     target.mutations.push(methodName);
//   };
// }
//
// export function getModuleMutations(module: any): Record<string, Function> {
//   const mutationNames: string[] = Object.getPrototypeOf(module).mutations || [];
//   const mutations: Record<string, Function> = {};
//   mutationNames.forEach(mutationName => {
//     mutations[mutationName] = module[mutationName];
//   });
//   return mutations;
// }
//
// /**
//  * Add try/catch that silently stops all method calls for a destroyed module
//  */
// // function catchDestroyedModuleCalls(module: any) {
// //   // wrap each method in try/catch block
// //   traverseClassInstance(module, (propName, descriptor) => {
// //     // ignore getters
// //     if (descriptor.get || typeof module[propName] !== 'function') return;
// //
// //     const originalMethod = module[propName];
// //     module[propName] = (...args: unknown[]) => {
// //       try {
// //         return originalMethod.apply(module, args);
// //       } catch (e: unknown) {
// //         // silently stop execution if module is destroyed
// //         if ((e as any).message !== 'Module_is_destroyed') throw e;
// //       }
// //     };
// //   });
// // }
//
// /**
//  * Makes all functions return a Promise and sets other types to never
//  */
// export type TPromisifyFunctions<T> = {
//   [P in keyof T]: T[P] extends (...args: any[]) => any ? TPromisifyFunction<T[P]> : never;
// };
//
// /**
//  * Wraps the return type in a promise if it doesn't already return a promise
//  */
// export type TPromisifyFunction<T> = T extends (...args: infer P) => infer R
//   ? T extends (...args: any) => Promise<any>
//     ? (...args: P) => R
//     : (...args: P) => Promise<R>
//   : T;
//
// // export function injectState<TModuleClass extends new (...args: any) => any>(StatefulModule: TModuleClass): InstanceType<TModuleClass>['state'] {
// //   assertInjectIsAllowed();
// //   const module = getCurrentScope()!.resolve(StatefulModule);
// //   const proxy = { _isStateProxy: true };
// //   Object.keys(module.state).forEach(stateKey => {
// //     Object.defineProperty(proxy, stateKey, {
// //       configurable: true,
// //       enumerable: true,
// //       get() {
// //         return module.state[stateKey];
// //       },
// //     });
// //   });
// //   return proxy;
// // }
//
// export interface ICommonState {
//   isLoaded: boolean;
// }
//
// export interface Mutation {
//   id: number;
//   moduleName: string;
//   mutationName: string;
//   payload: any;
//   scopeId: string;
// }
//
// // export class StoreStatus {
// //   constructor(private settings?: TStoreSettings) {
// //     this.state.isRemote = !!settings?.isRemote;
// //   }
// //
// //   state = {
// //     isRemote: false,
// //     isConnected: false,
// //   };
// //
// //   get isReady() {
// //     return this.state.isRemote ? this.state.isConnected : true;
// //   }
// //
// //   @mutation()
// //   setConnected(isConnected: boolean) {
// //     this.state.isConnected = isConnected;
// //   }
// // }
