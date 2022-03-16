import { injectCollection } from '../../slapp/db.service';
import { injectState } from '../../slapp/injectState';
import { useService } from '../../_plugins/useService';

// async injectors and lifecycle

export class EditorService {

  // define state
  state = injectState({
    activeSceneId: 'scene1',
    items: [],
  });

  scenesCollection = injectCollection(sceneSchema);
  itemsCollection = injectCollection(sceneItemSchema);

  // we still have the `init` hook
  init() {
    // service is created but async injectors are not resolved
    // collections are not ready here
    // you most likely don't need this hook
  }

  // `load` hook automatically executed when all injectors are resolved
  async load() {
    // all injectors are resolved
    // we can request collection here

    // load items for the current scene into the store
    const sceneId = this.state.activeSceneId;
    const items = await this.itemsCollection.find({ sceneId });
    this.state.setItems(items);
  }

}

function EditorComponent() {
  const { isLoading, items } = useService(EditorService);

  // isLoading == true only when the `load` hook is completed
  if (isLoading) return 'Loading...';

  return (
    <ul>
      {items.map(item => <li>{item.name}</li>)}
    </ul>
  );

}
