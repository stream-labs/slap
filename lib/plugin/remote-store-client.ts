class RemoteStoreClient {

  applyIpcProxy(service: Service, isAction = false, shouldReturn = false): Service {
    const availableServices = Object.keys(this.servicesManager.services);
    if (!availableServices.includes(service.constructor.name)) return service;

    return new Proxy(service, {
      get: (target, property, receiver) => {

        if (!target[property]) return target[property];

        if (typeof target[property] !== 'function' && !(target[property] instanceof Observable)) {
          return target[property];
        }

        if (
          typeof target[property] === 'function' &&
          target[property]['__executeInCurrentWindow']
        ) {
          return target[property];
        }

        const methodName = property.toString();
        const isHelper = target['_isHelper'];

        // TODO: Remove once you're sure this is impossible
        if (isHelper) {
          throw new Error('ATTEMPTED TO PROXY HELPER METHOD');
        }

        const handler = this.getRequestHandler(target, methodName, {
          isAction,
          shouldReturn,
        });

        if (typeof target[property] === 'function') return handler;
        if (target[property] instanceof Observable) return handler();
      },
    });
  }

}
