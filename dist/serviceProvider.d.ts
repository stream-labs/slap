declare type TInstances<T extends {
    [key: string]: new (...args: any) => any;
}> = {
    [P in keyof T]: InstanceType<T[P]>;
};
export declare function registerServices<T extends {
    [key: string]: new (...args: any) => any;
}>(serviceClasses: T): TInstances<T>;
export declare function injectServices<T extends {
    [key: string]: new (...args: any) => any;
}>(serviceClasses: T): TInstances<T>;
export {};
