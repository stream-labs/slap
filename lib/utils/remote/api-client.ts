import { ClientMessage, Connection, ServerMessage } from './api-server';
import { Dict } from '../../scope';
import { ProviderModel, TempAny } from '../../../inspector/inspector-service';

const INTROSPECTION_API = 'IntrospectionApi';

export class ApiClient {
  constructor(public connection: Connection) {
  }

  private pendingRequests: Dict<{id: string, resolve: Function, reject: Function}> = {};
  private subscriptions: Dict<{ id: string, cb: Function }> = {};
  private nextId = 0;
  private providers: Dict<ProviderModel> = {};
  private serviceProviders: Dict<ProviderModel> = {};

  async connect() {
    this.connection.onmessage(msg => this.onMessage(msg));
    const serviceProviders = await this.request<Dict<ProviderModel>>(INTROSPECTION_API, 'getServiceProviders');
    this.serviceProviders = serviceProviders;
    console.log('SERVICES', serviceProviders);
  }

  send(msg: ClientMessage) {
    return this.connection.send(JSON.stringify(msg));
  }

  request<T = unknown>(serviceName: string, methodName: string, args: unknown[] = [], requestId?: string) {
    const id = requestId || String(++this.nextId);
    const message = { id, method: `${serviceName}.${methodName}`, args };
    return new Promise<T>((resolve, reject) => {
      this.pendingRequests[id] = { id, resolve, reject };
      this.send(message);
    });
  }

  private onMessage(msgStr: string) {
    const msg: ServerMessage = JSON.parse(msgStr);

    if (msg.type === 'event') {
      this.onEvent(msg);
      return;
    }

    const requestId = msg.requestId;
    if (!requestId) return;

    const request = this.pendingRequests[requestId!];
    if (!request) return;

    delete this.pendingRequests[requestId];

    if (msg.type === 'data') {
      if (msg.error) {
        request.reject(msg.error);
      } else {
        request.resolve(msg.data);
      }
    } else if (msg.type === 'subscription') {

      request.resolve(msg.data);
    }
  }

  private onEvent(msg: ServerMessage) {
    const { subscriptionId, data } = msg.event!;
    const subscription = this.subscriptions[subscriptionId];
    if (!subscription) {
      console.warn('Got unknown subscription', subscriptionId, data);
      return;
    }
    subscription.cb(data);
  }

  getService<TLocator, TService = TLocator extends new (...args: any) => infer R ? R : any>(locator: TLocator): RemoteService<TService> {
    const api = this;
    const serviceName = typeof locator === 'string' ? locator : (locator as any).name;
    // const providerModel = this.request('InspectorApi', 'getProviderModel');
    return new Proxy({} as any, {
      get(target: {}, p: string) {
        return (...args: unknown[]) => {
          return api.request(serviceName, p, args);
        };
      },
    });
  }

  subscribe(providerIdOrName: string, propName: string, eventName: string, cb: (data: TempAny) => unknown) {
    const requestId = `subscribe_${providerIdOrName}.${propName}.${eventName}_${String(++this.nextId)}`;
    const request = this.request(
      INTROSPECTION_API,
      'subscribe',
      [providerIdOrName, propName, eventName],
      requestId,
    );
    this.subscriptions[requestId] = { id: requestId, cb };
    return request;
  }
}

export type RemoteService<ServiceClass> = TPromisifyFunctions<ServiceClass>;

/**
 * Makes all functions return a Promise and sets other types to never
 */
export type TPromisifyFunctions<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? TPromisifyFunction<T[P]> : never;
};

/**
 * Wraps the return type in a promise if it doesn't already return a promise
 */
type TPromisifyFunction<T> = T extends (...args: infer P) => infer R
  ? T extends (...args: any) => Promise<any>
    ? (...args: P) => R
    : (...args: P) => Promise<R>
  : T;
