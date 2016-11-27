const async = require('async');
const log = require('t-log');
const env = require('../utils/env');
const valueChain = require('value-chain');

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
  addApiTask(apiConfig) {
    const { req, res } = this.props.context;
    const methodMark = ':';
    const request = req.httpRequest();

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

    const handleAPI = req.stage.get('handleAPI');
    url = handleAPI(url, req);

    apiConfig.method = method;

    function action(callback) {
      const timer = log.time();

      res.apiInfo[dataName] = apiConfig;

      if (cache) {
        const getCache = req.stage.get('apiDataCache');
        let result = getCache.call(req.router, url);

        if (result) {
          res.apiInfo[dataName].consumeTime = timer.end();

          if (apiConfig.handle) {
            result = apiConfig.handle.call(req.router, result, req, res);
          }

          res.apiData[dataName] = valueChain.set(result);

          callback(null, result);
          return;
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

          result = { code, message, resBody };
        } else {
          if (!response || response.statusCode !== 200) {
            willCache = false;
            result = {
              code: response ? response.statusCode : 500,
              message: 'response exception, not 200 ok.',
              resBody
            };
          }
        }
        // 必须缓存原始数据，否则不同路由的数据共享在handle时会出问题
        if (willCache) {
          const setCache = req.stage.get('apiDataCache');
          setCache.call(req.router, url, result);
        }

        if (apiConfig.handle) {
          result = apiConfig.handle.call(req.router, result, req, res);
        }

        res.apiData[dataName] = valueChain.set(result);

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
