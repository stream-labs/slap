import { Scope } from './scope/scope';
import { TModuleConstructorMap } from './scope/interfaces';
export declare function createModuleManager(Services?: TModuleConstructorMap): Scope;
/**
 * The ModuleManager is a singleton object accessible in other files
 * via the `getModuleManager()` call
 */
export declare function getModuleManager(appId: string): Scope;
export declare function destroyModuleManager(appId: string): void;
export interface IModuleMetadata {
    moduleName: string;
    scopeId: string;
    instance: any;
    createView: any;
    view: any;
    componentIds: string[];
}
