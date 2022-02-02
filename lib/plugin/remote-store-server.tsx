// import { generateId } from '../store';
//
// interface IRemoteStoreClient {
//   id: string;
//   send(msg: string): string;
//   onMessage(cb: (msg: string) => void): void
// }
//
// const connectPrefix = 'RemoteStoreConnect|';
// const requestPrefix = 'RemoteStoreRequest|';
// const responsePrefix = 'RemoteStoreResponse|';
//
// export class PostMessageServer {
//   clients: Record<string, IRemoteStoreClient> = {};
//
//   listen() {
//     window.addEventListener('message', (event) => {
//       const msg = event.data;
//
//       if (msg.startsWith(connectPrefix)) {
//         this.onConnect(event);
//         return;
//       }
//
//       if (msg.startsWith(requestPrefix)) {
//         this.onRequest(event);
//         return;
//       }
//
//     }, false);
//   }
//
//   onConnect(event: MessageEvent<any>) {
//     const clientId = generateId();
//     const client: IRemoteStoreClient = {
//       id: clientId,
//       send(msg) {
//         event.source.postMessage(msg);
//       }
//     }
//   }
//
//   onRequest(event: MessageEvent<any>) {
//
//   }
//
//   stop() {
//
//   }
// }
//
// export class RemoteStoreServerPlugin {
//   onStoreCreated() {
//
//   }
// }
