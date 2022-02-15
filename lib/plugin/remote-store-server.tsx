import { generateId } from '../store';
import {
  createError, E_JSON_RPC_ERROR, IJsonRpcRequest, IJsonRpcResponse, parseJSONRPC,
} from './jsonrpc';

interface IConnection {
  token: string;
  subscriptionsIds: [];
  send(msg: string): void;
  // onRequest(cb: (msg: string) => void): void
}

interface ISender {
  send(msg: string): void;
}

// const connectPrefix = 'RemoteStoreConnect|';
// const requestPrefix = 'RemoteStoreRequest|';
// const responsePrefix = 'RemoteStoreResponse|';

export class RemoteStoreServer {
  connections: Record<string, IConnection> = {};

  listen() {
    window.addEventListener('message', (event) => {
      const msg = event.data;
      const sender = { send: (msg: string) => event.source!.postMessage(msg) };
      this.onMessage(msg, sender);
    }, false);
  }

  onMessage(msg: string, sender: ISender) {
    let json: IJsonRpcRequest;
    try {
      json = parseJSONRPC(msg);
    } catch (e) {
      sendParseError(sender);
      return;
    }

    if (json.params.resource === 'auth') {
      this.onAuthorize(json, sender);
      return;
    }

    const token = json.params.token;
    if (!token || this.connections[token]) {
      sendUnauthorizedError(sender);
    }
  }

  onAuthorize(msg: IJsonRpcRequest, sender: ISender) {
    const token = generateId();
    const connection: IConnection = {
      token,
      send: sender.send,
      subscriptionsIds: [],
    };
    this.connections[token] = connection;
  }

  stop() {

  }
}

function sendParseError(sender: ISender) {
  sendSilent(sender, createError('-1', { code: E_JSON_RPC_ERROR.PARSE_ERROR, message: 'invalid jsonrps' }));
}

function sendUnauthorizedError(sender: ISender) {
  sendSilent(sender, createError('-1', { code: E_JSON_RPC_ERROR.INVALID_REQUEST, message: 'Unauthorized' }));
}

function sendSilent(sender: ISender, jrpc: IJsonRpcResponse<any>) {
  try {
    const msg = JSON.stringify(jrpc);
    sender.send(msg);
  } catch (e) {}
}
