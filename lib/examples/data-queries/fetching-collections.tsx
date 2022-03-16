import { injectCollection } from '../../slapp/db.service';
import { injectState } from '../../slapp/injectState';
import { useService } from '../../_plugins/useService';
import { injectQuery } from '../../slapp/query';




// before queries

class EditorService {

  // define state
  state = injectState({
    activeSceneId: 'scene1',
    items: [],
  });

  scenesCollection = injectCollection(sceneSchema);
  itemsCollection = injectCollection(sceneItemSchema);


  // `load` hook automatically executed when all injectors are resolved
  async load() {

    // load items for the current scene into the store
    const sceneId = this.state.activeSceneId;
    const items = await this.itemsCollection.find({ sceneId });
    this.state.setItems(items);
  }

}

// after queries

class EditorService {

  // define state
  state = injectState({
    activeSceneId: 'scene1',
  });

  scenesCollection = injectCollection(sceneSchema);
  itemsCollection = injectCollection(sceneItemSchema);

  // first arg is a collection
  // second arg is a filter
  itemsQuery = injectQuery(this.itemsCollection, { sceneId: this.state.activeSceneId });

}

class EditorService2 {

  switchScene(sceneId: string) {
    this.state.setActiveSceneId(sceneId);
  }

  // if the filter arg is a function
  // then the query will re-refetch data every time when filter has changed
  itemsQuery = injectQuery(
    this.itemsCollection,
    () => ({ sceneId: this.state.activeSceneId })
  );

  // second arg is a filter
  itemsQuery = injectQuery(this.itemsCollection, () => ({ sceneId: this.state.activeSceneId }));

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

async function loadItemsForCurrentScene() {
  // fetch items or return them from a query cache
  const items = await editorService.itemsQuery.exec();

  // prevents redundant data re-fetching

}
