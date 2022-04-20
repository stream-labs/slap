import { GetModuleInstanceFor, TModuleLocatorType, GetModuleConstructorArgs } from '../scope';
export declare function useModuleInstance<T extends TModuleLocatorType, TInitProps extends boolean | GetModuleConstructorArgs<T>>(locator: T, initProps?: TInitProps | null, name?: string): GetModuleInstanceFor<T>;
