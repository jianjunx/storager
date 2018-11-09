import { enjson, dejson, getKeys } from '../utils/utils';

class Storager {
  constructor(secret = '$', type = 'localStorage') {
    this.secret = secret + ':';
    this.storage = window[type];
  }
  get(key) {
    const { storage, keys } = this._merge(key);
    return dejson(storage.getItem(keys));
  }
  set(key, value) {
    const { storage, keys } = this._merge(key);
    storage.setItem(keys, enjson(value));
  }
  del(key) {
    const { storage, keys } = this._merge(key);
    storage.removeItem(keys);
  }
  has(key) {
    return !!this.get(key);
  }
  keys() {
    const { secret, storage } = this;
    const keyList = getKeys(storage, secret);
    return keyList.map(key => key.replace(secret, ''));
  }
  values() {
    const { secret, storage } = this;
    const keyList = getKeys(storage, secret);
    return keyList.reduce((item, key) => [...item, dejson(storage[key])], []);
  }
  clear() {
    const { secret } = this;
    this.removeAll(secret);
  }
  removeAll(secret = '') {
    const { storage } = this;
    const delKeys = getKeys(storage, secret);
    for (const key of delKeys) {
      storage.removeItem(key);
    }
  }
  _merge(key) {
    return {
      keys: this.secret + key,
      storage: this.storage,
    };
  }
}

export default Storager;
