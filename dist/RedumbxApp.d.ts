import { ReactNode } from 'react';
import { ReduxModuleManager } from './store';
export declare function RedumbxApp(p: {
    children: ReactNode | ReactNode[];
    moduleManager?: ReduxModuleManager;
}): JSX.Element;
export declare function ModuleRoot(p: {
    children: ReactNode | ReactNode[];
    module: any;
}): JSX.Element;
