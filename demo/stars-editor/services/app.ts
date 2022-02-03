import { mutation, Service } from '../../../lib';
import { EditorService } from './editor';

export class AppService extends Service {
  state = {
    activePage: 'editor',
    pages: [
      { title: 'Editor', id: 'editor' },
      { title: 'About', id: 'about' },
    ],
  };

  dependencies = {
    EditorService,
  };

  start() {
    this.deps.EditorService.load();
  }

  @mutation()
  setActivePage(page: string) {
    this.state.activePage = page;
  }
}
