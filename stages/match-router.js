/**
 * 匹配route
 * 两种匹配方法： 1、用filter得到全部匹配； 2、for循环得到一个匹配就终止；
 * 目前按第二种方式
 */
function getParam(pathInfo, paramKeys) {
  // 得到参数
  // https://github.com/expressjs/express/blob/master/lib/router/layer.js
  const param = {};

  for (let j = 1; j < pathInfo.length; j++) {
    const key = paramKeys[j - 1];
    const prop = key.name;
    const val = decodeURIComponent(pathInfo[j]);

    if (val !== 'undefined') {
      param[prop] = val;
    }
  }

  return param;
}

function match(pathname, routers) {
  for (let i = 0, l = routers.length, router, pathInfo; i < l; i++) {
    router = routers[i];
    pathInfo = router.pathRegx.exec(pathname);

    if (pathInfo) {
      const param = getParam(pathInfo, router.paramKeys);
      return { router, param };
    }
  }

  return {};
}

function matchRouter(req, res, next) {
  const pathname = req.path;
  const routers = req.app.get('routers');

  const { router = {}, param = {} } = match(pathname, routers);

  req.router = router[req.method.toLowerCase()];
  req.param = param;

  Object.assign(req.query, param);
  // 若未使用body-parser，req.body为undefined
  if (req.body) {
    Object.assign(req.body, param);
  }

  return next();
}

module.exports = matchRouter;
