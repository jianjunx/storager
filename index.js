const Storage = require('./src/storage');
const SyncStorage = require('./src/syncStorage');
const Cookies = require('./src/cookies');

// 主构造函数
function UnitStorage(key) {
    // 初始化key
    this.key = key || 'SS_';
}
// 清楚所有单元内所有数据
UnitStorage.prototype.clearAll = function() {
    localStorage.clear();
};
// 创建一个异步的单元存储
UnitStorage.prototype.create = function(key) {
    return new Storage(key);
};
// 创建一个同步的单元存储
UnitStorage.prototype.createSyn = function(key) {
    return new UnitStorage(key);
};
// 创建一个Cookie
UnitStorage.prototype.createCookies = function() {
    return Cookies;
};

//
SyncStorage(UnitStorage);

module.exports = new UnitStorage();
