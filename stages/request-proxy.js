/**
 * 代理请求，针对ajax直接请求api(未配置router)，和router设置了proxy属性
 * 实践：
 * 1、ajax直接请求了未配置为router的后端api路径，可直接转发给后端api
 * 2、router设置了proxy属性为true，例如 验证码接口，需转发后端生成的captcha图片
 *
 * @param  {[type]} req    [description]
 * @param  {[type]} res    [description]
 * @return {[type]}        [description]
 */
const log = require('t-log');
const parseURLMethod = require('../utils/parse-url-method');

function requestProxy(req, res, next) {
  const router = req.router;
  const xhrProxy = !router && req.xhr;
  const routeProxy = router && router.proxy;

  let url = req.pathname; // pathname 支持forward代理
  const isDomainProxy = url.startsWith('http') && res.forwardSent;

  // 既不是ajax，又不是代理
  if (!routeProxy && !xhrProxy && !isDomainProxy) {
    next();
    return;
  }

  let method = req.method.toLowerCase();

  // 如果是get请求，为什么不用redirect跳转:
  // 避免redirect url不支持对外访问
  if (routeProxy && router.api) {
    const urlMethod = parseURLMethod(router.api, method);

    url = urlMethod.url;
    method = urlMethod.method;
  }

  url = this.get('handleAPI')(url, req);

  const request = req.httpRequest();
  const options = {
    url,
    'qs': req.query,
    'body': req.body
  };

  // 记录apiInfo数据
  res.apiInfo.proxy = {
    api: req.pathname,
    query: req.query,
    body: req.body
  };

  const timer = log.time();

  res.proxyResoponse = request[method](options).on('response', response => {
    res.set(response.headers);

    res.apiInfo.proxy.headers = response.headers;
    res.apiInfo.proxy.consumeTime = timer.end();
    // 回调中跳转，性能一样，都会等待代理响应后才发起客户端响应
    next.to('beforeResponse');
  });
}

module.exports = requestProxy;
