/// <reference types="react" />
import { EditorService } from '../../services/editor.service';
export declare type TUser = {
    id: string;
    name: string;
};
export declare type TAccount = {
    id: string;
    name: string;
    balance: number;
};
export declare class UsersState {
    state: {
        users: TUser[];
    };
    getters: {
        readonly foo: string;
        getHelloWorld(tmpl: string): string;
    };
    addUser(id: string, name: string): void;
}
export declare function fetchOnlineUsers(): Promise<TUser[]>;
export declare function fetchBannedUsers(): Promise<TUser[]>;
export declare class UsersModule {
    editor: import("../../../../lib").InjectedProp<EditorService, unknown, null>;
    state: import("../../../../lib").InjectedProp<import("../../../../lib").TStateControllerFor<typeof UsersState, UsersState, {
        users: TUser[];
    }>, import("../../../../lib").StateView<import("../../../../lib").TStateViewForStateConfig<typeof UsersState>>, import("../../../../lib").StateView<import("../../../../lib").TStateViewForStateConfig<typeof UsersState>>>;
    loading: import("../../../../lib").InjectedProp<import("../../../../lib").TStateControllerFor<typeof import("../../../../lib").LoadingState, import("../../../../lib").LoadingState, {
        loadingStatus: import("../../../../lib").TLoadingStatus;
    }>, import("../../../../lib").StateView<import("../../../../lib").TStateViewForStateConfig<typeof import("../../../../lib").LoadingState>>, import("../../../../lib").StateView<import("../../../../lib").TStateViewForStateConfig<typeof import("../../../../lib").LoadingState>>>;
    bannedUsersQuery: import("../../../../lib").InjectedProp<import("../../../../lib").QueryModule<[{
        fetch: typeof fetchBannedUsers;
    }], TUser[], never, unknown>, import("../../../../lib").GetModuleStateView<import("../../../../lib").QueryModule<[{
        fetch: typeof fetchBannedUsers;
    }], TUser[], never, unknown>>, {}>;
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
    load(): Promise<void>;
    createUser(): void;
}
export declare function UsersPage(): JSX.Element;
export declare function UsersList(): JSX.Element;
export declare function UsersFooter(): JSX.Element;
export declare function RootLoadingState(): JSX.Element;
export declare function NestedLoadingState(): JSX.Element;
