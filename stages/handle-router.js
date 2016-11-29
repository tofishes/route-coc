const typeOf = require('../utils/typeof');
const Task = require('../libs/task');
const valueChain = require('value-chain');

function isFunc(obj) {
  return typeOf(obj).is('function');
}
function isString(obj) {
  return typeOf(obj).is('string');
}
function handleConfig(configArg, req, res) {
  const stage = req.stage;
  // 删除了config属性，这里必须克隆，避免影响原对象
  let config = configArg;
  let router = configArg;

  if (!config) {
    return router;
  }

  if (isFunc(config)) {
    config = router = config(req, res);
  }

  let api = config.api;
  const isInterceptor = config.type === 'interceptor';

  // 统一api配置数据结构
  // api可以是字符串，字符串数组，对象混合字符串数组，函数(返回前面3中类型数据)
  if (isFunc(api)) {
    api = api.call(config, req, res);
  }

  // 无api配置，直接执行下一个stage
  if (!api) {
    if (isInterceptor && config.handle) {
      const data = config.handle(res.apiData, req, res);

      if (data) {
        valueChain.set(data);
      }

      if (config.name) {
        res.apiData[config.name] = data;
      } else {
        res.apiData = data || res.apiData;
      }
    }
    return config;
  }

  // 统一格式
  const query = config.query;
  const body = config.body;
  const name = config.name;
  const cache = config.cache;
  const excute = func => func.call(config, req, res);
  // 如果是拦截器，需要把handle合并进来
  // 拦截器api为非字符串型时，仅支持数组项内的handle，不支持全局handle
  if (isString(api)) {
    const handle = isInterceptor ? config.handle : null;
    api = [{ api, handle }];
  }

  if (! Array.isArray(api)) {
    throw new TypeError('The type of api must be String or Array or Function');
  }

  const isSeries = config.series;
  const taskName = isSeries ? 'series' : 'parallel';
  let task = req.apisTask[taskName];

  if (!task) {
    task = new Task(isSeries).context({ req, res });
  }
  /*
   * 统一格式为： [{api, query, body}...]，转为apiTask， 过滤掉item为函数情况下返回false
   */
  req.apis = api.map(item => {
    let apiItem = item;

    if (isString(item)) {
      apiItem = { 'api': item };
    } else if (isFunc(item)) {
      apiItem = excute(item);

      if (!apiItem) {
        return false;
      }

      if (isString(apiItem)) {
        apiItem = { 'api': apiItem };
      }
    }

    // 默认为对象类型，合并第一级配置的参数处理器
    apiItem = Object.assign({ query, body, name, cache }, apiItem);

    // 参数处理
    if (apiItem.query) {
      apiItem.query = excute(apiItem.query);
    }
    if (apiItem.body) {
      apiItem.body = excute(apiItem.body);
    }
    // 数据名
    if (!apiItem.name) {
      apiItem.name = stage.get('apiDataName').call(router, apiItem.api);
    }
    // 缓存
    if (isFunc(apiItem.cache)) {
      apiItem.cache = excute(apiItem.cache);
    }

    task.addApiTask(apiItem);

    return apiItem;
  });

  req.apisTask[taskName] = task;

  return router;
}
/**
 * 处理路由
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function handleRouter(req, res, next) {
  req.router = handleConfig(req.router, req, res);

  return next();
}
handleRouter.handleConfig = handleConfig;

module.exports = handleRouter;
