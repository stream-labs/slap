import { DataBaseService } from 'services/database';
import { createInjector } from '../scope/injector';

class EditorService {

  db = injectDB(); // resolve database service based on environment

}


function injectDB() {

  return createInjector(injector => ({
    type: DBInjectorType,
    getValue: () => injector.provider.scope.resolve(DataBaseService),
  }));
}
