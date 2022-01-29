import { Services } from './service-provider';
import { mutation } from '../../../lib';

export type TAppPageId = 'editor' | 'about';

export class AppService {
  state = {
    activePage: 'editor',
  };

  init() {
    Services.EditorService.load();
  }

  readonly pages: { title: string, id: TAppPageId }[] = [
    { title: 'Editor', id: 'editor' },
    { title: 'About', id: 'about' },
  ];

  @mutation()
  setActivePage(page: TAppPageId) {
    this.state.activePage = page;
  }
}
