module.exports = {
  '/test/forward/*': {
    handle(data, req, res) {
      res.forward('/proxy');
      return data;
    }
  },
  '/test/intercept/series/*': {
    'api': 'http://localhost:8080/api/comment/list',
    'series': true,
    'name': 'comments',
    cache() {
      return true;
    },
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
      return data;
    }
  },
  '/test/ext/a.jpg': {
    handle(data, req, res) {
      res.send('has intercept ext');
    }
  },
  '/test/ext/*': {
    handle(data, req, res) {
      res.send('no intercept ext');
    }
  },
  '/intercept/api/wrong/*': {
    'api': '/api/is/wrong',
    'series': true
  },
  '/intercept/has/redirect/*': {
    handle(data, req, res) {
      res.status(200).send('interceptor response');
    }
  },
  '/intercept/has/forward/*': {
    handle(data, req, res) {
      res.forward('/hello');
    }
  }
};
