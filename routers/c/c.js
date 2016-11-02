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
      'api': 'http://www.sipin.com',
      'proxy': true
    },
    'post': {
      'api': 'http://www.xunlei.com',
      'proxy': true
    }
  },
  '/proxy-api': {
    'get': {
      'api': [
        {
          'api': 'http://shop.mogujie.com/ajax/pc.rate.ratelist/v1',
          'name': 'comments',
          'cache': true,
          query() {
            return {
              'pageSize': 20,
              'sort': 1,
              'isNewDetail': 1,
              'itemId': '1jzbype',
              'type': 1
            };
          },
          handle(data) {
            return data.getValue('data.list');
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
