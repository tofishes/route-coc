* [v1.3.0] - 2017-08-11

  ### Changed

  1. 取消全局interceptXhr设置，改为知道单个interceptor配置项ajax=true|false。
  2. 接口数据缓存由单纯的boolean改为可配置为有效期毫秒数。

  ### Added

  1. 新增文件上传参数解析，正式支持文件上传处理。

* [v1.2.10] - 2017-08-11

  ### Fixed

  * windows系统node v6.3版本无法获取箭头函数赋值给一个变量时的函数名

* [v1.2.9] - 2017-08-02

  ### Changed

  * 路由无 :param 的优先匹配，可同时配置 /news/publih 和 /news/:id，而不会产生冲突
  * res.forward 能够转到任何外域名网址(http://或https://开头的完整地址)
  * 其他一些内部逻辑调整

  ### Added
  * 增加response stage做最后响应阶段，原来的 requestProxy 和 render 不做最终响应
  * res.html 保存渲染模板后的html
  * requestProxy 增加apiInfo数据记录

* [v1.2.5 ~ v1.2.6] - 2017-06-02

  ### Changed

  * modify stages order, fix interceptor can't get router param.

* [v1.2.4] - 2017-05-24

  ### Changed

  * when interceptor's series is true, interceptor apiData can be geted in router functional config option with res.apiData .

  ### Added

  * add res.locals.apiDataKeys to help get data keys in template file.