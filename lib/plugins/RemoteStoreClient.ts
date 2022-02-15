import { inject, injectScope } from '../scope/scope';
import { TModuleClass } from '../scope/interfaces';
import {
  createRequest,
  IJsonRpcRequest,
  IJsonRpcResponse, parseRPCResponse,
} from './jsonrpc';
import { Store } from '../store';
import { Subject } from '../scope';

export interface ISender {
  send(msg: string): Promise<any>;
}

export interface IRemoteClientParams {
  connect(onMessage: (msg: string) => void): Promise<ISender>;
}

export class RemoteStoreClient {
  scope = injectScope();

  deps = inject({ Store });

  /**
   * If the result of calling a service method in the main window is promise -
   * we create a linked promise in the child window and keep its callbacks here until
   * the promise in the main window will be resolved or rejected
   */
  private promises: Record<string, Function[]> = {};

  private requests: Record<string, Function[]> = {};

  /**
   * almost the same as `promises` but for keeping subscriptions
   */
  private subscriptions: Record<string, Subject<any>> = {};

  private sender!: ISender;

  private token = '';

  constructor(public params: IRemoteClientParams) {}

  async init() {
    Object.keys(this.scope.registry).forEach(providerName => {
      const provider = this.scope.registry[providerName];
      if (provider.instance) provider.instance = this.applyIpcProxy(provider.instance);
    });

    this.scope.events.on('onModuleInit', provider => {
      provider.instance = this.applyIpcProxy(provider.instance);
    });
    this.sender = await this.params.connect(this.onMessage.bind(this));
    await this.authorize();
    console.log('request bulk state');
    const store = this.deps.Store;
    const bulkState = await (store.getBulkState() as any);
    console.log('bulk state is', bulkState);
  }

  async authorize() {
    const req = createRequest('auth', 'auth', '');
    const resp = await this.send(req);
    this.token = resp as string;
  }

  send(jrpc: IJsonRpcRequest) {
    const id = jrpc.id;
    const msg = JSON.stringify(jrpc);
    console.log('send message:', msg);
    this.sender.send(msg);
    return new Promise((resolve, reject) => {
      this.requests[id] = [resolve, reject];
    });
  }

  onMessage(msg: string) {
    console.log('new message from server', msg);
    let jrpc = null;
    try {
      jrpc = parseRPCResponse(msg);
    } catch (e) {}
    if (jrpc) this.handleResponse(jrpc);
  }

  applyIpcProxy(service: InstanceType<TModuleClass>): any {
    if (service.name === RemoteStoreClient.name) return;
    const availableServices = Object.keys(this.scope.registry);
    if (!availableServices.includes(service.constructor.name)) return service;

    return new Proxy(service, {
      get: (target, property, receiver) => {
        if (!target[property]) return target[property];

        if (typeof target[property] !== 'function' && !(target[property] instanceof Subject)) {
          return target[property];
        }

        if (service instanceof Store) {
          if (property !== 'getBulkState') return target[property];
        }

        // if (
        //   typeof target[property] === 'function'
        //   && target[property].__executeInCurrentWindow
        // ) {
        //   return target[property];
        // }

        const methodName = property.toString();
        // const isHelper = target._isHelper;
        //
        // // TODO: Remove once you're sure this is impossible
        // if (isHelper) {
        //   throw new Error('ATTEMPTED TO PROXY HELPER METHOD');
        // }

        const handler = this.getRequestHandler(target, methodName);

        if (typeof target[property] === 'function') return handler;
        if (target[property] instanceof Subject) return handler();
      },
    });
  }

  getRequestHandler(
    target: any,
    methodName: string,
  ) {
    const serviceName = target.constructor.name;
    const resourceId = serviceName;
    // const isHelper = target['_isHelper'];
    // const resourceId = isHelper ? target['_resourceId'] : serviceName;
    const isObservable = target[methodName] instanceof Subject;
    const isDevMode = true;
    const shouldReturn = true;

    return (...args: any[]) => {
      // args may contain ServiceHelper objects
      // serialize them
      // traverse(args).forEach((item: any) => {
      //   if (item && item._isHelper) {
      //     return {
      //       _type: 'HELPER',
      //       resourceId: item._resourceId,
      //     };
      //   }
      // });

      if (!this.sender) throw new Error('Sender is not ready');

      if (isObservable) {
        // const request = createRequest(
        //   resourceId,
        //   methodName,
        //   this.token,
        //   ...args,
        // );

        const observableResourceId = `${resourceId}.${methodName}`;
        return (this.subscriptions[observableResourceId] = this.subscriptions[observableResourceId] || new Subject());
      }

      const request = createRequest(
        resourceId,
        methodName,
        this.token,
        ...args,
      );

      this.send(request);
    };
  }

  /**
   * Handles a services response result and processes special cases
   * such as promises, event subscriptions, helpers, and services.
   * @param result The processed result
   */
  handleResponse(jrpc: IJsonRpcResponse<any>) {
    const result = jrpc.result;
    if (result && result._type === 'SUBSCRIPTION') {
      if (result.emitter === 'PROMISE') {
        return new Promise((resolve, reject) => {
          const promiseId = result.resourceId;
          this.promises[promiseId] = [resolve, reject];
        });
      }

      if (result.emitter === 'STREAM') {
        return (this.subscriptions[result.resourceId] = this.subscriptions[result.resourceId] || new Subject());
      }
    }

    if (result && (result._type === 'HELPER' || result._type === 'SERVICE')) {
      const helper = this.getResource(result.resourceId);
      return helper;
    }

    const reqId = jrpc.id;

    if (reqId && this.requests[reqId]) {
      const [resolve, reject] = this.requests[reqId];
      delete this.requests[reqId];
      resolve(result);
    }

    // payload can contain helpers-objects
    // we have to wrap them in IpcProxy too
    // traverse(result).forEach((item: any) => {
    //   if (item && item._type === 'HELPER') {
    //     return this.getResource(item.resourceId);
    //   }
    // });

    return result;
  }

  getResource(serviceName: string) {
    return this.scope.resolve(serviceName);
  }
}
