import { ReactNode } from 'react';
import { TModuleConstructorMap } from './store';
import { ModuleManager } from './module-manager';
export declare function RedumbxApp(p: {
    children: ReactNode | ReactNode[];
    moduleManager?: ModuleManager;
    services?: TModuleConstructorMap;
}): JSX.Element;
export declare function ModuleRoot(p: {
    children: ReactNode | ReactNode[];
    module: any;
}): JSX.Element;
