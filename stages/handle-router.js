const typeOf = require('../utils/typeof');
const Task = require('../libs/task');

function isFunc(obj) {
  return typeOf(obj).is('function');
}
function isString(obj) {
  return typeOf(obj).is('string');
}
function handleConfig(configArg, req, res) {
  let config = configArg;

  if (!config) {
    return;
  }

  if (isFunc(config)) {
    config = config(req, res);
  }

  // 无api配置，直接执行下一个stage
  if (!config.api) {
    if (config.handle) {
      res.apiData = config.handle(res.apiData, req, res);
    }

    return;
  }

  let api = config.api;
  // 统一api配置数据结构
  // api可以是字符串，字符串数组，对象混合字符串数组，函数(返回前面3中类型数据)
  if (isFunc(api)) {
    api = api.call(config, req, res);
  }
  // 统一格式
  const query = config.query;
  const body = config.body;
  const name = config.name;
  const cache = config.cache;
  const handle = config.handle;
  const excute = func => func.call(config, req, res);

  if (isString(api)) {
    api = [{ api, handle }];
    // 移除，避免在task完成后二次执行
    delete config.handle;
  }

  if (! Array.isArray(api)) {
    throw new TypeError('The type of api must be String or Array');
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
  api.map(item => {
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
    // TODO 通过app.set自定义处理数据名方法
    if (!apiItem.name) {
      apiItem.name = apiItem.api.substr(apiItem.api.lastIndexOf('/') + 1);
    }
    // 缓存
    if (isFunc(apiItem.cache)) {
      apiItem.cache = excute(apiItem.cache);
    }

    // TODO 通过app.set自定义api任务方法
    return task.addApiTask(apiItem);
  });

  req.apisTask[taskName] = task;
}
/**
 * 处理路由
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function handleRouter(req, res, next) {
  handleConfig(req.router, req, res);

  return next();
}
handleRouter.handleConfig = handleConfig;

module.exports = handleRouter;
