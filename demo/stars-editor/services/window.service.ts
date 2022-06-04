import { injectState } from '../../../lib';

export class WindowState {
  activePage = 'about';

  pages = [
    { title: 'Editor', id: 'editor' },
    { title: 'About', id: 'about' },
    { title: 'Highload', id: 'highload' },
    { title: 'Events', id: 'events' },
    { title: 'Users', id: 'users' },
    { title: 'Watchers', id: 'watchers' },
    { title: 'Queries', id: 'queries' },
    { title: 'Extended State', id: 'extended' },
    { title: 'Mutations', id: 'mutation' },
    { title: 'Form Binding', id: 'form-bindings' },
    { title: 'Functional Modules', id: 'functional-modules' },
    { title: 'ShouldComponentUpdate', id: 'should-update' },
    { title: 'Errors', id: 'errors' },
    { title: 'Generated Array Mutations', id: 'generated-array-mutations' },
  ];

  setActivePage(page: string) {
    this.activePage = page;
  }
}

export class WindowService {
  state = injectState(WindowState);
}
