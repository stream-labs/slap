import { Connection } from './api-server';
import { Dict } from '../../scope';

const clientMessagePrefix = 'modules-client-message';
const serverMessagePrefix = 'modules-server-message';
let nextId = 0;

export interface PostMessageConnection extends Connection {
  onMessageCb?: (msg: string) => unknown;
}

export function createPostMessageListener() {

  const connections: Dict<PostMessageConnection> = {};

  function listen(onConnectionCb: (connection: Connection) => unknown) {
    window.addEventListener('message', (event) => {
      console.log('server receive message', event.data);
      const msg = parseMessageEvent(event);
      if (!msg || msg.isServerMessage) return;

      const { command, data, id } = msg;

      if (command === 'connect') {
        const connectionId = String(++nextId);
        const connection: PostMessageConnection = {
          id: connectionId,
          clientId: id,
          send(msg: string) {
            postMessage(`${serverMessagePrefix}---${connectionId}---message---${msg}`);
            return Promise.resolve();
          },
          onmessage(cb: (msg: string) => unknown) {
            connection.onMessageCb = cb;
            return Promise.resolve();
          },
          onclose(cb: () => unknown) {
            // TODO
          },
          close() {
            // TODO
          },
        };
        connections[connectionId] = connection;
        onConnectionCb(connection);
        postMessage(`${serverMessagePrefix}---${connectionId}---connected---${id}`);
        return;
      }

      const connection = connections[id];
      if (!connection) return;

      if (command === 'message') {
        connection.onMessageCb && connection.onMessageCb(data);
        return;
      }

      if (command === 'close') {
        disconnectClient(connection.id);

      }

    }, false);

  }

  function disconnectClient(clientId: string) {
    delete connections[clientId];
  }

  function stopListening() {
    // TODO
  }

  return { listen, stopListening };

}

export function connectPostMessageClient(win: Window): Promise<Connection> {
  return new Promise(resolve => {
    const clientId = String(++nextId);

    const connection: PostMessageConnection = {
      id: '',
      clientId,
      send(msg: string) {
        const id = this.id;
        win.postMessage(`${clientMessagePrefix}---${id}---message---${msg}`);
        return Promise.resolve();
      },
      onmessage(onMessageCb: (msg: string) => unknown) {
        connection.onMessageCb = onMessageCb;
      },
      onclose(cb: () => unknown) {
        // TODO
      },
      close() {
        // TODO
      },
    };

    win.addEventListener('message', event => {
      console.log('receive', event.data);
      const msg = parseMessageEvent(event);
      if (!msg || !msg.isServerMessage) return;
      const { command, data, id } = msg;

      if (command === 'connected') {
        connection.id = data;
        resolve(connection);
        return;
      }

      if (id !== connection.id) return;

      if (command === 'message') {
        connection.onMessageCb && connection.onMessageCb(data);
      }
    });

    console.log('trying to connect');
    win.postMessage(`${clientMessagePrefix}---${clientId}---connect---`);
  });
}

function parseMessageEvent(event: MessageEvent) {
  const eventData = event.data as string;
  const match = typeof eventData === 'string' && eventData.match(/^(.*)---(.*)---(.*)---(.*)$/);
  if (!match) return;

  const [, prefix, id, command, data] = match;
  const isServerMessage = prefix === serverMessagePrefix;

  return {
    isServerMessage, id, command, data,
  };
}
