const glob = require('glob');
const nunjucks = require('nunjucks');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const env = require('../utils/env');
const memoryCache = require('../utils/memory-cache');
const parseMultiName = require('../utils/parse-multi-name');
const parseRouter = require('./parse-router');
const Stage = require('./stage');

const pageInfo = require('../stages/page-info');
const initHttpRequest = require('../stages/init-http-request');
const matchRouter = require('../stages/match-router');
const upload = require('../stages/upload');
const handleInterceptor = require('../stages/handle-interceptor');
const handleRouter = require('../stages/handle-router');
const requestProxy = require('../stages/request-proxy');
const runTask = require('../stages/run-task');
const getViewPath = require('../stages/get-view-path');
const render = require('../stages/render');
const response = require('../stages/response');
// 占位流程，使response，requestRroxy的before after filter有效
function beforeResponse(req, res, next) {
  next();
}
function beforeRequestProxy(req, res, next) {
  next();
}

const pwd = process.cwd();
const defaultRouterDir = `${pwd}/routers`;
const defaultInterceptorDir = `${pwd}/interceptors`;
const defaultViewDir = `${pwd}/views`;
const defaultUploadDir = `${pwd}/uploads`;

function loadRoutes(dir) {
  const map = {};
  const files = glob.sync(`${dir}/**/*.js`);

  files.forEach(file => {
    const routesPart = require(file); // eslint-disable-line
    Object.assign(map, parseMultiName(routesPart));
  });

  return map;
}

function simpleApiDataName(api) {
  return api.substr(api.lastIndexOf('/') + 1);
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
    pageInfo, matchRouter, upload, initHttpRequest, handleInterceptor, handleRouter,
    beforeRequestProxy, requestProxy, runTask, getViewPath, render, beforeResponse, response
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
    apiDataName = simpleApiDataName,        // 接口数据名方法，默认为获取api地址最后一个/后面的单词名
    handleAPI = url => url,                 // router.api地址预处理方法，默认返回自身
    ajaxCache = true                        // 是否允许缓存ajax响应结果，默认允许缓存
  } = args;

  const interceptorMap = loadRoutes(interceptorDir);
  const routerMap = loadRoutes(routerDir);
  const routers = parseRouter(routerMap);
  const interceptors = parseRouter(interceptorMap, interceptor => {
    interceptor.type = 'interceptor';
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

  // 存储
  stage.set('interceptorMap', interceptorMap);
  stage.set('interceptors', interceptors);
  stage.set('routerMap', routerMap);
  stage.set('routers', routers);
  stage.set('views', viewDir);
  stage.set('viewExclude', viewExclude);
  // 保存接口数据缓存方法
  stage.set('apiDataCache', apiDataCache);
  // 保存接口数据名方法
  stage.set('apiDataName', apiDataName);
  // 保存接口地址处理方法
  stage.set('handleAPI', handleAPI);

  stage.set('ajaxCache', ajaxCache);
  stage.set('uploadDir', defaultUploadDir);

  // 添加默认模板引擎
  const nunjucksEnv = nunjucks.configure(viewDir, {
    autoescape: true,
    noCache: env.isDev,
    watch: env.isDev
  });
  stage.set('nunjucks', nunjucks);
  stage.set('nunjucksEnv', nunjucksEnv);
  // 设置引擎默认后缀
  stage.set('view engine', 'njk');
  stage.engine('njk', nunjucksEnv.render.bind(nunjucksEnv));

  app.use(mount, (req, res, next) => {
    stage.handle(req, res, next);
  });

  return stage;
};
