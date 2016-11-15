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
  }
};
