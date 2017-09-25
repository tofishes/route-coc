const request = require('supertest');
const app = require('../example/example');

describe('App forward and redirect', () => {
  it('should redirect to /hello', done => {
    request(app)
      .get('/res/goto')
      .expect(/Found. Redirecting to \/hello/, done);
  });

  it('should redirect to /hello Found', done => {
    request(app)
      .get('/res/goto/302')
      .expect(/Found. Redirecting to \/hello/, done);
  });

  it('should redirect to /hello permanently', done => {
    request(app)
      .get('/res/goto/301')
      .expect(/Moved Permanently. Redirecting to \/hello/, done);
  });
});
