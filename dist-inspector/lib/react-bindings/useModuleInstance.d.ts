import { GetModuleInstanceFor, TModuleLocatorType, GetModuleConstructorArgs } from '../scope';
/**
 * Resolve module instance for a component
 */
export declare function useModuleInstance<T extends TModuleLocatorType, TInitProps extends boolean | GetModuleConstructorArgs<T>>(locator: T, initProps?: TInitProps | null, name?: string): GetModuleInstanceFor<T>;
