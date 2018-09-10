//      定义cookie方法 此方法接受三个参数
function Cookies(name, value, time) {
    // 判断传入的参数类型，如果是对象方法就变里这个方法
    if (name && value) {
        set(name, value, time);
        return;
    } else {
        var obj = {};
        for (var key in all()) {
            obj[key] = JSON.parse(decodeURIComponent(all()[key])).value;
        }
        if (name) {
            return obj[name];
        }
        return obj;
    }
}

// 清除Cookie  一个参数删除，没有参数默认清除所有Cookie
Cookies.remove = function(name) {
    if (all()[name]) {
        document.cookie = name + '=; max-age=0';
    } else {
        var cookies = all();
        for (var key in cookies) {
            document.cookie = key + '=; max-age=0';
        }
    }
};

function set(name, value, day = null) {
    var date = new Date();
    date.setTime(date.getTime() + day * 24 * 3600 * 1000);
    if (value) {
        var _name = encodeURIComponent(name);
        var _vaule = encodeURIComponent(
            JSON.stringify({
                value,
            }),
        );
        var _day = day == null ? '' : ';expires=' + date.toGMTString();
        document.cookie = `${_name}=${_vaule}${_day}`;
    } else {
        if (decodeURIComponent(all()[name]) == undefined) {
            return decodeURIComponent(all()[name]);
        } else {
            return null;
        }
    }
}

//  GetCookie方法，将获取的多个cookie添加在一个对象中，返回给用户
function all() {
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

export default Cookies;
