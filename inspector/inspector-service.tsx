import React from 'react';
import { Button, message, Tag } from 'antd';
import {
  Dict, injectScope, injectState, Provider, Scope, Store, TAppContext,
} from '../lib';
import { sleep } from '../demo/stars-editor/utils/sleep';
import { InspectInConsoleModal } from './components/InspectInConsoleModal';
import {
  ProviderListItem,
  getAllChildProviders,
  getProviderModel, IntrospectionApi,
} from '../lib/utils/remote/introspection-api';
import { connectPostMessageClient } from '../lib/utils/remote/post-message-transport';
import { ApiClient } from '../lib/utils/remote/api-client';

export class InspectorService {

  scope = injectScope();

  state = injectState({
    providers: {} as Dict<ProviderModel>,
    selectedMenuKey: '',
    selectedMenuCategory: '',
    expandedMenuKeys: loadStateFromLocalStorage().expandedMenuKeys || [] as string[],
    selectedItemId: '',
    storeModules: [] as StoreModuleModel[],
    // ...loadStateFromLocalStorage(),

    get persistentSettings(): PersistentSettings {
      return {
        selectedMenuKey: this.selectedMenuKey,
        expandedMenuKeys: this.expandedMenuKeys,
      };
    },

    setSelectedMenuKey(key: string) {
      const category = key.split('__')[0];
      const id = key.replace(`${category}__`, '');
      this.selectedMenuCategory = category;
      this.selectedItemId = id;
      this.selectedMenuKey = key;
    },
  });

  get selectedProvider() {
    if (this.state.selectedMenuCategory !== 'provider') return;
    return this.state.providers[this.state.selectedItemId];
  }

  get selectedStateModule() {
    if (this.state.selectedMenuCategory !== 'store') return;
    return this.state.findStoreModules(this.state.selectedItemId);
  }

  async init() {
    const api = await getApiClient();
    const remoteApp = api.getService(IntrospectionApi);

    await api.subscribe('IntrospectionApi', 'scopeEvents', 'onModuleRegister', (provider: TempAny) => {
      this.registerProvider(provider);
    });

    await api.subscribe('IntrospectionApi', 'scopeEvents', 'onModuleInit', (provider: TempAny) => {
      const providerModel = this.state.providers[provider.id];
      if (!providerModel) return;

      this.state.mutate(state => {
        state.providers[provider.id].isInited = true;
      });
    });

    await api.subscribe('IntrospectionApi', 'scopeEvents', 'onModuleUnregister', (providerId: string) => {
      this.removeProvider(providerId);
    });

    const rootScope = await remoteApp.getApiRootScope();
    const servicesProviders = await remoteApp.getScopeProviders(rootScope.id);
    const modulesProviders = await remoteApp.getScopeProviders(rootScope.childScopes[0]);

    Object.values(servicesProviders).forEach(p => this.registerProvider(p));
    Object.values(modulesProviders).forEach(p => this.registerProvider(p));

    // await api.subscribe('InspectorApi', 'scopeEvents', 'onModuleInit', (provider: TempAny) => {
    //   this.registerProvider(provider);
    // });

    // const rootScope = this.inspectedApp.rootScope;
    // const modulesScope = Object.values(rootScope.childScopes)[0];
    // const servicesProviders = Object.values(rootScope.providers);
    // const modulesProviders = Object.values(modulesScope.providers);
    // const providers = [...servicesProviders, ...modulesProviders];
    // const hiddenModules = ['Store', 'ReactStoreAdapter'];
    // providers.filter(p => !hiddenModules.includes(p.name)).forEach(p => this.registerProvider(p));
    this.state.setSelectedMenuKey(loadStateFromLocalStorage().selectedMenuKey || '');

    // const inspectedStore = this.inspectedApp.store;
    //
    // const updateStoreData = () => {
    //   const storeData = Object.keys(inspectedStore.modulesMetadata).map(moduleName => {
    //     const { rev } = inspectedStore.modulesMetadata[moduleName];
    //     return { id: moduleName, rev };
    //   });
    //   this.state.setStoreModules(storeData);
    // };
    // updateStoreData();

    // this.state.store.events.on('onMutation', (mutation, moduleName) => {
    //   // if (moduleName.includes('InspectorModule')) return;
    //   // updateStoreData();
    // });

    // inspectedStore.events.on('onModuleCreated', async () => {
    //   await sleep(0);
    //   updateStoreData();
    // });
    //
    // inspectedStore.events.on('onModuleDestroyed', async () => {
    //   await sleep(0);
    //   updateStoreData();
    // });

    // TODO replace with onPersistentSettingsChange
    this.state.onSelectedMenuKeyChange(() => {
      saveStateToLocalStorage(this.state.persistentSettings);
    });

    // TODO replace with onPersistentSettingsChange
    this.state.onExpandedMenuKeysChange(() => {
      saveStateToLocalStorage(this.state.persistentSettings);
    });

    // rootScope.events.on('onModuleRegister', async provider => {
    //   await sleep(0);
    //   this.registerProvider(provider);
    // });
    // rootScope.events.on('onModuleUnregister', async providerId => {
    //   await sleep(0);
    //   // TODO
    //   this.removeProvider(providerId);
    // });
  }

