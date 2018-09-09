//      定义cookie方法 此方法接受三个参数
function Cookies(name, value, time) {
    // 判断传入的参数类型，如果是对象方法就变里这个方法
    if (name) {
        if (Object.prototype.toString.call(name) == '[object Object]') {
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
        var obj = {};
        for (var key in Cookies.all()) {
            obj[key] = decodeURIComponent(Cookies.all()[key]);
        }
        return obj;
    }
}
//  GetCookie方法，将获取的多个cookie添加在一个对象中，返回给用户
Cookies.all = function() {
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
};
//          清除Cookie  一个参数删除，没有参数默认清除所有Cookie
Cookies.remove = function(name) {
    if (Cookies.all()[name]) {
        document.cookie = name + '=; max-age=0';
    } else {
        var cookies = Cookies.all();
        for (var key in cookies) {
            document.cookie = key + '=; max-age=0';
        }
    }
};

function set(name, value, day) {
    var date = new Date();
    date.setTime(date.getTime() + day * 24 * 3600 * 1000);
    if (value) {
        var _name = encodeURIComponent(name);
        var _vaule = encodeURIComponent(value);
        var _day = day == null ? '' : ';expires=' + date.toGMTString();
        document.cookie = `${_name}=${_vaule}=${_day}`;
    } else {
        if (decodeURIComponent(Cookies.all()[name]) == undefined) {
            return decodeURIComponent(Cookies.all()[name]);
        } else {
            return null;
        }
    }
}

export default Cookies;
