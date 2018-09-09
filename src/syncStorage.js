const { format, getKeys, getValues } = require('../lib/uilts');
const Cookies = require('./cookies');

module.exports = function(store) {
    // get 方法
    store.prototype.get = function(key) {
        if (!key) return getValues(this.key);
        const _key = this.key + key;
        try {
            return JSON.parse(localStorage[_key]);
        } catch (error) {
            return undefined;
        }
    };
    // 在单元内添加一条记录
    store.prototype.set = function(key, val) {
        if (!key) return undefined;
        const _key = this.key + key;
        localStorage[_key] = format(val);
        return key;
    };
    // 删除单元内单个存储
    store.prototype.remove = function(key) {
        const _key = this.key + key;
        localStorage.removeItem(_key);
        return key;
    };
    // 清理单元内所有存贮
    store.prototype.clear = function() {
        const _all = localStorage;
        const keys = getKeys(_all, this.key);
        for (const key of keys) {
            localStorage.removeItem(key);
        }
    };
    store.prototype.Cookies = Cookies;
};
