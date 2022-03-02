import { RemoteStoreServerParams } from './RemoteStoreServer';

export const PostMessageListener: RemoteStoreServerParams = {
  listen(onMessage) {
    window.addEventListener('message', (event) => {
      if (event.source === window) return;
      const msg = event.data;
      const sender = { send: (msg: string) => event.source!.postMessage(msg) };
      onMessage(msg, sender);
    }, false);
  },
};
