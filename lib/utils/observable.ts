import { createNanoEvents } from 'nanoevents';

export class Observable<T> {

  constructor(
    public events: ReturnType<typeof createNanoEvents>,
    public name: string,
  ) {
  }

  subscribe(onEvent: (data: T) => unknown) {
    return this.events.on(this.name, onEvent);
  }
}


// export class Subscription {
//   unsubscribe(): void;
// }
//
// function subscribe() {
//
// }

//
// export class Events<TEvents extends EventsMap> {
//
//   on(eventName, cb)
//
// }
//
//
// interface EventsMap {
//   [event: string]: any
// }
//
// interface DefaultEvents extends EventsMap {
//   [event: string]: (...args: any) => void
// }
