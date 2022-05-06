import { GetModuleConstructorArgs, GetModuleInstanceFor, TModuleLocatorType } from '../scope';
import { useModuleInstance } from './useModuleInstance';
import { GetUseComponentViewResult, useComponentView } from './useComponentView';

export function useModule<
  T extends TModuleLocatorType,
  TInitState extends boolean | GetModuleConstructorArgs<T>
>(locator: T, initProps: TInitState|null = null, moduleName = ''): GetUseComponentViewResult<GetModuleInstanceFor<T>> {
  const module = useModuleInstance(locator, initProps, moduleName);
  return useComponentView(module);
}



export type GetUseModuleResult<T> = GetUseComponentViewResult<GetModuleInstanceFor<T>>;
