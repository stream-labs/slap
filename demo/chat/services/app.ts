import { mutation } from '../../../lib';

export class AppService {
  state = {
    page: 'home',
  };

  @mutation()
  setPage(page: string) {
    this.state.page = page;
  }
}
