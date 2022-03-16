import { injectState } from '../../slapp/injectState';
import { useService } from '../../_plugins/useService';

// describe a state with a class
class EditorState {

  // define default state
  state = {
    activeSceneId: '',
    activeItemId: '',
  };

  // define mutation
  setActiveSceneId(sceneId: string) {
    this.state.activeSceneId = sceneId;
    this.state.activeItemId = '';
  }

  // define getter
  get hasActiveItem() {
    return !!this.state.activeItemId;
  }

}

class EditorService {

  state = injectState(EditorState); // register state in any state-manager

}

function EditorComponent() {

  // useService returns a flat ServiceView object
  // all mutations and getters are merged in that object
  const { activeItemId, resetSelection } = useService(EditorService);
  return activeItemId;
}
