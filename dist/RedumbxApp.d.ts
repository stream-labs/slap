import { ReactNode } from 'react';
import { TModuleConstructorMap } from './store';
import { Scope } from './scope';
export declare function RedumbxApp(p: {
    children: ReactNode | ReactNode[];
    moduleManager?: Scope;
    services?: TModuleConstructorMap;
}): JSX.Element;
export declare function ModuleRoot(p: {
    children: ReactNode | ReactNode[];
    module: any;
}): JSX.Element;
