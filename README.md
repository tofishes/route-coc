# Route-coc简介

基于node 6.x、express.js 4.x开发的用于简化前端页面直出流程的框架。<br/>
coc 意为 约定优于配置（convention over configuration）。

[![Build Status](https://travis-ci.org/tofishes/route-coc.svg?branch=master)](http://travis-ci.org/tofishes/route-coc)
[![Dependency Status](https://gemnasium.com/tofishes/route-coc.svg)](https://gemnasium.com/tofishes/route-coc)
[![bitHound Score](https://www.bithound.io/github/tofishes/route-coc/badges/score.svg)](https://www.bithound.io/github/tofishes/route-coc)

[![NPM](https://nodei.co/npm/route-coc.png?downloads=true&stars=true)](https://nodei.co/npm/route-coc/)

route-coc已经规定好 拦截器-路由-页面渲染 这样的一个流程，使用者只需配置一些与业务相关的代码，即可方便的启动一个项目服务。

### 功能
* 简单配置可以实现接口数据的获取及页面渲染
* 自定义流程及过滤器
* 拦截器
* res.forward服务器内跳转

**约定的概念及属性：**

#### 路由
* route - 路由、路线，仅指字符串路径，例如 '/hello/:name'
* router - 路由器，指包含route在内的一个配置对象

#### 参数，因为都是一个对象，因此使用单数形式，而非复数
* query: get请求地址?后跟的参数，req.query
* body: post请求体参数，req.body
* param: 路由中定义的参数，req.param <br>
  param将被分别合并到req.query, req.body

#### Stage, 工作流程的一个场景，每个stage完成一件事并可以产出特定结果。

可以用before,after方法对stage添加预处理流程或后处理流程。

目前内置的工作流程有：

```
[
  "pageInfo",
  "matchRouter",
  "initHttpRequest",
  "requestProxy",
  "handleInterceptor",
  "handleRouter",
  "runTask",
  "getViewPath",
  "render"
]
```

通过before, after方法可以往以上默认流程加入自定义的一些处理流程。