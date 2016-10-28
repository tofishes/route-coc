const async = require('async');
const log = require('t-log');
const request = require('../utils/request');
const env = require('../utils/env');

class Task {

  constructor(isSeries) {
    this.tasks = [];
    this.mode = isSeries ? 'series' : 'parallel';
  }

  context(context) {
    this.context = context;
    return this;
  }

  add(task) {
    this.tasks.push(task);
    return this;
  }

  error(handle) {
    this.error = handle;
  }

  run(done) {
    const onerror = this.error;

    async[this.mode](this.tasks, (error, results) => {
      done(results);

      if (error && onerror) {
        onerror(error);
      }
    });
    return this;
  }

  // api类型任务
  addApiTask(apiConfig) {
    const { req, res, next } = this.context;
    const methodMark = ':';

    const qs = apiConfig.query;
    const body = apiConfig.body;
    const dataName = apiConfig.name;
    const cache = apiConfig.cache;

    let method = req.method.toLowerCase();
    let url = apiConfig.api;

    // 提取api中配置的方法
    // 例如 api: 'post:/api/adress'
    const markIndex = url.indexOf(methodMark);

    if (~markIndex) {
      const prefix = url.substr(0, markIndex);
      // 是支持的方法
      if (~request.methods.indexOf(prefix)) {
        method = prefix;
        url = url.substr(markIndex + 1);
      }
    }

    const handleAPI = req.app.get('handleAPI');
    url = handleAPI(url, req);

    function action(callback) {
      const timer = log.time();

      if (cache) {
        const getCache = req.app.get('apiDataCache');
        const result = getCache.call(req.router, url);

        if (result) {
          const consumeTime = timer.end();

          result.apiInfo.consumeTime = consumeTime;
          res.apiData[dataName] = result;

          callback(null, result);
          return;
        }
      }

      const complete = (error, response, resBody) => {
        const consumeTime = timer.end();
        let result = resBody || {};

        if (error) {
          result.code = 503;
          result.message = `API ${url} Service Unavailable.
            ${env.isProduction ? '' : error.message}`;

          if (error.code === 'ETIMEDOUT') {
            result.code = 504;
            result.message = `API ${url} Request Timeout.`;
          }
        } else {
          if (!response || response.statusCode !== 200) {
            result = {
              code: response ? response.statusCode : 500,
              message: 'response exception, not 200 ok.',
              resBody
            };
          }
        }

        if (apiConfig.handle) {
          result = apiConfig.handle.call(req.router, result, req, res, next);
        }

        result.apiInfo = apiConfig;
        result.apiInfo.consumeTime = consumeTime;

        res.apiData[dataName] = result;

        if (cache) {
          const setCache = req.app.get('apiDataCache');
          setCache.call(req.router, url, result);
        }

        return callback(error, result);
      };

      request[method]({
        body,
        qs,
        url
      }, complete);
    }

    this.add(action);

    return this;
  }
}

module.exports = Task;
