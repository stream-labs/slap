/// <reference types="react" />
import { fetchBannedUsers, fetchOnlineUsers, TAccount, TUser } from './UsersPage';
export declare function fetchAccountsWithBalanceSync(balance?: number): Promise<TAccount[]>;
export declare function fetchAccountsWithBalance(balance?: number): Promise<TAccount[]>;
export declare class QueriesModule {
    state: import("../../../../lib").InjectedProp<import("../../../../lib").TStateControllerFor<{
        balance: number;
    }, {
        balance: number;
    }, {
        balance: number;
    }>, import("../../../../lib").StateView<import("../../../../lib").TStateViewForStateConfig<{
        balance: number;
    }>>, import("../../../../lib").StateView<import("../../../../lib").TStateViewForStateConfig<{
        balance: number;
    }>>>;
    onlineUsersQuery: import("../../../../lib").InjectedProp<import("../../../../lib").QueryModule<[{
        fetch: typeof fetchOnlineUsers;
        initialData: {
            name: string;
            id: number;
        }[];
    }], {
        name: string;
        id: number;
    }[], never, unknown>, import("../../../../lib").GetModuleStateView<import("../../../../lib").QueryModule<[{
        fetch: typeof fetchOnlineUsers;
        initialData: {
            name: string;
            id: number;
        }[];
    }], {
        name: string;
        id: number;
    }[], never, unknown>>, {}>;
    bannedUsersQuery: import("../../../../lib").InjectedProp<import("../../../../lib").QueryModule<[{
        fetch: typeof fetchBannedUsers;
    }], TUser[], never, unknown>, import("../../../../lib").GetModuleStateView<import("../../../../lib").QueryModule<[{
        fetch: typeof fetchBannedUsers;
    }], TUser[], never, unknown>>, {}>;
    accountsSyncQuery: import("../../../../lib").InjectedProp<import("../../../../lib").QueryModule<[never[], () => Promise<TAccount[]>, () => number], TAccount[], never, unknown>, import("../../../../lib").GetModuleStateView<import("../../../../lib").QueryModule<[never[], () => Promise<TAccount[]>, () => number], TAccount[], never, unknown>>, {}>;
    accountsQuery: import("../../../../lib").InjectedProp<import("../../../../lib").QueryModule<[{
        fetch: () => Promise<TAccount[]>;
        getParams: () => number;
    }], TAccount[], number, unknown>, import("../../../../lib").GetModuleStateView<import("../../../../lib").QueryModule<[{
        fetch: () => Promise<TAccount[]>;
        getParams: () => number;
    }], TAccount[], number, unknown>>, {}>;
    allAccountsQuery: import("../../../../lib").InjectedProp<import("../../../../lib").QueryModule<[typeof fetchAccountsWithBalance], TAccount[], never, unknown>, import("../../../../lib").GetModuleStateView<import("../../../../lib").QueryModule<[typeof fetchAccountsWithBalance], TAccount[], never, unknown>>, {}>;
}
export declare function QueriesPage(): JSX.Element;
