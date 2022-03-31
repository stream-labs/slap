import { TModuleInstanceFor, TModuleLocatorType } from '../scope';
export declare function useModuleInstance<T extends TModuleLocatorType, TInitProps extends boolean | Partial<TModuleInstanceFor<T>['state']>>(locator: T, initProps?: TInitProps | null, name?: string): TModuleInstanceFor<T>;
