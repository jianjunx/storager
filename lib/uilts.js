// 取单元前缀
export const getKeys = function(ls, key) {
    const keys = [];
    for (let i = 0, len = ls.length; i < len; i++) {
        const _key = ls.key(i);
        if (_key.startsWith(key)) {
            keys.push(_key);
        }
    }
    return keys;
};
// 格式化存储对象
export const format = function(data) {
    return JSON.stringify({
        value: data,
    });
};
// 获取单元内的所有存储
export const getValues = function(ls, key) {
    const keys = format(ls, key);
    const obj = {};
    for (const _key of keys) {
        obj[_key] = JSON.parse(ls[key]).value;
    }
    return obj;
};
