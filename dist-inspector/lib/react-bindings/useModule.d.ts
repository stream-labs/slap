import { GetModuleConstructorArgs, GetModuleInstanceFor, TModuleLocatorType } from '../scope';
import { GetUseComponentViewResult } from './useComponentView';
export declare function useModule<T extends TModuleLocatorType, TInitState extends boolean | GetModuleConstructorArgs<T>>(locator: T, initProps?: TInitState | null, moduleName?: string): GetUseComponentViewResult<GetModuleInstanceFor<T>>;
export declare type GetUseModuleResult<T> = GetUseComponentViewResult<GetModuleInstanceFor<T>>;
