export declare class Subject<TData> {
    emitter: import("nanoevents").Emitter<import("nanoevents").DefaultEvents>;
    subscribe(cb: (args: TData) => void): Subscription;
    next(data: TData): void;
}
export declare class Subscription {
    unsubscribe: (...args: any) => void;
    constructor(unsubscribe: (...args: any) => void);
}
