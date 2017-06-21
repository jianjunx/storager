# stor简介

stor封装提供了一个强大的stor方法可以让你更轻松的设置，查询和删除Cookie属性，每个cookie在设置时默认通过encodeURIComponent转码，读取时再通过decodeURIComponent解码。

# 怎么使用

在您的项目中引入stor.js文件，当然您也可将所有代码复制到您的项目中的js文件中。

```html
<script src="js/stor.js"></script>
```

## stor提供了以下方法

```javascript
stor.cookie(name,value,day)
stor.removeCookie(name)
stor.storage(name,value)
stor.removeStorage(name)
```

#### 1.stor.cookie() 方法：stor.cookie()是一个复用方法接收3个参数：name、valual、day    //分别为cookie名，设置的cookie值和过期时间。

   ##### 传入一个值时默认读取这个cookie值：

````javascript
stor.cookie("name")
//读取name这个cookie
````

  ##### 当stor.cookie()传入两个值时，会设置传入的cookie：

```javascript
stor.cookie("name","xiaoming")
//设置cookie名为 name 值为"xiaoming"
```

##### stor.cookie()第三个值时设置cookie的过期时间，单位为天，例如：

```javascript
stor.cookie("name","xiaoming",3)
// 3表示cookie的过期时间为3天
```

##### stor.cookie()还可以同时设置多个cookie，只需要您传入一个对象即可，如下：

```javascript
stor.cookie({
  name:"xiaoming",
  age:20,
  sex:"男"
  color:"deeppink"
})
// 这时对象中的所有属性都会被设置为cookie存储起来 name age sex color对应的cookie值为'xiaoming' 20 '男' 'deeppink'
```

##### 上面说到stor.cookie()传入一个值时回去这个cookie，那么如果不传如任何值则会获取当前所有cookie，获取的cookie以对象的形式返回；

````javascript
stor.cookie()
//如 以上设置了 name age sex color 四个cookie我们输出一下：
console.loge(stor.cookie())
/* 返回结果为: 
*	{
*  		name:"xiaoming",
*  		age:20,
*  		sex:"男"
*  		color:"deeppink"	
*	}
*/
````

#### 2.stor.removeCookie()	用来删除cookie操作的方法，传入一个要删除的cookie名即可，注意：如果不传入任何参数调用该方法，会默认执行清除所有cookie； 	

```javascript
stor.removeCookie("name");
// 删除name这条cookie数据；
stor.removeCookie();
// 此时会将当前所有cookie删除，谨慎操作；
```



#### 3. stor.storage()	此方法可以用来增删localStorage的操作，接收两个参数key value 

```javascript
stor.storage("color","pink")
// 添加一条 color 值为 "pink"的localStorage
stor.storage("color")
// 读取color这条localStorage；返回值为 "pink"
```

#### 4. stor.removeStorage()  此方法用来进行localStorage的删除操作。

```javascript
stor.storage("color")
// stor.removeStorage()会删除color这条localStorage；
```





现在只简单的封装了这些操作，有时间会增加更多的操作方法，例如：一条cookie存储多个值等功能。



