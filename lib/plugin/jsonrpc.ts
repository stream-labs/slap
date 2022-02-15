import { v4 as uuid } from 'uuid';

/**
 * @see http://www.jsonrpc.org/specification
 */
export enum E_JSON_RPC_ERROR {
  PARSE_ERROR = -32700,
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602,
  INTERNAL_JSON_RPC_ERROR = -32603,
  INTERNAL_SERVER_ERROR = -32000,
}

export interface IJsonRpcRequest {
  jsonrpc: '2.0';
  id: string;
  method: string;
  params: {
    token: string;
    resource: string;
    args?: any[];
    fetchMutations?: boolean;
    compactMode?: boolean;
    noReturn?: boolean;
    windowId?: string;
  };
}

export interface IJsonRpcResponse<TResponse> {
  jsonrpc: '2.0';
  id?: string | number;
  result?: TResponse;
  error?: {
    code: number;
    message?: string;
  };
  mutations?: IMutation[];
}

export declare type TResourceType = 'HELPER' | 'SUBSCRIPTION' | 'EVENT';

export interface IJsonRpcEvent {
  _type: 'EVENT';
  resourceId: string;
  emitter: 'PROMISE' | 'STREAM';
  data: any;
  isRejected?: boolean; // for PROMISE emitter only
}

export interface IMutation {
  id: number;
  type: string;
  payload: any;
}

export function createError(
  requestOrRequestId: string | IJsonRpcRequest,
  options: { code: E_JSON_RPC_ERROR; message?: string },
): IJsonRpcResponse<any> {
  /* eslint-disable */
  const id =
    arguments[0] && typeof arguments[0] === 'object'
      ? (arguments[0] as IJsonRpcRequest).id
      : arguments[0];

  /* eslint-enable */
  return {
    id,
    jsonrpc: '2.0',
    error: {
      code: options.code,
      // tslint:disable-next-line:prefer-template
      message: E_JSON_RPC_ERROR[options.code] + (options.message ? ' ' + options.message : ''),
    },
  };
}

export function createRequest(resourceId: string, method: string, ...args: any[]): IJsonRpcRequest {
  return {
    method,
    jsonrpc: '2.0',
    id: uuid(),
    params: {
      args,
      resource: resourceId,
    },
  };
}

function createResponse<TResult>(
  requestOrRequestId: string | IJsonRpcRequest,
  result: TResult = null,
): IJsonRpcResponse<TResult> {
  /* eslint-disable */
  const id =
    arguments[0] && typeof arguments[0] === 'object'
      ? (arguments[0] as IJsonRpcRequest).id
      : arguments[0];
  /* eslint-enable */
  return { id, result, jsonrpc: '2.0' } as IJsonRpcResponse<TResult>;
}

export function createEvent(options: {
  emitter: 'PROMISE' | 'STREAM';
  resourceId: string;
  data: any;
  isRejected?: boolean;
}): IJsonRpcResponse<IJsonRpcEvent> {
  return createResponse<IJsonRpcEvent>(null, {
    _type: 'EVENT',
    ...options,
  });
}

export function parseJSONRPC(msg: string) {
  const json = JSON.parse(msg);
  if (!json.id || !json.jsonrpc || !json.params.resource) throw new Error('Invalid JSONRPC');
  return json;
}
