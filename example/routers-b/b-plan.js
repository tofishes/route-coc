module.exports = {
  '/hello/*': {
    'get': {
      handle(data, req, res) {
        res.send(req.pathname);
      }
    }
  },
  '/comments': {
    'get': {
      api: 'http://localhost:8080/api/comment/list',
      view: 'b-plan/comments'
    }
  }
};
