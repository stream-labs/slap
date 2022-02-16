import { v4 as uuid } from 'uuid';
import {
  createError, createEvent,
  createResponse,
  E_JSON_RPC_ERROR,
  IJsonRpcRequest,
  IJsonRpcResponse,
  parseRPCRequest,
} from './jsonrpc';
import {
  generateId, injectScope, Subject, Subscription,
} from '../scope';
import { traverseClassInstance } from '../traverseClassInstance';

export class RemoteStoreServer {
  scope = injectScope();

  connections: Record<string, IConnection> = {};

  constructor(public params: RemoteStoreServerParams) {
  }

  init() {
    this.params.listen(this.onMessage.bind(this));
  }

  onMessage(msg: string, sender: ISender) {
    const jrpc = this.validateRequest(msg, sender);
    if (!jrpc) return;
    const token = jrpc.params.token;
    const response = this.execJRPC(jrpc, token);
    this.send(sender, response);
  }

  execJRPC(req: IJsonRpcRequest, token: string): IJsonRpcResponse<any> {
    const method = req.method;
    const {
      resource,
      args,
    } = req.params;
    const service = this.scope.resolve(resource);
    const result = typeof service[method] === 'function' ? (service[method] as any)(...args as any) : service[method];
    const response = this.serializePayload(service, result, req, token);
    return response;
  }

  /**
   * Result of the API calls can be unserializable objects like Promises, RxJs Observables, Services
   * This method returns a safe-to-transfer serializable response
   */
  private serializePayload(
    resource: any,
    responsePayload: any,
    request: IJsonRpcRequest,
    token: string,
  ): IJsonRpcResponse<any> {
    // primitive types are serializable so send them as is
    if (!(responsePayload instanceof Object)) {
      return createResponse(request.id, responsePayload);
    }

    // if response is RxJs Observable then subscribe to it and return subscription
    if (responsePayload instanceof Subject) {
      // each subscription has unique id
      const subscriptionId = `${request.params.resource}.${request.method}`;

      const connection = this.connections[token];

      // create the subscription if it doesn't exist
      if (!connection.subscriptions[subscriptionId]) {
        const subject = resource[request.method];
        connection.subscriptions[subscriptionId] = subject.subscribe((data: any) => {
          this.send(connection, createEvent({ data, emitter: 'STREAM', resourceId: subscriptionId }));
        });
      }
      // return subscription
      // the API client can use subscriptionId to listen events from this subscription
      return createResponse(request.id, {
        _type: 'SUBSCRIPTION',
        resourceId: subscriptionId,
        emitter: 'STREAM',
      });
    }

    // if payload is Promise, then subscribe to this promise
    // and send events when promise will be resolved or rejected
    const isPromise = !!responsePayload.then;
    if (isPromise) {
      const promiseId = uuid(); // the API client app can use this id for waiting this Promise
      const promise = responsePayload as PromiseLike<any>;

      promise.then(
        data => this.sendPromiseMessage({
          data, promiseId, isRejected: false, token,
        }),
        data => {
          if (request.params.noReturn) {
            // If this was an async action call with no return, we
            // need to log the Promise rejection somewhere, otherwise
            // it will just silenty reject as nothing is listening in
            // the window that made the request.
            console.error(
              `Rejected promise from async action call to ${request.params.resource}.${request.method}:`,
              data,
            );
          } else {
            this.sendPromiseMessage({
              data, promiseId, isRejected: true, token,
            });
          }
        },
      );

      // notify the API client that the Promise is created
      return createResponse(request.id, {
        _type: 'SUBSCRIPTION',
        resourceId: promiseId,
        emitter: 'PROMISE',
      });
    }

    // // if responsePayload is a Service then serialize it
    // if (responsePayload instanceof Service) {
    //   return this.jsonrpc.createResponse(request.id, {
    //     _type: 'SERVICE',
    //     resourceId: responsePayload.serviceName,
    //     ...(!request.params.compactMode ? this.getResourceModel(responsePayload) : {}),
    //   });
    // }

    // // if responsePayload is a ServiceHelper then serialize it
    // if (responsePayload._isHelper === true) {
    //   return this.jsonrpc.createResponse(request.id, {
    //     _type: 'HELPER',
    //     resourceId: responsePayload._resourceId,
    //     ...(!request.params.compactMode ? this.getResourceModel(responsePayload) : {}),
    //   });
    // }

    // // payload may contain arrays or objects that may have ServiceHelper objects inside
    // // so we have to try to find these ServiceHelpers and serialize them too
    // traverse(responsePayload).forEach((item: any) => {
    //   if (item && item._isHelper === true) {
    //     const helper = this.getResource(item._resourceId);
    //     return {
    //       _type: 'HELPER',
    //       resourceId: helper._resourceId,
    //       ...(!request.params.compactMode ? this.getResourceModel(helper) : {}),
    //     };
    //   }
    // });
    return createResponse(request.id, responsePayload);
  }

