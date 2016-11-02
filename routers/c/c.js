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
  },
  '/proxy-api': {
    'get': {
      'api': [{
        'api': 'http://www.sipin.com/api/region/region',
        'name': 'region',
        'cache': true,
        handle(data) {
          return data.getValue('data.region');
        }
      },
        'http://113.108.139.178:9190/user/getUserInfo'
      ],
      'timeout': 1000,
      handle(data) {
        this.view = 'proxy';
        return data;
      }
    }
  }
};
