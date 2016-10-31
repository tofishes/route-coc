const typeOf = require('../utils/typeof');
const Task = require('../libs/task');

function isFunc(obj) {
  return typeOf(obj).is('function');
}
function isString(obj) {
  return typeOf(obj).is('string');
}
/**
 * 分析路由，处理参数，发起请求得到数据并存入res.apiData
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
module.exports = function handleRouter(req, res, next) {
  let router = req.router;

  if (!router) {
    return next();
  }

  if (isFunc(router)) {
    router = router(req, res);
  }

  let api = router.api;

  // 无api配置，直接执行下一个stage
  if (!api) {
    if (router.handle) {
      res.locals.dataset = router.handle(req, res);
    }

    return next();
  }
  // 统一api配置数据结构
  // api可以是字符串，字符串数组，对象混合字符串数组，函数(返回前面3中类型数据)
  if (isFunc(api)) {
    api = api.call(router, req, res);
  }
  // 统一格式
  const query = router.query;
  const body = router.body;
  const name = router.name;
  const cache = router.cache;
  const excute = func => func.call(router, req, res);

  if (isString(api)) {
    api = [{ api }];
  }

  if (! Array.isArray(api)) {
    throw new TypeError('The type of router.api must be String or Array');
  }

  const task = new Task(router.series).context({ req, res, next });
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

  return task.error(() => {
    next();
  }).run(() => {
    if (router.handle) {
      res.apiData = router.handle(res.apiData, req, res);
    }
    next();
  });
};
