const handleConfig = require('./handle-router').handleConfig;
/**
 * 处理拦截器配置
 * 拦截器有两种：一种预处理，一种并处理
 * 拦截器处理在匹配router后进行，可以得到参数
 * 拦截器需排除静态资源，根据是否包含点符号
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function match(pathname, interceptors) {
  return interceptors.filter(interceptor => {
    const route = interceptor.route;
    const matchPath = interceptor.pathRegx.exec(pathname);
    const routeExt = ~route.indexOf('.');
    const ignoreExt = routeExt || !~pathname.indexOf('.');

    return matchPath && ignoreExt;
  });
}
function handleInterceptor(req, res, next) {
  if (req.xhr && !this.get('interceptXhr')) {
    return next();
  }

  const pathname = req.pathname;
  const interceptors = match(pathname, this.get('interceptors'));

  if (!interceptors.length) {
    return next();
  }

  req.interceptors = interceptors.map(interceptor => handleConfig(interceptor, req, res));

  return next();
}

module.exports = handleInterceptor;