  /**
   * The promise that the client has executed is resolved/rejected
   * Send this conformation back to the client
   */
  private sendPromiseMessage(info: { isRejected: boolean; promiseId: string; data: any, token: string }) {
    let serializedDataPromise: Promise<any>;

    if (info.data instanceof Response) {
      const contentType = info.data.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const serialized: any = { url: info.data.url, status: info.data.status };

      if (isJson) {
        serializedDataPromise = info.data
          .json()
          .then(j => {
            return { ...serialized, body: j };
          })
          .catch(e => {
            return { ...serialized, body: e };
          });
      } else {
        serializedDataPromise = info.data.text().then(b => {
          return { ...serialized, body: b };
        });
      }
    } else if (info.data instanceof Error) {
      serializedDataPromise = Promise.resolve({
        error: `${info.data.name}: ${info.data.message}`,
        stack: info.data.stack,
      });
    } else {
      serializedDataPromise = Promise.resolve(info.data);
    }

    serializedDataPromise.then(d => {
      const connection = this.connections[info.token];
      const event = createEvent({
        emitter: 'PROMISE',
        data: d,
        resourceId: info.promiseId,
        isRejected: info.isRejected,
      });
      this.send(connection, event);
    });
  }

  send(sender: ISender, jrpc: IJsonRpcResponse<any>) {
    const msg = JSON.stringify(jrpc);
    console.log('send to client:', msg);
    sender.send(msg);
  }

  onAuthorize(msg: IJsonRpcRequest, sender: ISender) {
    const token = generateId();
    const connection: IConnection = {
      token,
      send: sender.send,
      subscriptions: {},
    };
    this.connections[token] = connection;
    this.send(connection, createResponse(msg.id, token));
  }

  validateRequest(msg: string, sender: ISender): IJsonRpcRequest | null {
    let json: IJsonRpcRequest;
    try {
      json = parseRPCRequest(msg);
    } catch (e) {
      sendParseError(sender);
      return null;
    }

    if (json.params.resource === 'auth') {
      this.onAuthorize(json, sender);
      return null;
    }

    const token = json.params.token;
    if (!token || !this.connections[token]) {
      sendUnauthorizedError(sender);
    }

    const { resource } = json.params;
    if (!this.scope.isRegistered(resource)) {
      sendNoServiceError(sender, resource);
      return null;
    }
    return json;
  }

  stop() {

  }

  /**
   * the information about resource scheme that helps to improve performance for API clients
   * this is undocumented feature is mainly for our API client that we're using in tests
   *
   * @example
   * getResourceScheme('ScenesService')
   * // ^returns
   * {
   *   getScenes: 'function';
   *   activeSceneId: 'number';
   *   activeScene: Object;
   * }
   *
   */
  getResourceScheme(serviceName: string): Record<string, string> {
    if (!this.resourceSchemeCache[serviceName]) {
      const service = this.scope.resolve(serviceName);
      const resourceScheme: Record<string, string> = {};

      // collect resource keys from the whole prototype chain

      traverseClassInstance(service, (propName) => {
        resourceScheme[propName] = typeof service[propName];
      });

      this.resourceSchemeCache[serviceName] = resourceScheme;
    }
    return this.resourceSchemeCache[serviceName];
  }

  private resourceSchemeCache: Record<string, Record<string, string>> = {};
}

function sendParseError(sender: ISender) {
  sendSilent(sender, createError('-1', { code: E_JSON_RPC_ERROR.PARSE_ERROR, message: 'invalid jsonrps' }));
}

function sendUnauthorizedError(sender: ISender) {
  sendSilent(sender, createError('-1', { code: E_JSON_RPC_ERROR.INVALID_REQUEST, message: 'Unauthorized' }));
}

function sendNoServiceError(sender: ISender, serviceName: string) {
  sendSilent(sender, createError('-1', { code: E_JSON_RPC_ERROR.METHOD_NOT_FOUND, message: `Resource not found ${serviceName}` }));
}

function sendSilent(sender: ISender, jrpc: IJsonRpcResponse<any>) {
  try {
    const msg = JSON.stringify(jrpc);
    sender.send(msg);
  } catch (e) {}
}

interface IConnection {
  token: string;
  subscriptions: Record<string, Subscription>;
  send(msg: string): void;
  // onRequest(cb: (msg: string) => void): void
}

interface ISender {
  send(msg: string): void;
}

export interface RemoteStoreServerParams {
  listen(onMessage: RemoteStoreServer['onMessage']): void;
}
