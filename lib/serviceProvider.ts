// maps a dictionary of classes to a dictionary of types
import { getModuleManager, getService } from './store';

type TInstances<T extends { [key: string]: new (...args: any) => any }> = {
  [P in keyof T]: InstanceType<T[P]>;
};

export function registerServices<T extends { [key: string]: new (...args: any) => any }>
(serviceClasses: T): TInstances<T> {
  const moduleManager = getModuleManager();

  Object.keys(serviceClasses).forEach(serviceName => {
    const serviceClass = serviceClasses[serviceName];
    moduleManager.registerModule(serviceClass as any, null, '', true);
  });

  return new Proxy(
    {} as TInstances<T>,
    {
      get(target, propName, receiver) {
        return moduleManager.getModule(propName as string);
      },
    },
  );
}

export function injectServices<T extends { [key: string]: new (...args: any) => any }>
(serviceClasses: T): TInstances<T> {
  return new Proxy(
    {} as TInstances<T>,
    {
      get(target, propName, receiver) {
        return getService(serviceClasses[propName as string]);
      },
    },
  );
}
