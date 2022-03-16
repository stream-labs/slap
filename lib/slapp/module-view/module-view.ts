import { ModuleViewBuilder } from './module-view-builder';
import { pickState } from './pickState';
import { pickQueries } from './pickQueries';
import { pickControllers } from './pickControllers';

export function buildModuleView<T>(module: T) {
  return new ModuleViewBuilder(module)
    .use(pickState)
    .use(pickControllers)
    .use(pickQueries);
}

// import { EditorService } from '../../../demo/stars-editor/services/editor.service';
// const editorService = new EditorService();
// const editorView = buildModuleView(editorService).view;
// editorService.state.setActiveItemId('1')
//
// editorView.setActiveItemId('1');
// const items = editorView.sceneItems;
// const refetchResult = editorView.sceneItemsRefetch()

