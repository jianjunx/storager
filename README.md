# 简介

UnitStorage 简化并增强了 localStorage 的 API，支持存储多种数据格式并支持异步存取，支持单元分表存取。附带Cookies简便方法，使用起来更方便。

# 安装

```bash
$ npm install unit-storage --save
# or
$ yarn add unit-storage
```

# 使用

### 简单使用

```javascript
import UnitStorage from 'unit-storage';

// 存入string
UnitStorage.set('name', 'UnitStorage');
//存入一个对象
UnitStorage.set('obj', {
    name: 'UnitStorage',
    hello: 'world',
});

// 取
UnitStorage.get('name'); // UnitStorage
UnitStorage.get('obj'); //{name:'UnitStorage',hello:'world'}
//取全部
UnitStorage.get(); // {name:'UnitStorage',obj:{name:'UnitStorage',hello:'world'}}
//删除单个
UnitStorage.remove('obj');
// 删除全部
UnitStorage.clear();

//Cookies
UnitStorage.Cookies();
// 见下面
```

### Cookies

Cookies()是一个复用方法接收 3 个参数：name、valual、day //分别为 cookie 名，设置的 cookie 值和过期时间。

```javascript
//使用
// Cookies方法在UnitStorage实例原型上可以直接.Cookies使用
import UnitStorage from 'unit-storage';

UnitStorage.Cookies(key,val,time);
// 或者 使用createCookies函数创建一个方法
const Cookies = UnitStorage.createCookies();
// 使用
Cookies(key,val,time);

//传入两个值时，会设置传入的cookie
Cookies('name','jefxie');

//传入一个值时默认读取这个cookie值
Cookies('name') //jefxie

//第三个值是设置cookie的过期时间，单位为天，例如：
Cookies('name','jefxie',3) //3表示cookie的过期时间为3天

//删除cookie

// 传入一个要删除的cookie名即可，注意：如果不传入任何参数调用该方法，会默认执行清除所有cookie；
Cookies.remove(key?);

Cookies.all() //返回所有的cookies
```

## 单元实例

创建单元存储需要一个实例名，相当于表名，不同单元之间存取互不影响

### 创建一个异步单元实例

```javascript
const unit1 = UnitStorage.create('unit1');

//存
unit1
    .set('name', 'us')
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        // err
    });
// 取
unit1
    .get('name')
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        // err
    });
```

### 创建一个同步单元实例

```javascript
const unit2 = UnitStorage.createSyn('unit2');

//存
unit1.set('name', 'us');
// 取
unit1.get('name'); //us

//... 同简单使用
```

## API

```javascript
import UnitStorage from 'unit-storage';

//异步api
const Async = UnitStorage.create('async');
Async.get(key?) //为空返回该单元所有存储
Async.set(key,value)
Async.remove(key)
Async.clear()

//同步api
const Sync = UnitStorage.createSyn('sync');
Sync.get(key);
Sync.set(key,value);
Sync.remove(key);
Sync.clear();
Sync.clearAll(); //删除所有存储的数据

// get()的返回格式
 res = {
     value:'value' //存储的值,
     create:12687612367123, //存储的时间戳
     type:'string' //value 的类型
 }

 // 创建一个cookies方法
 const Cookies = UnitStorage.createCookies();

// Cookies上的方法
 Cookies(key,value,time);
 Cookies.remove();
 Cookies.all();
```
