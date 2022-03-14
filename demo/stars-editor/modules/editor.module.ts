import { inject } from '../../../lib';
import { EditorService } from '../services/editor.service';

export class EditorModule {

  editorService = inject(EditorService);


}
