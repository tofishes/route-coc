const request = require('../utils/request');
const valueChain = require('value-chain');
const methods = require('../utils/parse-url-method').methods;

function disableCache(disabled) {
  if (!disabled) {
    return;
  }

  const res = this;

  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
}

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

  valueChain.set(res.apiData);

  res.disableCache = disableCache.bind(res);

  if (req.xhr) {
    const disableAjaxCache = this.get('ajaxCache') === false;
    res.disableCache(disableAjaxCache);
  }

  next();
};
