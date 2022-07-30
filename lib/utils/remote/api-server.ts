import {
  defined,
  Dict, Scope,
} from '../../scope';
import { IntrospectionApi } from './introspection-api';

export class ApiServer {
  connections: Dict<Connection> = {};
  subscriptions: Dict<Dict<Subscription>> = {};
  scope: Scope | null = null;
  services: Dict<any> | null = null;
  nextId = 0;

  constructor(public settings: APIServerSettings) {}

  listen() {
    const { listener, scope, services } = this.settings;
    this.scope = scope.registerScope({ IntrospectionApi });
    this.services = services || null;
    listener.listen(connection => {
      this.connections[connection.id] = connection;
      connection.onclose(() => this.closeConnection(connection.id));
      connection.onmessage(msg => this.onMessage(connection.id, msg));
    });
  }

  stopListening() {
    this.settings.listener.stopListening();
    this.connections = {};
  }

  closeConnection(id: string) {
    delete this.connections[id];
  }

  private onMessage(connectionId: string, msgStr: string) {
    console.log('raw message', msgStr);
    const req = new Request(this, connectionId, msgStr);
    if (req.error) {
      return req.sendError(req.error);
    }

    const { method, args } = req.msg;
    const [serviceName, methodName] = method.split('.');

    if (serviceName === 'global') {
      if (methodName !== 'unsubscribe') {
        return req.sendError({ code: 'method not found', message: `not found: ${method}` });
      }
      const subscriptionId = defined(args)[0];
      this.unsubscribe(connectionId, subscriptionId);
      return req.send({ type: 'unsubscribe', data: { subscriptionId } });
    }

    const service: any = this.scope!.resolve(serviceName);
    if (!service) {
      return req.sendError({ code: 'service not found', message: `not found: ${serviceName}` });
    }

    if (methodName === 'subscribe') {
      const [emitterName, eventName] = defined(args);
      const subscription = this.createSubscription(connectionId, req.msg.id, service, emitterName, eventName);
      return req.send({ type: 'subscription', subscription });
    }

    if (!(methodName in service)) {
      return req.sendError({ code: 'method not found', message: `not found: ${method}` });
    }

    let result: any;

    try {
      result = service[methodName](...(args || []));
    } catch (e: unknown) {
      return req.sendError({ code: '500', message: (e as Error).message });
    }

    // if (result instanceof Observable || result.then) {
    //   const subscription = this.createSubscription(connectionId, req.msg.id, result);
    //   return req.send({ type: 'subscription', subscription });
    // }

    return req.sendData(result);
  }

  private createSubscription(
    connectionId: string,
    id: string,
    service: any,
    propName: string,
    eventName: string,
  ) {
    if (!this.subscriptions[connectionId]) this.subscriptions[connectionId] = {};

    const isEventSubscription = true;
    const subscriptions = this.subscriptions[connectionId];
    if (isEventSubscription) {
      const unsubscribe = service[propName].on(eventName, (data: unknown) => {
        const connection = this.connections[connectionId];
        const message = { type: 'event', event: { subscriptionId: id, data } };
        connection.send(JSON.stringify(message));
      });

      const name = `${service.name}.${propName}.${eventName}`;
      const type = 'observable' as const;

      const subscription: Subscription = {
        type, id, name, unsubscribe,
      };
      subscriptions[id] = subscription;
      return { type, id, name };
    }
    // TODO
    const type = 'promise' as const;
    return { type, id, name: 'promise' };
  }

  // private createSubscription(
  //   connectionId: string,
  //   id: string,
  //   target: Observable<unknown> | Promise<unknown>,
  // ) {
  //   if (!this.subscriptions[connectionId]) this.subscriptions[connectionId] = {};
  //
  //   const subscriptions = this.subscriptions[connectionId];
  //   if (target instanceof Observable) {
  //     const observable = target;
  //     const unsubscribe = observable.subscribe(data => {
  //       const connection = this.connections[connectionId];
  //       const message = { type: 'event', event: { subscriptionId: id, data } };
  //       connection.send(JSON.stringify(message));
  //     });
  //
  //     const name = observable.name;
  //     const type = 'observable' as const;
  //
  //     const subscription: Subscription = {
  //       type, id, name, unsubscribe,
  //     };
  //     subscriptions[id] = subscription;
  //     return { type, id, name };
  //   }
  //   const promise = target as Promise<unknown>;
  //   // TODO
  //   const type = 'promise' as const;
  //   return { type, id, name: 'promise' };
  // }

  private unsubscribe(connectionId: string, subscriptionId: string) {
    const subscriptions = this.subscriptions[connectionId];
    const subscription = subscriptions && subscriptions[subscriptionId];
    if (!subscription) return;

    subscription.unsubscribe();
    delete subscriptions[subscriptionId];
  }
}

class Request {
  error?: ErrorModel;
  msg: ClientMessage = { id: '', method: '', args: [] };

  constructor(public server: ApiServer, public connectionId: string, messageStr: string) {
    let msg: ClientMessage;
    try {
      msg = JSON.parse(messageStr);
    } catch (e: any) {
      this.error = { code: 'invalid json' };
      return;
    }
    if (!msg.id) {
      this.error = { code: 'id is required' };
      return;
    }
    this.msg = msg;
  }

  get connection() {
    return this.server.connections[this.connectionId];
  }

  send(msg: ServerMessage) {
    const data = { requestId: this.msg.id, ...msg };
    return this.connection.send(JSON.stringify(data));
  }

  sendError(error: ErrorModel) {
    return this.send({
      type: 'error',
      error,
    });
  }

  sendData(data: unknown) {
    return this.send({
      type: 'data',
      data,
    });
  }
}

export interface ServerListener {
  listen(cb: (connection: Connection) => void): void;
  stopListening(): void;
}

export interface Connection {
  id: string;
  clientId: string;
  send(data: unknown): Promise<unknown>;
  onmessage(cb: (msg: string) => unknown): unknown;
  onclose(cb: () => unknown): unknown;
  close(): void
}

export interface ServerMessage {
  type: 'data' | 'subscription' | 'unsubscribe' | 'error' | 'event';
  data?: unknown,
  subscription?: {id: string, name: string, type: 'promise' | 'observable'}
  event?: { subscriptionId: string, data: unknown };
  error?: { code: string, message?: string };
  requestId?: string;
}

export interface ClientMessage {
  id: string;
  method: string;
  args?: string[],
}

export interface APIServerSettings {
  listener: ServerListener;
  scope: Scope;
  services?: Dict<any>;
}

interface ErrorModel { code: string, message?: string}

interface Subscription {
  type: 'observable' | 'promise',
  id: string,
  name: string,
  unsubscribe: () => unknown,
}
