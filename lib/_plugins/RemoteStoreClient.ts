// import {
//
// } from '../scope/scope';
// import { TModuleClass, TModuleConstructorMap } from '../scope/interfaces';
// import {
//   createRequest,
//   IJsonRpcRequest,
//   IJsonRpcResponse, parseRPCResponse,
// } from './jsonrpc';
// import {
//   getModuleMutations, Mutation, StoreBack, TPromisifyFunctions,
// } from '../store-back';
// import { assertIsDefined, Subject } from '../scope';
// import { ApiClient } from './api-client';
// import { merge, TMerge3, unwrapState } from '../merge';
// import { lockThis } from '../lockThis';
// import { traverseClassInstance } from '../traverseClassInstance';
// import { RemoteStore } from './RemoteStore';
//
// export interface ISender {
//   write(msg: string): Promise<any>;
// }
//
// export interface IRemoteClientParams {
//   connect(onMessage: (msg: string) => void): Promise<ISender>;
// }
//
// export class RemoteStoreClient {
//   scope = injectScope();
//   store!: StoreBack;
//   // remoteScope!: Scope;
//
//   /**
//    * If the result of calling a service method in the main window is promise -
//    * we create a linked promise in the child window and keep its callbacks here until
//    * the promise in the main window will be resolved or rejected
//    */
//   private promises: Record<string, Function[]> = {};
//
//   private requests: Record<string, Function[]> = {};
//
//   /**
//    * almost the same as `promises` but for keeping subscriptions
//    */
//   private subscriptions: Record<string, Subject<any>> = {};
//
//   public api!: ApiClient;
//
//   private token = '';
//
//   constructor(public params: IRemoteClientParams, public remoteServices: TModuleConstructorMap) {}
//
//   async init() {
//     console.log('register remote services');
//     const store = this.scope.resolve(StoreBack);
//     this.scope.registerMany(this.remoteServices, { initMethod: '' });
//     this.scope.init(RemoteStore, this.remoteServices);
//
//     // this.scope.events.on('onModuleInit', provider => {
//     //   const service = provider.instance;
//     //   if ('createView' in service) return;
//     //   service.createView = () => {
//     //     const Getters = Object.getPrototypeOf(service).constructor;
//     //     createRemoteView(service.prototype);
//     //   }
//     //   store.registerModuleFromInstance(provider.instance, provider.name);
//     // });
//
//     this.api = new ApiClient(this.params);
//     await this.api.connect();
//     console.log('Api is connected');
//
//     console.log('request bulk state');
//     const bulkState = await this.api.request<Record<string, unknown>>('RemoteStore', 'getBulkState');
//     console.log('bulk state is', bulkState);
//     Object.keys(bulkState).forEach(moduleName => {
//       if (!this.remoteServices[moduleName]) delete bulkState[moduleName];
//     });
//     store.setBulkState(bulkState as any);
//
//     console.log('Subscribe mutations', bulkState);
//     this.api.subscribe('RemoteStore', 'onMutation', (mutation: Mutation) => {
//       const moduleName = mutation.module;
//       if (!this.remoteServices[moduleName]) return;
//       store.mutate(mutation);
//     });
//   }
//
//   // initRemoteService(serviceName: string) {
//   //   if (this.remoteServices[serviceName]) throw new Error(`Remote service not found ${serviceName}`);
//   //   this.scope.register(this.remoteServices[serviceName]);
//   //   this.scope.init(serviceName);
//   // }
//
//   applyIpcProxy(service: InstanceType<TModuleClass>): any {
//     if (service.name === RemoteStoreClient.name) return;
//     const availableServices = Object.keys(this.scope.registry);
//     if (!availableServices.includes(service.constructor.name)) return service;
//
//     return new Proxy(service, {
//       get: (target, property, receiver) => {
//         if (!target[property]) return target[property];
//
//         if (typeof target[property] !== 'function' && !(target[property] instanceof Subject)) {
//           return target[property];
//         }
//
//         if (service instanceof StoreBack) {
//           if (property !== 'getBulkState' && property !== 'onMutation') return target[property];
//         }
//
//         // if (
//         //   typeof target[property] === 'function'
//         //   && target[property].__executeInCurrentWindow
//         // ) {
//         //   return target[property];
//         // }
//
//         // const methodName = property.toString();
//         // const isHelper = target._isHelper;
//         //
//         // // TODO: Remove once you're sure this is impossible
//         // if (isHelper) {
//         //   throw new Error('ATTEMPTED TO PROXY HELPER METHOD');
//         // }
//
//         // const handler = this.getRequestHandler(target, methodName);
//
//         // if (typeof target[property] === 'function') return handler;
//         // if (target[property] instanceof Subject) return handler();
//       },
//     });
//   }
//
//   /**
//    * Handles a services response result and processes special cases
//    * such as promises, event subscriptions, helpers, and services.
//    * @param result The processed result
//    */
//   execServerResponse(res: IJsonRpcResponse<any>) {
//     const reqId = res.id;
//     const result = res.result;
//
//     if (reqId && this.requests[reqId]) {
//       const [resolve, reject] = this.requests[reqId];
//       delete this.requests[reqId];
//       resolve(result);
//     }
//
//     if (!result) return;
//
//     if (result && result._type === 'SUBSCRIPTION') {
//       if (result.emitter === 'PROMISE') {
//         return new Promise((resolve, reject) => {
//           const promiseId = result.resourceId;
//           this.promises[promiseId] = [resolve, reject];
//         });
//       }
//
//       if (result.emitter === 'STREAM') {
//         return (this.subscriptions[result.resourceId] = this.subscriptions[result.resourceId] || new Subject());
//         // this.subscriptions[result.resourceId].next(result.data);
//       }
//     }
//
//     if (result && (result._type === 'HELPER' || result._type === 'SERVICE')) {
//       const helper = this.getResource(result.resourceId);
//       return helper;
//     }
//
//     // handle promise reject/resolve
//     if (result.emitter === 'PROMISE') {
//       const promises = this.promises;
//       const promisePayload = res.result;
//       if (promisePayload) {
//         // skip the promise result if this promise has been created from another window
//         if (!promises[promisePayload.resourceId]) return;
//
//         // resolve or reject the promise depending on the response from the main window
//         const [resolve, reject] = promises[promisePayload.resourceId];
//         const callback = promisePayload.isRejected ? reject : resolve;
//         callback(promisePayload.data);
//         delete promises[promisePayload.resourceId];
//       }
//     } else if (result.emitter === 'STREAM') {
//       // handle RXJS events
//       const resourceId = res.result.resourceId;
//       if (!this.subscriptions[resourceId]) return;
//       this.subscriptions[resourceId].next(res.result.data);
//     }
//
//     // payload can contain helpers-objects
//     // we have to wrap them in IpcProxy too
//     // traverse(result).forEach((item: any) => {
//     //   if (item && item._type === 'HELPER') {
//     //     return this.getResource(item.resourceId);
//     //   }
//     // });
//
//     return result;
//   }
//
//   getResource(serviceName: string) {
//     return this.scope.resolve(serviceName);
//   }
// }
//
// export type AConstructorTypeOf<T> = new (...args:any[]) => T;
