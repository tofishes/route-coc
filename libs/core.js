const glob = require('glob');
const swig = require('swig');

const memoryCache = require('../utils/memory-cache');
const parseMultiName = require('../utils/parse-multi-name');
const parseRouter = require('./parse-router');
const Stage = require('./stage');

const pageInfo = require('../stages/page-info');
const matchRouter = require('../stages/match-router');
const requestProxy = require('../stages/request-proxy');
const handleInterceptor = require('../stages/handle-interceptor');
const handleRouter = require('../stages/handle-router');
const runTask = require('../stages/run-task');
const getViewPath = require('../stages/get-view-path');
const render = require('../stages/render');
const initHttpRequest = require('../stages/init-http-request');

const pwd = process.cwd();
const defaultRouterDir = `${pwd}/routers`;
const defaultInterceptorDir = `${pwd}/interceptors`;
const defaultViewDir = `${pwd}/views`;

function loadRoutes(dir) {
  const map = {};
  const files = glob.sync(`${dir}/**/*.js`);

  files.forEach(file => {
    const routesPart = require(file); // eslint-disable-line global-require
    Object.assign(map, parseMultiName(routesPart));
  });

  return map;
}

/**
 * 框架定名 route-coc，基于express.js用于简化前端页面直出流程的框架
 * coc 意为 约定优于配置（convention over configuration）
 *
 * @param  {[type]} app  express app对象
 * @param  {[type]} args 配置对象
 * args.routerDir: 路由配置目录
 * args.handleAPI: 预处理api地址
 * @return {[type]}      [description]
 */
module.exports = (app, args = {}) => {
  const defaultStages = [
    pageInfo, matchRouter, initHttpRequest, requestProxy,
    handleInterceptor, handleRouter, runTask, getViewPath, render
  ];
  // mount see more @ http://expressjs.com/en/4x/api.html#path-examples
  const {
    routerDir = defaultRouterDir, // 路由目录
    viewExclude = ['**/include/**'], // 排除自动渲染模板的目录
    stages = defaultStages,       // 默认stage列表
    mount = '/'                   // 程序挂载路径，类型符合express path examples
  } = args;

  const interceptorMap = loadRoutes(defaultInterceptorDir);
  const routerMap = loadRoutes(routerDir);
  const routers = parseRouter(routerMap);
  const interceptors = parseRouter(interceptorMap);

  // 存储
  app.set('interceptorMap', interceptorMap);
  app.set('interceptors', interceptors);
  app.set('routerMap', routerMap);
  app.set('routers', routers);
  app.set('viewExclude', viewExclude);
  app.engine('swig', swig.renderFile);
  if (!app.get('views')) {
    app.set('views', defaultViewDir);
  }
  // 设置引擎默认后缀
  if (!app.get('view engine')) {
    app.set('view engine', 'swig');
  }
  // 设置接口数据缓存方法
  if (!app.get('apiDataCache')) {
    app.set('apiDataCache', memoryCache);
  }
  // 设置接口地址处理方法
  if (!app.get('handleAPI')) {
    app.set('handleAPI', url => url);
  }

  Object.keys(args).map(name => {
    app.set(name, args[name]);
    return name;
  });

  const stage = new Stage(stages);

  stage.set('app', app);

  app.use(mount, (req, res, next) => {
    stage.handle(req, res, next);
  });

  return stage;
};
