import { mutation } from '../../../lib';

export class WindowService {
  state = {
    activePage: 'editor',
    pages: [
      { title: 'Editor', id: 'editor' },
      { title: 'About', id: 'about' },
    ],
  };

  @mutation()
  setActivePage(page: string) {
    this.state.activePage = page;
  }
}
