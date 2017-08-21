(function (step) {
    function storage(key, value) {
        if (value) {
            window.localStorage.setItem(key, value);
        } else {
            return window.localStorage.getItem(key)
        }
    };

    function removeStorage(key) {
        window.localStorage.removeItem(key)
    }

    //      定义cookie方法 此方法接受三个参数
    function cookie(name, value, time) {
        // 判断传入的参数类型，如果是对象方法就变里这个方法
        if (name) {
            if (Object.prototype.toString.call(name) == "[object Object]") {
                for (var key in name) {
                    // 调用set方法设置cookie
                    set(key, name[key], time);
                }
                // 如果传入的name类型为数组类型则获取cookie并放如数组中。
            } else {
                if (value) {
                    set(name, value, time);
                } else {
                    return set(name, value, time);
                }
            }
        } else {
            var obj = {}
            for (var key in getAllCookie()) {
                obj[key] = decodeURIComponent(getAllCookie()[key])
            }
            return obj;
        }
    }
    //          清除Cookie  一个参数删除，没有参数默认清除所有Cookie
    function removeCookie(name) {
        if (getAllCookie()[name]) {
            document.cookie = name + '=; max-age=0';
        } else {
            var cookies = getAllCookie();
            for (var key in cookies) {
                document.cookie = key + '=; max-age=0';
            }
        }
    }

    function set(name, value, day) {
        if (value) {
            document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ((day == null) ?
                "" : ";expires=" + day.toString());
        } else {
            if (decodeURIComponent(getAllCookie()[name]) == undefined) {
                return decodeURIComponent(getAllCookie()[name])
            } else {
                return null;
            }
        }
    }
    //  GetCookie方法，将获取的多个cookie添加在一个对象中，返回给用户
    function getAllCookie() {
        var cookies = {};
        if (document.cookie) {
            var objs = document.cookie.split('; ');
            for (var i in objs) {
                var index = objs[i].indexOf('='),
                    name = objs[i].substr(0, index),
                    value = objs[i].substr(index + 1, objs[i].length);
                cookies[name] = value;
            }
        }
        return cookies;
    }

    //         setp等于window对象 在windown对象中添加stor方法；
    step["stor"] = {
        "cookie": cookie,
        "removeCookie": removeCookie,
        "storage": storage,
        "removeStorage": removeStorage
    }
})(window);
