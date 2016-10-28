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
        'api': 'http://113.108.139.178:9590/front/area/getAllHotArea',
        'cache': true
      },
        'http://113.108.139.178:9190/user/getUserInfo'
      ],
      handle(data) {
        log.debug(data, '----');
        this.view = 'proxy';
        return data;
      }
    }
  }
};
