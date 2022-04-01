import { injectState } from '../../../lib/store/injectState';

export class WindowState {
  activePage = 'editor';

  pages = [
    { title: 'Editor', id: 'editor' },
    { title: 'About', id: 'about' },
    { title: 'Highload', id: 'highload' },
    { title: 'Users', id: 'users' },
  ];

  setActivePage(page: string) {
    this.activePage = page;
  }
}

export class WindowService {
  state = injectState(WindowState);
}
