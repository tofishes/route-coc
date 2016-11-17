module.exports = {
  '/post': {
    'post': {
      handle(data, req, res) {
        res.send(`post body: ${req.body.age}`);
      }
    }
  },
  '/post/param': {
    'post': {
      'api': 'http://localhost:8080/post/param/helper',
      body(req) {
        return {
          'name': 'bodhi',
          'age': req.body.age
        };
      },
      handle(data, req, res) {
        const helper = data.getValue('helper', {});
        res.send(`name: ${helper.name}, age: ${helper.age}`);
      }
    }
  },
  '/post/param/helper': {
    'post': {
      handle(data, req, res) {
        res.json(req.body);
      }
    }
  },
  '/api/is/array': {
    'get': {
      'api': ['http://localhost:8080/api/is/function', {
        'api': 'http://localhost:8080/config/is/function'
      }, function api() {
        return 'http://localhost:8080/hello';
      }, function apiReturnNull() {
        return null;
      }],
      handle(data, req, res) {
        res.send('api-is-array');
      }
    }
  },
  '/api/is/function': {
    'get': {
      api() {
        this.view = 'api-is-function';
        return null;
      }
    }
  },
  '/config/is/function': {
    get() {
      return {
        api() {
          this.view = 'api-is-function';
          return null;
        }
      };
    }
  }
};
