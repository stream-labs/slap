import { Mutation } from './store';
import { Scope } from './scope/scope';
import { TModuleConstructorMap } from './scope/interfaces';
export declare function createModuleManager(Services?: TModuleConstructorMap): Scope;
export interface IModuleMetadata {
    moduleName: string;
    scopeId: string;
    instance: any;
    isStateful: boolean;
    createView: any;
    view: any;
    mutations: Record<string, Mutation>;
    originalMutations: Record<string, Function>;
}
