import { getApiClient, ProviderModel, TempAny } from './inspector-service';
import { generateId, injectState } from '../lib';

export class LoggerService {

  state = injectState({
    logs: [] as LogRecord[],
  });

  async init() {
    const api = await getApiClient();
    await api.subscribe('IntrospectionApi', 'scopeEvents', 'onModuleRegister', (provider: TempAny) => {
      this.log('ModuleRegister', provider);
    });

    await api.subscribe('IntrospectionApi', 'scopeEvents', 'onModuleInit', (provider: TempAny) => {
      this.log('ModuleInit', provider);
    });

    await api.subscribe('IntrospectionApi', 'scopeEvents', 'onModuleUnregister', (providerId: string) => {
      this.log('ModuleUnregister', providerId);
    });

  }

  log(message: string, provider: ProviderModel | string) {
    this.state.pushLogs({
      id: generateId(), time: Date.now(), message, provider,
    });
  }
}

export type LogRecord = {
  id: string,
  time: number,
  provider: ProviderModel | string,
  message: string,
}
