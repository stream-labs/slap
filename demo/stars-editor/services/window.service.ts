import { injectState } from '../../../lib/slapp/injectState';

export class WindowState {
  activePage = 'editor';

  pages = [
    { title: 'Editor', id: 'editor' },
    { title: 'About', id: 'about' },
    { title: 'Highload', id: 'highload' },
  ];

  setActivePage(page: string) {
    this.activePage = page;
  }
}

export class WindowService {
  state = injectState(WindowState);

  init() {
  }
}
