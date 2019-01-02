var storager = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var enjson = function enjson(value) {
    try {
      var data = JSON.stringify({
        value: value
      });
      return encodeURIComponent(data);
    } catch (error) {
      return 'Err: JSON stringify Error';
    }
  };
  var dejson = function dejson(value) {
    try {
      value = decodeURIComponent(value);
      var data = JSON.parse(value);
      return data && data.value;
    } catch (error) {
      return 'Err: JSON parse Error';
    }
  };
  var toMap = function toMap(storage) {
    return new Map(Object.entries(storage));
  };
  var getKeys = function getKeys(storage, secret) {
    var storageMap = toMap(storage);
    return _toConsumableArray(storageMap.keys()).filter(function (key) {
      return key.startsWith(secret);
    });
  };

  var Storager =
  /*#__PURE__*/
  function () {
    function Storager() {
      var secret = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '$';
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'localStorage';

      _classCallCheck(this, Storager);

      this.secret = secret + ':';
      this.storage = window[type];
    }

    _createClass(Storager, [{
      key: "get",
      value: function get(key) {
        var _this$_merge = this._merge(key),
            storage = _this$_merge.storage,
            keys = _this$_merge.keys;

        return dejson(storage.getItem(keys));
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var _this$_merge2 = this._merge(key),
            storage = _this$_merge2.storage,
            keys = _this$_merge2.keys;

        storage.setItem(keys, enjson(value));
      }
    }, {
      key: "del",
      value: function del(key) {
        var _this$_merge3 = this._merge(key),
            storage = _this$_merge3.storage,
            keys = _this$_merge3.keys;

        storage.removeItem(keys);
      }
    }, {
      key: "has",
      value: function has(key) {
        return !!this.get(key);
      }
    }, {
      key: "keys",
      value: function keys() {
        var secret = this.secret,
            storage = this.storage;
        var keyList = getKeys(storage, secret);
        return keyList.map(function (key) {
          return key.replace(secret, '');
        });
      }
    }, {
      key: "values",
      value: function values() {
        var secret = this.secret,
            storage = this.storage;
        var keyList = getKeys(storage, secret);
        return keyList.reduce(function (item, key) {
          return _toConsumableArray(item).concat([dejson(storage[key])]);
        }, []);
      }
    }, {
      key: "clear",
      value: function clear() {
        var secret = this.secret;
        this.removeAll(secret);
      }
    }, {
      key: "removeAll",
      value: function removeAll() {
        var secret = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var storage = this.storage;
        var delKeys = getKeys(storage, secret);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = delKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            storage.removeItem(key);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: "_merge",
      value: function _merge(key) {
        return {
          keys: this.secret + key,
          storage: this.storage
        };
      }
    }]);

    return Storager;
  }();

  //      定义cookie方法 此方法接受三个参数
  function Cookies(name, value, time) {
    // 判断传入的参数类型，如果是对象方法就变里这个方法
    if (name && value) {
      set$1(name, value, time);
      return;
    } else {
      var obj = {};

      for (var key in all()) {
        var data = JSON.parse(decodeURIComponent(all()[key]));
        obj[key] = data && data.value;
      }

      if (name) {
        return obj[name];
      }

      return obj;
    }
  } // 清除Cookie  一个参数删除，没有参数默认清除所有Cookie


  Cookies.remove = function (name) {
    if (all()[name]) {
      document.cookie = name + '=; max-age=0';
    } else {
      var cookies = all();

      for (var key in cookies) {
        document.cookie = key + '=; max-age=0';
      }
    }
  };

  function set$1(name, value) {
    var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var date = new Date();
    date.setTime(date.getTime() + day * 24 * 3600 * 1000);

    if (value) {
      var _name = encodeURIComponent(name);

      var _vaule = encodeURIComponent(JSON.stringify({
        value: value
      }));

      var _day = day == null ? '' : ';expires=' + date.toGMTString();

      document.cookie = "".concat(_name, "=").concat(_vaule).concat(_day);
    } else {
      if (decodeURIComponent(all()[name]) == undefined) {
        return decodeURIComponent(all()[name]);
      } else {
        return null;
      }
    }
  } //  GetCookie方法，将获取的多个cookie添加在一个对象中，返回给用户


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

  var Main =
  /*#__PURE__*/
  function (_Storage) {
    _inherits(Main, _Storage);

    function Main(secret, type) {
      var _this;

      _classCallCheck(this, Main);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Main).call(this, secret, type));
      _this.cookies = _this.createCookies();
      return _this;
    }

    _createClass(Main, [{
      key: "createCookies",
      value: function createCookies() {
        return Cookies;
      }
    }, {
      key: "createStorage",
      value: function createStorage(secret, type) {
        return new Storager(secret, type);
      }
    }]);

    return Main;
  }(Storager);

  var main = new Main('$', 'localStorage');

  return main;

}());
