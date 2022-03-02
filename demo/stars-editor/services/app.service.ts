import { injectScope, mutation } from '../../../lib';
import { UsersService } from './users.service';

export class AppService {
  /**
   * define a shared global state for all windows
   */
  state = {
    theme: 'day',
    locale: 'En-US',
  };

  scope = injectScope();

  init() {
    this.scope.registerMany({ UsersService });
    // this.services.EditorService.load();
  }

  @mutation()
  setTheme(theme: string) {
    this.state.theme = theme;
  }
}
