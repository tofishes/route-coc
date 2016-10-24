const log = require('t-log');

module.exports = {
  '/hello': {
    'get': (req, res) => {
      log.debug('query:', req.query, req.body, req.param);
      res.send('hello world');
      return false;
    }
  },
  '/proxy': {
    'get': {
      'api': 'http://www.baidu.com',
      'proxy': true
    },
    'post': {
      'api': 'http://www.xunlei.com',
      'proxy': true
    }
  }
};
