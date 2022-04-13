import { injectState } from '../../../lib/store/injectState';
import { injectLoading } from '../../../lib/store/plugins/pickLoadingState';

export class WindowState {
  activePage = 'queries';

  pages = [
    { title: 'Editor', id: 'editor' },
    { title: 'About', id: 'about' },
    { title: 'Highload', id: 'highload' },
    { title: 'Users', id: 'users' },
    { title: 'Watchers', id: 'watchers' },
    { title: 'Queries', id: 'queries' },
    { title: 'Extended State', id: 'extended' },
  ];

  setActivePage(page: string) {
    this.activePage = page;
  }
}

export class WindowService {
  state = injectState(WindowState);
  loading = injectLoading();
}
