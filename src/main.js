import Storage from './lib/Storager';
import Cookies from './lib/Cookies';

class Main extends Storage {
  constructor(secret, type) {
    super(secret, type);
    this.cookies = this.createCookies();
  }
  createCookies() {
    return new Cookies();
  }
  createStorage(secret, type) {
    return new Storage(secret, type);
  }
}

export default new Main('$', 'localStorage');
