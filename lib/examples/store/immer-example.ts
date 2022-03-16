import produce from 'immer';

const newEditorState = produce(editorState, draftState => {
  draftState.activeSceneId = 'scene1';
  draftState.activeItemId = 'item1';
});

const editorState = {};
