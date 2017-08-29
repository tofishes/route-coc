const request = require('supertest');
const app = require('../example/example');

describe('App B-Plan server request', () => {
  it('should can visit', done => {
    request(app)
      .get('/b-plan/hello/tofishes')
      .expect(200, /hello\/tofishes/, done);
  });

  it('should get comments size', done => {
    request(app)
      .get('/b-plan/comments')
      .expect(200, /评论数20/, done);
  });
});
