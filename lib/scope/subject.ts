import { createNanoEvents } from 'nanoevents';

export class Subject<TData> {
  emitter = createNanoEvents();

  subscribe(cb: (args: TData) => void) {
    const unsubscribe = this.emitter.on('next', cb);
    return new Subscription(unsubscribe);
  }

  next(data: TData) {
    this.emitter.emit('next', data);
  }
}

export class Subscription {
  constructor(public unsubscribe: (...args: any) => void) {}
}
