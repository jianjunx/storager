# 简介

Storager 简单方便的localStorage/sessionStorage/Cookies方法，支持scop作用域隔离，存取互不影响。。

# 安装

```bash
$ npm install @web/storage --save
# or
$ yarn add @web/storage

```
# 浏览器
下载：[storager.min.js](./dist/storager.min.js)

```javascript
<script src='storager.min.js'></script>
<script>
    storager.set('test', 123);
    storager.get('test')  //123
</script>

```

# 使用

### 简单使用

```javascript
import Storager from '@web/storage';

//Storager 默认为localStorage 存储 
// 我们创建一个sessionStorage实例
// 第一个参数是 作用域分隔符 第二个参数是类型
const sessionStorage = Storager.createStorage('scoped', 'sessionStorage')

// sessionStorage 实例的API和localStorage 完全一致

// 存入string
Storager.set('name', 'Storager');
//存入一个对象
Storager.set('obj', {
    name: 'Storager',
    hello: 'world',
});

// 说明：上面存储成功后在浏览器查看会发现 key的前面多了 $: ，为了分隔Storager实例之间存取互不影响 默认会在所有的key前加上$:分隔,Scope 部分说明

// 取
Storager.get('name'); // Storager
Storager.get('obj'); //{name:'Storager',hello:'world'}
//取全部
Storager.get(); // {name:'Storager',obj:{name:'Storager',hello:'world'}}
//删除单个
Storager.del('obj');
// 删除全部
Storager.clear(); //只会删除当前作用域下的
// 跨作用域删除
Storager.removeAll() //会清空所有的记录
// 是否存在
Storager.has('name'); // true
// 所有的值
Storager.values() //[...]
//所有的key
Storager.keys() //[...]
//Cookies
Storager.Cookies();
// 见下面
```

### Cookies

Cookies()是一个复用方法接收 3 个参数：name、valual、day //分别为 cookie 名，设置的 cookie 值和过期时间。

```javascript
//使用
// Cookies方法在Storager实例原型上可以直接.Cookies使用
import Storager from '@web/storage';

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

# Scope 作用域分隔

为了避免存取数值时互相影响，Storager提供了作用域分隔，在创建实例时可以 Storager.createStorage(secret, type)

```javascript
const Storager = Storager.create('Storager');
/*
* secret 作用域分隔符
* type api类型 localStorage/sessionStorage
*/

Storager.createStorage(secret, type)

const LS = Storager.createStorage('ls', 'localStorage');

LS.set('test', 123);
// 在浏览器开发者工具中查看的是 ls:test  123 作用域是通过 ls: 分隔的

LS.get('test') //123

LS.keys() // ['test'] 取出的时候会自动去除分隔符，可以放心的用

```


## API LIST

```javascript
import Storager from '@web/storage';

const LS = Storager.createStorager(secret, type);

//同步api
LS.get(key); //取值
LS.set(key, value); //存值
LS.del(key); //删除单个
LS.clear(); // 清除当前作用域下的存储
LS.removeAll(); //删除所有存储的数据（跨作用域）
LS.has(key); //判断一个存储是否存在 true/false
LS.keys(); //返回当前作用域所有的 key
LS.values(); //返回当前作用域所有的 value


// 创建一个cookies方法
const Cookies = Storager.createCookies();

// Cookies上的方法
Cookies(key, value, time);
Cookies.remove();
```
