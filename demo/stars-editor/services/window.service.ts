import { injectState, injectLoading } from '../../../lib';

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
    { title: 'Mutation decorator', id: 'mutation' },
    { title: 'Form Binding', id: 'form-bindings' },
  ];

  setActivePage(page: string) {
    this.activePage = page;
  }
}

export class WindowService {
  state = injectState(WindowState);
  loading = injectLoading();
}
