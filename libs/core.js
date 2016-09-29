const glob = require('glob');
const log = require('t-log');

const parseMultiName = require('../utils/parse-multi-name');
const parseRouter = require('./parse-router');
const matchRouter = require('./match-router');
const typeOf = require('../utils/typeof');

const pwd = process.cwd();
const defaultRouterDir = `${pwd}/routes`;

function loadRoutes(dir) {
  const map = {};
  const files = glob.sync(`${dir}/**/*.js`);

  files.forEach(file => {
    const routesPart = require(file); // eslint-disable-line global-require
    Object.assign(map, parseMultiName(routesPart));
  });

  return map;
}

function getMethod(req = { method: 'get' }) {
  return req.method.toLowerCase();
}

function isFunc(target) {
  return typeOf(target).is('function');
}

// const middleware = (req, res, next) => next();
// coc.use(parseRouter);
// coc.use(middleware);
// coc.use(autoRender);
// coc.use(render);


/**
 * 配置routes目录，默认是当前项目下的routes目录
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 * args.routerDir: 路由配置目录
 */
module.exports = (...args) => {
  const { routerDir = defaultRouterDir } = args;

  const routerMap = loadRoutes(routerDir);
  const routers = parseRouter(routerMap);

  log.debug('routerMap: \n', routerMap);

  return (req, res, next) => {
    const isXhr = req.xhr;
    const method = getMethod(req);
    const pathname = req.path;
    const { query = {}, body = {} } = req;

    const tasks = [];
    const { router, param = {} } = matchRouter(pathname, routers);

    req.param = param;
    Object.assign(query, param);
    Object.assign(body, param);

    log.warn(req, '***');

    // 中间件处理，比如匹配某些规则： ^/hello

    if (router) {
      let routerInfo = router[method];

      if (!routerInfo) {
        throw new Error(`405 ${method} Method Not Allowed`);
      }

      if (isFunc(routerInfo)) {
        routerInfo = routerInfo.call(routerInfo, req, res, routerMap);

        // 返回false表示函数内部处理流程跳转
        if (routerInfo === false) {
          return false;
        }
      }

      // 是转发
      if (routerInfo.proxy) {
        return autoProxy(req, res, httpRequest, routerInfo.api);
      }
    }

    // 公共任务

    return next();
  };
};
