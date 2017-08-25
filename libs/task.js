const querystring = require('querystring');
const async = require('async');
const log = require('t-log');
const valueChain = require('value-chain');
const env = require('../utils/env');
const timeRecord = require('../utils/time-record');
const parseURLMethod = require('../utils/parse-url-method');
const typeOf = require('../utils/typeof');

function isFunc(obj) {
  return typeOf(obj).is('function');
}
function isString(obj) {
  return typeOf(obj).is('string');
}

class Task {
  constructor(isSeries) {
    this.tasks = [];
    this.props = {};
    this.mode(isSeries);
  }

  context(context) {
    this.props.context = context;
    return this;
  }

  mode(isSeries) {
    this.props.mode = isSeries ? 'series' : 'parallel';
    return this;
  }

  add(task) {
    this.tasks.push(task);
    return this;
  }

  error(handle) {
    this.onerror = handle;
    return this;
  }

  run(done) {
    const onerror = this.onerror;

    if (!this.tasks.length) {
      done();
      return this;
    }

    async[this.props.mode](this.tasks, (error, results) => {
      if (error && onerror) {
        return onerror(error);
      }

      return done(results);
    });

    return this;
  }

  // api类型任务
  addApiTask(apiItem, config) {
    const { req, res } = this.props.context;
    const request = req.httpRequest();

    const excute = func => {
      if (isFunc(func)) {
        return func.call(config, req, res);
      }

      return func;
    };

    const query = config.query || req.query;
    const body = config.body || req.body;
    const name = config.name;
    let cache = config.cache;

    function action(callback) {
      const timer = log.time();

      let apiConfig = apiItem;

      if (isString(apiItem)) {
        apiConfig = { 'api': apiItem };
      } else if (isFunc(apiItem)) {
        apiConfig = excute(apiItem);

        if (!apiConfig) {
          return callback();
        }

        if (isString(apiConfig)) {
          apiConfig = { 'api': apiConfig };
        }
      }

      // 默认为对象类型，合并第一级配置的参数处理器
      apiConfig = Object.assign({ query, body, name, cache }, apiConfig);

      // 参数处理
      apiConfig.query = excute(apiConfig.query);
      apiConfig.body = excute(apiConfig.body);
      // 缓存
      apiConfig.cache = excute(apiConfig.cache);
      // 数据名
      if (!apiConfig.name) {
        apiConfig.name = req.stage.get('apiDataName').call(config, apiConfig.api);
      }

      const dataName = apiConfig.name;
      cache = apiConfig.cache;

      const urlMethod = parseURLMethod(apiConfig.api, req.method);
      let url = urlMethod.url;
      const cacheKey = url + querystring.stringify(apiConfig.query);

      const handleAPI = req.stage.get('handleAPI');
      url = handleAPI(url, req);

      apiConfig.method = urlMethod.method;

      res.apiInfo[dataName] = apiConfig;

      let expires = cache;
      if (cache === true) {
        expires = Number.MAX_VALUE;
      }

      if (cache && !timeRecord.isExpired(cacheKey, expires)) {
        const getCache = req.stage.get('apiDataCache');
        let result = getCache.call(config, cacheKey);

        if (result) {
          const consumeTime = timer.end();
          const resBody = result;
          const headers = { from: 'cache' };
          Object.assign(res.apiInfo[dataName], { consumeTime, headers, resBody });

          if (apiConfig.handle) {
            result = apiConfig.handle.call(config, result, req, res);
          }

          res.apiData[dataName] = valueChain.set(result);

          return callback(null, result);
        }
      }

      const complete = (error, response, resBody) => {
        const consumeTime = timer.end();
        const headers = response && response.headers;
        Object.assign(res.apiInfo[dataName], { consumeTime, headers, resBody });

        let result = resBody;
        let willCache = !!cache;

        if (error) {
          willCache = false;
          let code = 503;
          let message = `API ${url} Service Unavailable.
            ${env.isProduction ? '' : error.message}`;

          if (error.code === 'ETIMEDOUT') {
            code = 504;
            message = `API ${url} Request Timeout.`;
          }

          result = { code, message, resBody, error };
        } else if (!response || response.statusCode !== 200) {
          willCache = false;
          result = {
            code: response ? response.statusCode : 500,
            message: 'response exception, not 200 ok.',
            resBody
          };
        }
        // 必须缓存原始数据，否则不同路由的数据共享在handle时会出问题
        if (willCache) {
          const setCache = req.stage.get('apiDataCache');
          setCache.call(config, cacheKey, result);
          timeRecord.set(cacheKey);
        }

        if (apiConfig.handle) {
          result = apiConfig.handle.call(config, valueChain.set(result), req, res);
        }

        res.apiData[dataName] = valueChain.set(result);

        return callback(error, result);
      };

      return request[apiConfig.method]({
        body: apiConfig.body,
        qs: apiConfig.query,
        url
      }, complete);
    }

    this.add(action);

    return this;
  }
}

module.exports = Task;
