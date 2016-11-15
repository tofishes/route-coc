module.exports = {
  '/hello/:username, /member/:id': {
    'get': {
      'api': 'http://www.baidu.com',
      query(req) {
        return req.query;
      },
      handle(data, req) {
        return { 'username': req.query.username };
      },
      'view': 'hello'
    }
  },
  '/forward/to/self': {
    'get': {
      handle(data, req, res) {
        res.forward('/forward/to/self');
      }
    }
  }
};
