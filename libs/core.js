const glob = require('glob');
const log = require('t-log');

const parseMultiName = require('../utils/parse-multi-name');
const parseRouter = require('./parse-router');
const Stage = require('./stage');

const pageInfo = require('../stages/page-info');
const matchRouter = require('../stages/match-router');
const requestProxy = require('../stages/request-proxy');

const pwd = process.cwd();
const defaultRouterDir = `${pwd}/routers`;

function loadRoutes(dir) {
  const map = {};
  const files = glob.sync(`${dir}/**/*.js`);

  files.forEach(file => {
    const routesPart = require(file); // eslint-disable-line global-require
    Object.assign(map, parseMultiName(routesPart));
  });

  return map;
}

// const middleware = (req, res, next) => next();
// coc.use(parseRouter);
// coc.use(middleware);
// coc.use(autoRender);
// coc.use(render);

/**
 * 配置routes目录，默认是当前项目下的routes目录
 * @param  {[type]} app  express app对象
 * @param  {[type]} args 配置对象
 * args.routerDir: 路由配置目录
 * args.handleAPI: 预处理api地址
 * @return {[type]}      [description]
 */
module.exports = (app, args) => {
  const defaultStages = [pageInfo, matchRouter, requestProxy];
  const { routerDir = defaultRouterDir, stages = defaultStages } = args;

  const routerMap = loadRoutes(routerDir);
  const routers = parseRouter(routerMap);

  // 存储
  app.set('routerMap', routerMap);
  app.set('routers', routers);

  Object.keys(args).map(name => {
    app.set(name, args[name]);
    return name;
  });

  const stage = new Stage(stages);
  // 匹配当前请求对应的路由，并解析出param
  stage.set('app', app);

  app.use((req, res, next) => {
    stage.handle(req, res, next);
  });

  return stage;
};
