const request = require('request');
/**
 * 获取一个request对象，用于请求接口
 * 基于node-request模块
 * @param  {[type]} options request配置
 * @return {[type]}         request实例对象
 */
function getRequest(options = {}) {
  const defaults = {
    'headers': {},
    'cert': null,
    'strictSSL': false,
    'timeout': 10 * 1000, // milliseconds 2秒
    'json': true
  };

  Object.assign(defaults, options);

  return request.defaults(defaults);
}

getRequest.methods = ['get', 'post', 'put', 'delete'].map(method => {
  getRequest[method] = (options, complete) => getRequest()[method](options, complete);
  return method;
});

module.exports = getRequest;
