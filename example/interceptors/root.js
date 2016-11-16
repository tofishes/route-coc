module.exports = {
  '/test/forward/*': {
    handle(data, req, res) {
      res.forward('/proxy');
      return data;
    }
  },
  '/test/intercept/series/*': {
    'api': 'http://shop.mogujie.com/ajax/pc.rate.ratelist/v1',
    'series': true,
    'name': 'comments',
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
  }
};
