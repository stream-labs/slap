import { isPlainObject } from 'is-plain-object';
import { Dict } from '../scope';
import { traverse } from '../utils';
import { TStateConfig } from './Store';

/**
 * Generate a unified state config from a configCreator object
 */
export function parseStateConfig<TConfigDraft>(configCreator: TConfigDraft | (new (...args: any) => TConfigDraft)): TStateConfig {
  const configDraft = isPlainObject(configCreator) ? configCreator : new (configCreator as any)();

  const config: TStateConfig = {
    state: {},
    getters: {},
    getterMethods: {},
    mutations: {},
  };

  config.state = parseDefaultState(configDraft);

  // parse explicit getters
  const explicitGetters = configDraft.getters;
  if (explicitGetters) {
    traverse(explicitGetters, (propName, descriptor) => {
      if (descriptor.get) {
        config.getters[propName] = descriptor;
        return;
      }

      const getterMethod = explicitGetters[propName];
      if (typeof getterMethod !== 'function') return;

      config.getterMethods[propName] = explicitGetters[propName];
    });
  }

  // parse heuristic getters
  if (configDraft) {
    traverse(configDraft, (propName, descriptor) => {

      if (descriptor.get) {
        config.getters[propName] = descriptor;
        return;
      }

      const getterMethod = configDraft[propName];
      if (typeof getterMethod !== 'function') return;

      const isValidGetterName = (
        propName.startsWith('get')
        || propName.startsWith('is')
        || propName.startsWith('should')
      );

      if (!isValidGetterName) return;

      config.getterMethods[propName] = configDraft[propName];
    });
  }

  // parse mutations
  traverse(configDraft, (propName, descriptor) => {
    if (descriptor.get) return;
    if (propName in config.getterMethods) return;
    const method = configDraft[propName];

    if (typeof method !== 'function') return;

    config.mutations[propName] = configDraft[propName];
  });

  return config;
}

function parseDefaultState(target: any) {
  const defaultState: Dict<string> = {};
  // if the `state` variable is set in the config, then pick the default state from it
  if (target.state) {
    traverse(target.state, (propName, descr) => {
      defaultState[propName] = target.state[propName];
    });
  } else {
    traverse(target, (propName, descr) => {
      if (descr.get) return;
      const propVal = descr.value;
      if (typeof propVal === 'function') return;
      defaultState[propName] = propVal;
    });
  }
  return defaultState;
}
