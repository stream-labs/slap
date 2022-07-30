import { InspectorService, ProviderModel, TempAny } from './inspector.service';
import { generateId, inject, injectState, Mutation } from '../lib';

export class LoggerService {

  state = injectState({
    logs: [] as LogRecord[],
  });

  private inspector = inject(InspectorService);

  async init() {
    const { remoteApp, remoteStore } = this.inspector;

    await remoteApp.subscribe('scopeEvents').on('onModuleRegister', (provider: TempAny) => {
      this.log('ModuleRegister', provider);
    });

    await remoteApp.subscribe('scopeEvents').on('onModuleInit', (provider: TempAny) => {
      this.log('ModuleInit', provider);
    });

    await remoteApp.subscribe('scopeEvents').on('onModuleUnregister', (providerId) => {
      this.log('ModuleUnregister', providerId);
    });

    await remoteStore.subscribe('events').on('onModuleCreated', (moduleName) => {
      this.log('StateCreated', moduleName);
    });

    await remoteStore.subscribe('events').on('onMutation', (moduleName, mutation) => {
      this.log('StateMutation', `${moduleName}.${mutation?.mutationName}`);
    });

    await remoteStore.subscribe('events').on('onReadyToRender', () => {
      this.log('State is ready to re-render', '');
    });

    await remoteStore.subscribe('events').on('onModuleDestroyed', (moduleName) => {
      this.log('StateDestroyed', moduleName);
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
