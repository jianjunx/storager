# 简介

Storager 简单方便的localStorage/sessionStorage/Cookies方法，支持scop作用域隔离，存取互不影响。。

# 安装

```bash
$ npm install unit-Storager --save
# or
$ yarn add unit-Storager
```

# 使用

### 简单使用

```javascript
import Storager from '@js/storager';

// 存入string
Storager.set('name', 'Storager');
//存入一个对象
Storager.set('obj', {
    name: 'Storager',
    hello: 'world',
});

// 取
Storager.get('name'); // Storager
Storager.get('obj'); //{name:'Storager',hello:'world'}
//取全部
Storager.get(); // {name:'Storager',obj:{name:'Storager',hello:'world'}}
//删除单个
Storager.remove('obj');
// 删除全部
Storager.clear();
// 是否存在
Storager.has('name'); // true
//Cookies
Storager.Cookies();
// 见下面
```

### Cookies

Cookies()是一个复用方法接收 3 个参数：name、valual、day //分别为 cookie 名，设置的 cookie 值和过期时间。

```javascript
//使用
// Cookies方法在Storager实例原型上可以直接.Cookies使用
import Storager from 'unit-Storager';

Storager.Cookies(key, val, time);
// 或者 使用createCookies函数创建一个方法
const Cookies = Storager.createCookies();
// 使用
Cookies(key,val,time);

//传入两个值时，会设置传入的cookie
Cookies('name', 'jefxie');

//传入一个值时默认读取这个cookie值
Cookies('name') //jefxie

//第三个值是设置cookie的过期时间，单位为天，例如：
Cookies('name', 'jefxie', 3) //3表示cookie的过期时间为3天
// 返回所有
Cookies()
//删除cookie

// 传入一个要删除的cookie名即可，注意：如果不传入任何参数调用该方法，会默认执行清除所有cookie；
Cookies.remove(key?);
```

## 单元分隔存储

创建单元存储需要一个实例名，相当于表名，不同单元之间存取互不影响，例如

### 创建一个异步单元存储实例（异步 API）

```javascript
const Storager = Storager.create('Storager');

//存
Storager
    .set('name', 'us')
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        // err
    });
// 取
Storager
    .get('name')
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        // err
    });
```

### 创建一个同步单元实例（同步 API）

```javascript
const Storager = Storager.createSyn('Storager');

//存
Storager.set('name', 'us');
// 取
Storager.get('name'); //us

//... 同简单使用
```

## API

```javascript
import Storager from 'unit-Storager';

//异步api
const Async = Storager.create('async');
Async.get(key?); //为空返回该单元所有存储
Async.set(key, value);
Async.remove(key);
Async.clear();
Async.has();

//同步api
const Sync = Storager.createSyn('sync');
Sync.get(key);
Sync.set(key, value);
Sync.remove(key);
Sync.clear();
Sync.clearAll(); //删除所有存储的数据
Sync.has();

// get()的返回格式
const res = {
    value: 'value', //存储的值,
};

// 创建一个cookies方法
const Cookies = Storager.createCookies();

// Cookies上的方法
Cookies(key, value, time);
Cookies.remove();
```
