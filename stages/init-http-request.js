const request = require('../utils/request');
const methods = require('../utils/parse-url-method').methods;

function getRequest() {
  const req = this;
  const config = req.httpRequestConfig || {};

  if (req.router && req.router.timeout) {
    config.timeout = req.router.timeout;
  }

  const httpRequest = request(config);

  request.methods = methods.map(method => {
    request[method] = (options, complete) => httpRequest[method](options, complete);
    return method;
  });

  return request;
}

module.exports = function initHttpRequest(req, res, next) {
  req.httpRequest = getRequest;
  req.apisTask = {};
  // 保证在router.handle等处自处理响应时有效
  const disablePageCache = req.router && req.router.pageCache === false;
  const disableAjaxCache = req.xhr && this.get('ajaxCache') === false;

  res.disableCache(disablePageCache || disableAjaxCache);

  next();
};
