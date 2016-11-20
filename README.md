## 框架route-coc简介

基于express.js用于简化前端页面直出流程的框架。
coc 意为 约定优于配置（convention over configuration）。

[![Build Status](https://travis-ci.org/tofishes/route-coc.svg?branch=master)](http://travis-ci.org/tofishes/route-coc)
[![Dependency Status](https://gemnasium.com/tofishes/route-coc.svg)](https://gemnasium.com/tofishes/route-coc)
[![bitHound Score](https://www.bithound.io/github/tofishes/route-coc/badges/score.svg)](https://www.bithound.io/github/tofishes/route-coc)

[![NPM](https://nodei.co/npm/route-coc.png?downloads=true&stars=true)](https://nodei.co/npm/route-coc/)

### 约定

#### 路由
* route - 路由、路线，仅指字符串路径，例如 '/hello/:name'
* router - 路由器，指包含route在内的一个配置对象

#### 参数，因为都是一个对象，因此使用单数形式，而非复数
* query: get请求地址?后跟的参数，req.query
* body: post请求体参数，req.body
* param: 路由中定义的参数，req.param
* param将被分别合并到req.query, req.body

#### router配置项
* 函数中的this始终指向该router
* 完整可配置项有：
  {
    api: String | Array | Function,
    name: String

  }
* 配置项说明：
  * router.api: api地址，可以是字符串，可以是数组，可以是函数。数组项可以是字符串、函数、对象3种类型。函数可返回字符串或数组。数组项为函数的，该函数只能返回字符串、对象或false，当为false时该请求不再处理。
  若为对象类型，该对象结构为：
  ```
  {
    api: String,
    name: String,
    cache: Boolean,
    query: Function,
    body: Function,
    handle: Function
  }
  ```
  * router.name: 可选，api返回的数据被存在res.apiData中的名称，默认从api地址获取，例如 api地址为/api/newsList，那么name为newsList。
  * router.cache: 是否缓存api结果，通过app.set('apiDataCache', cacheFunction)，app.get('apiDataCache')设置缓存及获取缓存，默认策略是缓存在内存中（重启才会清空）。
  * router.query:

### 拦截器配置
* interceptor只能配置一级handle + 一级api字符串类型，或api数组类型二级handle

### 框架内扩展属性及方法：
* req.pathname 默认等于req.path, 使用req.forward功能后则不相等，req.path始终为原始请求地址
  推荐使用req.pathname替代req.path
* req.stageIndex 当前stage索引，框架内使用，使用者可忽略
* req.router 当前pathname所匹配到的router

* res.apiData 数据集合，接口返回的经过handle处理的数据
* res.forward 服务器端跳转，改变req.pathname及req.param，区别于res.redirect
* res.hasSent 当代理转发请求时，值为true，此时res.headersSent不能正确赋值

#### 扩展属性，若是框架必须，则不应在stage插件中初始化，必须在stage.handle中初始化

### 工作流程
1. 读取router文件夹所有配置，需对多个逗号分隔的route做分离
2. 遍历routers，把route转为正则并存入router
3. 初始化Stage对象，并返回给调用者，调用者可用befores,afters插入处理方法
4. 标准stage:match-router，根据请求地址匹配路由
4. 标准stage:requrest-proxy，无匹配router，ajax启用自动转发
5. 标准stage:handle-router，匹配到router，分析并发起请求得到数据
6. 标准stage:render，根据上一步得到的数据渲染模板
10. 判断view视图，string | function，渲染视图

### 任务对象Task
```
class Task {
  string name;
  function do();
}
```

### 备注
* 曾考虑过这样一种优化，根据get/post等方法细分routers，然后根据req.method得到一个较小的子集，这样循环匹配路由是不是可以更快一些。但是被自己否定了，如果这样做了，会隐藏掉一些错误，比如配置了一个get请求，但实际是用post，这样不能匹配到路由，也不能用405状态提示使用者，会让使用者难以发现问题。

## Release
* v1.0.3 fixed glob muodle
* v1.0.0 stable version
* alpha not surport