  private registerProvider(provider: ProviderModel) {
    if (this.state.providers[provider.id]) return;

    // const providerModel = getProviderModel(provider);
    this.state.mutate(state => {
      console.log('register provider', provider.id);
      state.providers[provider.id] = provider;
      // const allChildren = getAllChildProviders(providerModel);
      // allChildren.forEach(child => {
      //   console.log('register provider', child.id);
      //   state.providers[child.id] = child;
      // });
    });
  }

  private removeProvider(providerId: string) {
    if (!this.state.providers[providerId]) return;

    const providerModel = this.state.providers[providerId];
    this.state.mutate(state => {
      console.log('unregister provider', providerId);
      delete state.providers[providerId];
      // const allChildren = getAllChildProviders(providerModel);
      // allChildren.forEach(child => {
      //   console.log('unregister provider', child.id);
      //   delete state.providers[child.id];
      // });
    });
  }

  inspectProvider(id: string) {
    const providerModel = this.state.providers[id];
    // const provider = providerModel.getOriginalProvider();
    // (window as any).$p0 = provider;
    // message.open(
    //   {
    //     duration: 5,
    //     content: <InspectInConsoleModal />,
    //   },
    // );
  }
}

const LOCAL_STORAGE_KEY = 'react_modules_inspector';

function loadStateFromLocalStorage(): PersistentSettings {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY);
  return (item && JSON.parse(item)) || {};
}

function saveStateToLocalStorage(state: PersistentSettings) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

export type ProviderModel = {
  id: string;
  name: string;
  type: string;
  shortName: string;
  isService: boolean;
  isInited: boolean;
  isChild: boolean;
  hasState: boolean;
  moduleType: 'regular' | 'state';
  injections: Dict<ProviderListItem>;
  childProviders: ProviderModel[];

  // getOriginalProvider(): Provider<unknown>;
}

export type TempAny = any;

type PersistentSettings = {
  selectedMenuCategory?: string,
  selectedMenuKey?: string,
  expandedMenuKeys?: string[]
}

export type StoreModuleModel = {
  id: string;
  // data: TempAny;
  rev: number;
  // subscriptions: [];
  // getters: Dict<TempAny>;
}

let apiClientPromise: Promise<ApiClient> | null = null;

export async function getApiClient() {
  if (!apiClientPromise) {
    apiClientPromise = connectApiClient();
  }
  return apiClientPromise;
}

async function connectApiClient() {
  const inspectedWin = window.opener;
  const connection = await connectPostMessageClient(inspectedWin);
  const api = new ApiClient(connection);
  await api.connect();
  return api;
}
