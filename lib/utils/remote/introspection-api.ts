import {
  Dict, getInstanceMetadata, injectProvider, injectScope, Provider, Scope,
} from '../../scope';
import { injectEvents } from '../../store/plugins/inject-events';
import { ProviderModel, TempAny } from '../../../inspector/inspector.service';
import { Store } from '../../store';

export class IntrospectionApi {

  private provider = injectProvider();
  private scope = injectScope();
  scopeEvents = injectEvents<ScopeModelEvents>();

  init() {
    const scope = this.scope.parent!;
    scope.events.on('onModuleRegister', provider => {
      this.scopeEvents.emit('onModuleRegister', getProviderModel(provider));
    });
    scope.events.on('onModuleInit', provider => {
      this.scopeEvents.emit('onModuleInit', getProviderModel(provider));
    });
    scope.events.on('onModuleUnregister', providerId => {
      this.scopeEvents.emit('onModuleUnregister', providerId);
    });
  }

  getServiceProviders() {
    const apiScope = this.scope.parent!;
    const providers: Dict<Provider<unknown>> = {
      ...apiScope.providers,
      IntrospectionApi: this.provider,
    };
    const result: Dict<ProviderModel> = {};
    Object.keys(providers).forEach(name => {
      result[name] = getProviderModel(providers[name]);
    });
    return result;
  }

  getApiRootScope() {
    return getScopeModel(this.scope.parent!);
  }

  getProviders() {
    const rootScope = this.scope.settings.rootScope;
    const providers = rootScope.allProviders;
    const result: Dict<ProviderModel> = {};
    Object.values(providers).forEach(p => result[p.id] = getProviderModel(p));
    return result;
  }

  // getScopeProviders(scopeId: string) {
  //   const rootScope = this.scope.settings.rootScope;
  //   const scope = scopeId === rootScope.id ? rootScope : rootScope.allChildScopes[scopeId];
  //   const providers = scope.providers;
  //   const result: Dict<ProviderModel> = {};
  //   Object.keys(providers).forEach(name => {
  //     result[name] = getProviderModel(providers[name], true);
  //   });
  //   return result;
  // }

  getProvider(providerId: string, shouldIncludeChildren = false) {
    const provider = this.scope.allProviders[providerId];
    if (!provider) return null;

    return getProviderModel(provider, shouldIncludeChildren);
  }

  private getStateController(stateModuleId: string) {
    return this.scope.resolve(Store).getController(stateModuleId);
  }

  getState(stateModuleId: string) {
    const controller = this.scope.resolve(Store).getController(stateModuleId);
    return controller && controller.state;
  }

  updateState(stateModuleId: string, patch: object) {
    const controller = this.getStateController(stateModuleId);
    if (!controller) return;
    // TODO add types for `update` method
    (controller as any).update(patch);
  }

  // subscribe(providerIdOrName: string, propName: string, eventName: string) {
  //   const provider = this.scope.resolveProvider(providerIdOrName);
  //   if (!provider) return;
  //   const instance = this.scope.resolve(providerIdOrName);
  //   return new Observable((instance as any)[propName], eventName);
  // }
}

export function getProviderModel(provider: Provider<unknown>, shouldIncludeChildren = false): ProviderModel {
  const moduleType = provider.name.includes('StatefulModule') ? 'state' : 'regular';
  const childProviders = Object.values(provider.childModules).map((m: TempAny) => {
    return getProviderModel(m.__provider, shouldIncludeChildren);
  });

  const hasState = moduleType === 'state'
    || !!childProviders.find(p => p.hasState);

  const injections: Dict<ProviderListItem> = {};

  Object.keys(provider.injectedModules).forEach(injectionName => {
    const injectedProvider = getInstanceMetadata(
      provider.injectedModules[injectionName].instance,
    ).provider;
    injections[injectionName] = {
      name: injectedProvider.name,
      id: injectedProvider.id,
      type: injectedProvider.type,
    };
  });

  return {
    id: provider.id,
    parentId: provider.options.parentProvider?.id || '',
    name: provider.name,
    type: provider.type,
    shortName: provider.name.split('__').slice(-1)[0],
    isService: provider.scope.isRoot,
    isInited: provider.isInited,
    childIds: childProviders.map(p => p.id),
    children: childProviders,
    hasState,
    moduleType,
    injections,
  };
}

function getScopeModel(scope: Scope) {
  return {
    id: scope.id,
    childScopes: Object.keys(scope.childScopes),
  };
}

export type ProviderListItem = { name: string, id: string, type: string }

interface ScopeModelEvents {
  onModuleRegister: (provider: ProviderModel) => void
  onModuleInit: (provider: ProviderModel) => void,
  onModuleUnregister: (providerId: string) => void,
}
