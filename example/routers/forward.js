module.exports = {
  '/hello/:username, /member/:id': {
    'get': {
      'api': 'http://www.baidu.com',
      query(req) {
        return req.query;
      },
      handle(data, req, res) {
        if (!req.param.username) {
          res.send('no username');
          return null;
        }

        return { 'username': req.query.username };
      },
      view() {
        return 'hello';
      }
    }
  },
  '/forward/to/self': {
    'get': {
      handle(data, req, res) {
        res.forward('/forward/to/self');
      }
    }
  },
  '/forward/to/baidu-in-api': {
    'get': {
      api(req, res) {
        res.forward('http://www.baidu.com');
      }
    }
  },
  '/forward/to/baidu': {
    'get': {
      handle(data, req, res) {
        res.forward('https://www.baidu.com');
      }
    }
  },
  '/task/error': {
    'get': {
      'api': '/api/error/task',
      handle(data, req, res) {
        res.status(data.task.code).send(data.task.message);
      }
    }
  },
  '/forward/and/render': {
    'get': {
      'api': 'http://localhost:8080/api/comment/list',
      'name': 'comments',
      handle(data, req, res) {
        res.forward(`${req.path}/handler`);
      }
    }
  },
  '/forward/and/render/handler': {
    'get': {
      'api': 'http://localhost:8080/api/comment/list',
      handle(data) {
        const comments = data.getList('comments.data.list');
        const list = data.getList('list.data.list');

        this.view = 'forward-and-render-handler';

        return { list, comments };
      }
    }
  },
  '/module-name': {
    'get': {
      'view': 'module/url-info.njk'
    }
  },
  '/render/after/series/task': {
    'get': {
      api: [
        {
          api: 'http://localhost:8080/api/comment/list',
          series: true,
          handle(data, req, res) {
            if (req.query.render === 'ahead') {
              res.send(data.getList('data.list')[0].content);
            }
          }
        },
        {
          api: 'http://localhost:8080/backend/names',
          handle(data, req, res) {
            res.send(data[0].name);
          }
        }
      ]
    }
  }
};
