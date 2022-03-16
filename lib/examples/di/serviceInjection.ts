import { DataBaseService } from 'services/database';
import { inject } from '../scope/injector';

class EditorService {

  db = inject(DataBaseService);

}
