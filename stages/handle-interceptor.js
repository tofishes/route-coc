const handleConfig = require('./handle-router').handleConfig;
/**
 * 处理拦截器配置
 * 拦截器有两种：一种预处理，一种并处理
 * 拦截器处理在匹配router后进行，可以得到参数
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function match(pathname, interceptors) {
  return interceptors.filter(interceptor => interceptor.pathRegx.exec(pathname));
}
function handleInterceptor(req, res, next) {
  const pathname = req.pathname;
  const interceptors = match(pathname, req.app.get('interceptors'));

  if (!interceptors.length) {
    return next();
  }

  req.interceptors = interceptors.map(interceptor => handleConfig(interceptor, req, res));

  return next();
}

module.exports = handleInterceptor;
