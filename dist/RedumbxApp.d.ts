import { ReactNode } from 'react';
import { Scope } from './scope/scope';
import { TModuleConstructorMap } from './scope/interfaces';
export declare function RedumbxApp(p: {
    children: ReactNode | ReactNode[];
    moduleManager?: Scope;
    services?: TModuleConstructorMap;
    fallback?: ReactNode;
}): JSX.Element;
export declare function ModuleRoot(p: {
    children: ReactNode | ReactNode[];
    module: any;
}): JSX.Element;
