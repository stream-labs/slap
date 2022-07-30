import { Emitter } from 'nanoevents';
import { ClientMessage, Connection, ServerMessage } from './api-server';
import { Dict, InjectableModuleTyped } from '../../scope';
import { ProviderModel, TempAny } from '../../../inspector/inspector.service';
import { EventsModule } from '../../store/plugins/inject-events';

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

  request<T = unknown>(serviceName: string, methodName: string, args: string[] = [], requestId?: string) {
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

  getService<
    TLocator,
    TService = TLocator extends new (...args: any) => infer R ? R : any>
  (locator: TLocator): RemoteService<TService> {
    const api = this;
    const serviceName = typeof locator === 'string' ? locator : (locator as any).name;
    return new Proxy({} as any, {
      get(target: {}, propName: string) {
        return (...args: any[]) => {
          if (propName === 'subscribe') {
            const emitterName = args[0];
            return api.subscribe(serviceName, emitterName);
          }
          return api.request(serviceName, propName, args);
        };
      },
    });
  }

  subscribe(providerIdOrName: string, emitterName: string) {

    return {
      on: async (eventName: string, cb: (data: TempAny) => unknown) => {
        const requestId = `subscribe_${providerIdOrName}.${emitterName}.${eventName}_${String(++this.nextId)}`;
        const request = this.request(
          providerIdOrName,
          'subscribe',
          [emitterName, eventName],
          requestId,
        );
        this.subscriptions[requestId] = { id: requestId, cb };
        await request;
        return () => this.unsubscribe(requestId);
      },
    };
  }

  unsubscribe(subscriptionId: string) {
    delete this.subscriptions[subscriptionId];
    return this.request('global', 'unsubscribe', [subscriptionId]);
  }
}

export type RemoteService<ServiceClass> = TPromisifyFunctions<ServiceClass> & {
  subscribe
    <TPropName extends keyof GetEventEmitters<ServiceClass>>
  (propName:TPropName): ServiceClass[TPropName];
};

export type GetEventEmitterPropName<TService, TPropName extends keyof TService> = TService[TPropName] extends { __injector: InjectableModuleTyped<EventsModule<any>, any, any>} ? TPropName : TService[TPropName] extends Emitter<any> ? TPropName : never;

export type GetEventEmitters<TService> = {
  [K in keyof TService as GetEventEmitterPropName<TService, K>]: TService[K];
}

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
