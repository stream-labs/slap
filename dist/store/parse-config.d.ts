import { TStateConfig } from './Store';
/**
 * Generate a unified state config from a configCreator object
 */
export declare function parseStateConfig<TConfigDraft>(configCreator: TConfigDraft | (new (...args: any) => TConfigDraft) | ((...args: any) => TConfigDraft)): TStateConfig;
