import Storage from './src/storage';
import SyncStorage from './src/syncStorage';
import Cookies from './src/cookies';

// 主构造函数
function UnitStorage(key) {
    // 初始化key
    this.key = key + '__' || 'us_';
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

export default new UnitStorage();
