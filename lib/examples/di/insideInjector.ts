import { DataBaseService } from 'services/database';
import { createInjector, ModuleInjectorType } from '../scope/injector';
import { TModuleClass } from '../scope';

class EditorService {

  db = inject(DataBaseService);

}

class EditorService {

  @inject() DataBaseService!: DataBaseService;

}


function inject<T extends TModuleClass>(ModuleClass: T) {

  return createInjector(injector => ({
    type: ModuleInjectorType,
    getValue: () => injector.provider.scope.resolve(ModuleClass),
  }));
}
