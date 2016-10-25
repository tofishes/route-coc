const getRequest = require('../utils/request.js');

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
function requestProxy(req, res, next) {
  const handleAPI = req.app.get('handleAPI');
  const router = req.router;
  const xhrProxy = !router && req.xhr;
  const routeProxy = router && router.proxy;

  // 既不是ajax，又不是代理
  if (!routeProxy && !xhrProxy) {
    next();
    return;
  }

  let url = req.path;
  if (routeProxy) {
    url = router.api;
  }
  if (handleAPI) {
    url = handleAPI(url, req);
  }

  const method = req.method.toLowerCase();
  const options = {
    url,
    'qs': req.query,
    'body': req.body
  };

  getRequest()[method](options).on('response', response => {
    res.set(response.headers);
  })
  .pipe(res);

  res.hasSent = true;
}

module.exports = requestProxy;
