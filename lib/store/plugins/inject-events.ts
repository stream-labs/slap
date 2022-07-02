import {
  createNanoEvents, Unsubscribe, EventsMap, DefaultEvents, Emitter,
} from 'nanoevents';
import { InjectableModule } from '../../scope';

import { injectChild } from './inject-child';

/**
 */
export function injectEvents<Events extends EventsMap = DefaultEvents>(emitter?: Emitter<Events>) {
  return injectChild(EventsModule as any as EventsModule<Events>, emitter);
}

export class EventsModule<Events extends EventsMap = DefaultEvents> implements InjectableModule {

  private subscriptions: Unsubscribe[] = [];

  constructor(private emitter: Emitter<Events>) {
    if (!emitter) this.emitter = createNanoEvents<Events>();
  }

  on<K extends keyof Events>(event: K, cb: Events[K]): Unsubscribe {
    const unsub = this.emitter.on(event, cb);
    this.subscriptions.push(unsub);
    return unsub;
  }

  emit<K extends keyof Events>(
    event: K,
    ...args: Parameters<Events[K]>
  ) {
    return this.emitter.emit(event, ...args);
  }

  destroy() {
    // unsubscribe events
    this.subscriptions.forEach(unsub => unsub());
  }
}
