import { injectState, injectLoading } from '../../../lib';

export class WindowState {
  activePage = 'about';

  pages = [
    { title: 'Editor', id: 'editor' },
    { title: 'About', id: 'about' },
    { title: 'Highload', id: 'highload' },
    { title: 'Users', id: 'users' },
    { title: 'Watchers', id: 'watchers' },
    { title: 'Queries', id: 'queries' },
    { title: 'Extended State', id: 'extended' },
    { title: 'Mutations', id: 'mutation' },
    { title: 'Form Binding', id: 'form-bindings' },
    { title: 'Functional Modules', id: 'functional-modules' },
    { title: 'ShouldComponentUpdate', id: 'should-update' },
  ];

  setActivePage(page: string) {
    this.activePage = page;
  }
}

export class WindowService {
  state = injectState(WindowState);
  loading = injectLoading();
}
