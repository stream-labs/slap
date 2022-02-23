import { inject, injectScope } from '../scope/scope';
import {
  createRequest,
  IJsonRpcRequest,
  IJsonRpcResponse, parseRPCResponse,
} from './jsonrpc';
import { Store } from '../store';
import { Subject } from '../scope';

export interface ISender {
  write(msg: string): Promise<any>;
}

export interface IRemoteClientParams {
  connect(onMessage: (msg: string) => void): Promise<ISender>;
}

export class ApiClient {

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

  async connect() {
    this.sender = await this.params.connect(this.onMessage.bind(this));
    await this.authorize();
  }

  async authorize() {
    const resp = await this.request('auth', 'auth', '');
    this.token = resp as string;
  }

  send(jrpc: IJsonRpcRequest) {
    const msg = JSON.stringify(jrpc);
    console.log('send message:', msg);
    this.sender.write(msg);
  }

  async request<T = unknown>(path: string | any[], method: string, ...args: any[]): Promise<T> {
    const jrpc = createRequest(path, method, this.token, ...args);
    const promise = new Promise((resolve, reject) => {
      this.requests[jrpc.id] = [resolve, reject];
    });
    await this.send(jrpc);
    return promise as any as T;
  }

  onMessage(msg: string) {
    console.log('new message from server', msg);
    let jrpc = null;
    try {
      jrpc = parseRPCResponse(msg);
    } catch (e) {}
    if (jrpc) this.execServerResponse(jrpc);
  }

  subscribe(resourceId: string, eventName: string, cb: Function) {
    this.send(createRequest(
      resourceId,
      eventName,
      this.token,
    ));

    const observableResourceId = `${resourceId}.${eventName}`;
    this.subscriptions[observableResourceId] = this.subscriptions[observableResourceId] || new Subject();
    // @ts-ignore
    return this.subscriptions[observableResourceId].subscribe(cb);
  }


  /**
   * Handles a services response result and processes special cases
   * such as promises, event subscriptions, helpers, and services.
   * @param result The processed result
   */
  execServerResponse(res: IJsonRpcResponse<any>) {
    const reqId = res.id;
    const result = res.result;

    if (reqId && this.requests[reqId]) {
      const [resolve, reject] = this.requests[reqId];
      delete this.requests[reqId];
      resolve(result);
    }

    if (!result) return;

    if (result && result._type === 'SUBSCRIPTION') {
      if (result.emitter === 'PROMISE') {
        return new Promise((resolve, reject) => {
          const promiseId = result.resourceId;
          this.promises[promiseId] = [resolve, reject];
        });
      }

      if (result.emitter === 'STREAM') {
        return (this.subscriptions[result.resourceId] = this.subscriptions[result.resourceId] || new Subject());
        // this.subscriptions[result.resourceId].next(result.data);
      }
    }

    // handle promise reject/resolve
    if (result.emitter === 'PROMISE') {
      const promises = this.promises;
      const promisePayload = res.result;
      if (promisePayload) {
        // skip the promise result if this promise has been created from another window
        if (!promises[promisePayload.resourceId]) return;

        // resolve or reject the promise depending on the response from the main window
        const [resolve, reject] = promises[promisePayload.resourceId];
        const callback = promisePayload.isRejected ? reject : resolve;
        callback(promisePayload.data);
        delete promises[promisePayload.resourceId];
      }
    } else if (result.emitter === 'STREAM') {
      // handle RXJS events
      const resourceId = res.result.resourceId;
      if (!this.subscriptions[resourceId]) return;
      this.subscriptions[resourceId].next(res.result.data);
    }

    return result;
  }
}
