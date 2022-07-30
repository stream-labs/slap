import React from 'react';
import { Button, message, Tag } from 'antd';
import {
  Dict, defined, injectScope, injectState, Provider, Scope, Store, TAppContext,
} from '../lib';
import { sleep } from '../demo/stars-editor/utils/sleep';
import { InspectInConsoleModal } from './components/InspectInConsoleModal';
import {
  ProviderListItem,
  getProviderModel, IntrospectionApi,
} from '../lib/utils/remote/introspection-api';
import { connectPostMessageClient } from '../lib/utils/remote/post-message-transport';
import { ApiClient, RemoteService } from '../lib/utils/remote/api-client';

export class InspectorService {

  scope = injectScope();

  state = injectState({
    isLoaded: false,
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

  private api?: ApiClient;

  async init() {
    this.api = await getApiClient();
    const remoteApp = this.remoteApp;

    await remoteApp.subscribe('scopeEvents').on('onModuleRegister', provider => {
      this.registerProvider(provider);
    });

    await remoteApp.subscribe('scopeEvents').on('onModuleInit', provider => {
      const providerModel = this.state.providers[provider.id];
      if (!providerModel) return;

      this.state.mutate(state => {
        const providerModel = state.providers[provider.id];
        providerModel.isInited = true;
        providerModel.childIds = provider.childIds;
      });
    });

    await remoteApp.subscribe('scopeEvents').on('onModuleUnregister', (providerId: string) => {
      this.removeProvider(providerId);
    });

    const providers = await remoteApp.getProviders();
    Object.values(providers).forEach(p => this.registerProvider(p));

    // const hiddenModules = ['Store', 'ReactStoreAdapter'];
    this.state.setSelectedMenuKey(loadStateFromLocalStorage().selectedMenuKey || '');

    // TODO replace with onPersistentSettingsChange
    this.state.onSelectedMenuKeyChange(() => {
      saveStateToLocalStorage(this.state.persistentSettings);
    });

    // TODO replace with onPersistentSettingsChange
    this.state.onExpandedMenuKeysChange(() => {
      saveStateToLocalStorage(this.state.persistentSettings);
    });

    this.state.setIsLoaded(true);
  }

  get remoteApp() {
    return defined(this.api).getService(IntrospectionApi);
  }

  get remoteStore() {
    return defined(this.api).getService('Store') as RemoteService<Store>;
  }

  private registerProvider(provider: ProviderModel) {
    if (this.state.providers[provider.id]) return;

    this.state.mutate(state => {
      state.providers[provider.id] = provider;
      const parentProvider = state.providers[provider.parentId];
      if (!parentProvider) return;

      if (!parentProvider.childIds.includes(provider.id)) {
        parentProvider.childIds.push(provider.id);
      }
    });
  }

  private removeProvider(providerId: string) {
    if (!this.state.providers[providerId]) return;

    this.state.mutate(state => {
      const provider = state.providers[providerId];
      const childIds = state.providers[providerId].childIds;
      delete state.providers[providerId];

      const parentProvider = state.providers[provider.parentId];

      if (parentProvider.childIds.includes(provider.id)) {
        parentProvider.childIds = parentProvider.childIds.filter(id => id !== provider.id);
      }

      childIds.forEach(childId => {
        this.removeProvider(childId);
      });
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
  parentId: string;
  name: string;
  type: string;
  shortName: string;
  isService: boolean;
  isInited: boolean;
  hasState: boolean;
  moduleType: 'regular' | 'state';
  injections: Dict<ProviderListItem>;
  childIds: string[];
  children: ProviderModel[];
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
