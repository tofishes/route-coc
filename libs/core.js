const glob = require('glob');
const swig = require('swig');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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
    routerDir = defaultRouterDir,           // 路由目录
    interceptorDir = defaultInterceptorDir, // 拦截器目录
    viewDir = defaultViewDir,               // 视图模板目录
    viewExclude = ['**/include/**'],        // 排除自动渲染模板的目录，采用glob匹配规则
    stages = defaultStages,                 // 默认stage列表
    mount = '/',                            // 程序挂载路径，默认为根路径，类型符合express path examples
    apiDataCache = memoryCache,             // 接口数据缓存方法，默认存储于内存中
    handleAPI = url => url                  // router.api地址预处理方法，默认返回自身
  } = args;

  const interceptorMap = loadRoutes(interceptorDir);
  const routerMap = loadRoutes(routerDir);
  const routers = parseRouter(routerMap);
  const interceptors = parseRouter(interceptorMap, interceptor => {
    interceptor.type = 'interceptor';
  });

  // 存储
  app.set('interceptorMap', interceptorMap);
  app.set('interceptors', interceptors);
  app.set('routerMap', routerMap);
  app.set('routers', routers);
  app.set('views', viewDir);
  app.set('viewExclude', viewExclude);
  app.engine('swig', swig.renderFile);
  swig.setDefaults({
    loader: swig.loaders.fs(viewDir)
  });
  // 设置引擎默认后缀
  if (!app.get('view engine')) {
    app.set('view engine', 'swig');
  }
  // 设置接口数据缓存方法
  app.set('apiDataCache', apiDataCache);
  // 设置接口地址处理方法
  app.set('handleAPI', handleAPI);

  Object.keys(args).map(name => {
    app.set(name, args[name]);
    return name;
  });

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(cookieParser());
  // nginx代理转发后，要获取正确host需要：
  app.set('trust proxy', 'loopback');
  app.set('query parser', 'extended');

  const stage = new Stage(stages);

  stage.set('app', app);
  stage.set('swig', swig);

  app.use(mount, (req, res, next) => {
    stage.handle(req, res, next);
  });

  return stage;
};
