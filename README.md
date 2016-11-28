# Route-coc简介

基于node 6.x、express.js 4.x开发的用于简化前端页面直出流程的框架。<br/>
coc 意为 约定优于配置（convention over configuration）。

[![Build Status](https://travis-ci.org/tofishes/route-coc.svg?branch=master)](http://travis-ci.org/tofishes/route-coc)
[![Dependency Status](https://gemnasium.com/tofishes/route-coc.svg)](https://gemnasium.com/tofishes/route-coc)
[![bitHound Score](https://www.bithound.io/github/tofishes/route-coc/badges/score.svg)](https://www.bithound.io/github/tofishes/route-coc)

[![NPM](https://nodei.co/npm/route-coc.png?downloads=true&stars=true)](https://nodei.co/npm/route-coc/)

route-coc已经规定好 拦截器-路由-页面渲染 这样的一个流程，使用者只需配置一些与业务相关的代码，即可方便的启动一个项目服务。

### Installation 安装

`$ npm install route-coc`

### Features 功能
* Router config file 简单配置可以实现接口数据的获取及页面渲染
* Filters 过滤器
* Interceptors 拦截器
* res.forward 服务器内跳转
* default template engine 默认使用swig模板引擎

### Quick Start 开始使用
 ```
  const express = require('express');
  const coc = require('route-coc');

  const app = express();
  const stage = coc(app);

  const port = 8080;
  app.listen(port, () => {
    const startInfo = `server run at http:\/\/localhost:${port}`;

    console.log(startInfo);
  });
  ```

### Docs 文档

[route-coc doument](https://tofishes.gitbooks.io/route-coc/content/)

### Examples 例子

```
$ git clone https://github.com/tofishes/route-coc.git
$ cd route-coc/example
```

### License

[MIT](https://github.com/tofishes/route-coc/blob/master/LICENSE)