const request = require('../utils/request');
const valueChain = require('../utils/value-chain');
const methods = ['get', 'post', 'put', 'delete'];

function getRequest() {
  const config = this.httpRequestConfig || {};

  request.methods = methods.map(method => {
    request[method] = (options, complete) => request(config)[method](options, complete);
    return method;
  });

  return request;
}

module.exports = function initHttpRequest(req, res, next) {
  req.httpRequest = getRequest;
  req.apisTask = {};

  valueChain.set(res.apiData);

  next();
};
