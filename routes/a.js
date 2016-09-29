const log = require('t-log');

module.exports = {
  '/hello/:username, /member/:id': {
    'get': {
      'api': 'http://www.baidu.com',
      query(queries) {
        log.debug(queries);
        return queries;
      },
      param(params) {
        log.debug(this.query(params), '....');
      },
      handle(data) {
        log.debug('data: ', data);
      },
      'view': 'hello'
    }
  }
};
