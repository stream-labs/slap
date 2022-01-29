import { createModuleManager } from '../../../lib';
import { AppService } from './app';
import { ApiService } from './api';
import { EditorService } from './editor';

export const moduleManager = createModuleManager();

export const Services = moduleManager.registerServices({
  AppService,
  ApiService,
  EditorService,
});
