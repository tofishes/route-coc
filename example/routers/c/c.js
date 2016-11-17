const log = require('t-log');

module.exports = {
  '/hello': {
    'get': (req, res) => {
      log.debug('query:', req.query, req.body, req.param);
      res.send('hello world');
      return false;
    }
  },
  '/redirect': {
    'get': {
      handle(data, req, res) {
        res.redirect('www.baidu.com');
      }
    }
  },
  '/proxy': {
    'get': {
      'api': 'http://www.baidu.com',
      'proxy': true
    }
  },
  '/comment/list': {
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
        }
      ],
      'timeout': 1000,
      handle(data) {
        this.view = 'comments';
        return data;
      }
    }
  },
  '/test/intercept/series/comments': {
    'get': {
      handle(data, req, res) {
        res.send(!!data.getValue('comments.data.list', []).length);
      }
    }
  }
};
