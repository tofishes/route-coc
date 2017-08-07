* [v1.2.9] - 2017-08-02

  ### Changed

  * 路由无 :param 的优先匹配，可同时配置 /route/b 和 /route/:id，而不会产生冲突
  * res.forward 能够转到任何外域名网址(http://或https://开头的完整地址)

  ### Added
  * 增加response stage做最后响应阶段，原来的 request-proxy 和 render 不做最终响应
  * next.to('stage name') 直接跳到某个阶段 ? 少了next一些判断
  * res.html 保存渲染模板后的html
  * requestProxy 记录一些apiInfo数据

* [v1.2.5 ~ v1.2.6] - 2017-06-02

  ### Changed

  * modify stages order, fix interceptor can't get router param.

* [v1.2.4] - 2017-05-24

  ### Changed

  * when interceptor's series is true, interceptor apiData can be geted in router functional config option with res.apiData .

  ### Added

  * add res.locals.apiDataKeys to help get data keys in template file.