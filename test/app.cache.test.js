const request = require('supertest');
const app = require('../example/example');

describe('App response cache', () => {
  it('should no-cache when is ajax', done => {
    request(app)
      .get('/b-plan/hello/tofishes')
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect('Cache-Control', 'no-cache, no-store, must-revalidate', done);
  });
});
