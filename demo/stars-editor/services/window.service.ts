import { injectState } from '../../../lib/slapp/injectState';

export class WindowState {
  state = {
    activePage: 'editor',
    pages: [
      { title: 'Editor', id: 'editor' },
      { title: 'About', id: 'about' },
    ],
  };

  setActivePage(page: string) {
    this.state.activePage = page;
  }
}

export class WindowService {
  state = injectState(WindowState);

  init() {
  }
}
