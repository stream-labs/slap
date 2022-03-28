import { UsersService } from './users.service';
import { injectScope } from '../../../lib/scope/injector';
import { WindowService } from './window.service';
import { EditorService } from './editor.service';

export class AppService {
  /**
   * define a shared global state for all windows
   */
  state = {
    theme: 'day',
    locale: 'En-US',
  };

  scope = injectScope();

  load() {
    // this.scope.registerMany({ UsersService, WindowService, EditorService });
    // this.services.EditorService.load();
  }

  // @mutation()
  // setTheme(theme: string) {
  //   this.state.theme = theme;
  // }
}
