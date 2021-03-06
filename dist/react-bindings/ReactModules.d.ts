import React, { ReactNode } from 'react';
import { Scope, TModuleConstructorMap } from '../scope';
export declare type TAppContext = {
    servicesScope: Scope;
    modulesScope: Scope;
};
export declare const SlapContext: React.Context<TAppContext | null>;
export declare function useAppContext(): TAppContext;
export declare function createApp(Services?: TModuleConstructorMap): TAppContext;
export declare function ReactModules(p: {
    children: ReactNode | ReactNode[];
    app?: TAppContext;
}): JSX.Element;
