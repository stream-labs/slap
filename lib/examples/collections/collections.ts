import { createSchema, injectCollection } from '../../slapp/db.service';
import { injectState } from '../../slapp/injectState';

// describe scenes collection in JSON Schema format
const sceneSchema = createSchema({
  name: 'scenes',
  description: 'Keeps information about scenes',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['id', 'name'],
} as const);

// generate the document type for the schema
type TScene = typeof sceneSchema.docType;


export class EditorService {

  scenesCollection = injectCollection(sceneSchema);

  fetchSceneByName(name) {
    return this.scenesCollection.items.findOne({ name }); // all db requests are async
  }
}
