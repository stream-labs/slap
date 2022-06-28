import { Dict, Provider, Scope, Store, TAppContext } from '../lib';
export declare class InspectorService {
    scope: Scope;
    state: import("../lib").InjectedProp<import("../lib").GetStateControllerFor<{
        providers: Dict<ProviderModel>;
        selectedMenuKey: string;
        selectedMenuCategory: string;
        expandedMenuKeys: string[];
        selectedItemId: string;
        storeModules: StoreModuleModel[];
        readonly persistentSettings: PersistentSettings;
        setSelectedMenuKey(key: string): void;
    }, {
        providers: Dict<ProviderModel>;
        selectedMenuKey: string;
        selectedMenuCategory: string;
        expandedMenuKeys: string[];
        selectedItemId: string;
        storeModules: StoreModuleModel[];
        readonly persistentSettings: PersistentSettings;
        setSelectedMenuKey(key: string): void;
    }, import("../lib").WritablePart<{
        providers: Dict<ProviderModel>;
        selectedMenuKey: string;
        selectedMenuCategory: string;
        expandedMenuKeys: string[];
        selectedItemId: string;
        storeModules: StoreModuleModel[];
        readonly persistentSettings: PersistentSettings;
        setSelectedMenuKey(key: string): void;
    }>>, import("../lib").GetStateViewFor<{
        providers: Dict<ProviderModel>;
        selectedMenuKey: string;
        selectedMenuCategory: string;
        expandedMenuKeys: string[];
        selectedItemId: string;
        storeModules: StoreModuleModel[];
        readonly persistentSettings: PersistentSettings;
        setSelectedMenuKey(key: string): void;
    }>, import("../lib").GetStateViewFor<{
        providers: Dict<ProviderModel>;
        selectedMenuKey: string;
        selectedMenuCategory: string;
        expandedMenuKeys: string[];
        selectedItemId: string;
        storeModules: StoreModuleModel[];
        readonly persistentSettings: PersistentSettings;
        setSelectedMenuKey(key: string): void;
    }>>;
    get selectedProvider(): ProviderModel | undefined;
    get selectedStateModule(): StoreModuleModel | undefined;
    inspectedApp: {
        app: TAppContext;
        store: Store;
        rootScope: Scope;
    };
    constructor(app: TAppContext);
    init(): void;
    private registerProvider;
    private removeProvider;
    inspectProvider(id: string): void;
}
export declare function getProviderModel(provider: Provider<unknown>): ProviderModel;
export declare type ProviderModel = {
    id: string;
    name: string;
    shortName: string;
    isService: boolean;
    isInited: boolean;
    isChild: boolean;
    hasState: boolean;
    moduleType: 'regular' | 'state';
    childProviders: ProviderModel[];
    getOriginalProvider(): Provider<unknown>;
};
export declare type TempAny = any;
declare type PersistentSettings = {
    selectedMenuCategory?: string;
    selectedMenuKey?: string;
    expandedMenuKeys?: string[];
};
export declare type StoreModuleModel = {
    id: string;
    rev: number;
};
export {};
