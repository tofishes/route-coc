const request = require('supertest');
const app = require('../example/example');

describe('Interceptors', () => {
  it('should intercept a.jpg', done => {
    request(app)
      .get('/test/ext/a.jpg')
      .expect(res => {
        if (res.text !== 'has intercept ext') {
          throw new Error('intercept fail');
        }
      })
      .end(done);
  });
  it('should not intercept assets file request', done => {
    request(app)
      .get('/test/ext/b.jpg')
      .expect(res => {
        if (res.text === 'no intercept ext') {
          throw new Error('intercept fail');
        }
      }).expect(404, done);
  });

  it('should intercept router request', done => {
    request(app)
      .get('/test/ext/b')
      .expect(res => {
        if (res.text !== 'no intercept ext') {
          throw new Error('intercept fail');
        }
      })
      .end(done);
  });

  it('should intercept and proxy to baidu', done => {
    request(app)
      .get('/test/forward/baidu')
      .expect(res => {
        if (!~res.text.indexOf('百度一下，你就知道')) {
          throw new Error('not baidu content');
        }
      })
      .end(done);
  });

  it('should intercept and get comment list from cache and cache is func', done => {
    const client = request(app);
    client.get('/test/intercept/series/comments')
      .expect(res => {
        if (res.text !== 'true') {
          throw new Error('intercept and get comment list fail');
        }
      })
      .end(done);
  });

  it('should not intercept xhr', done => {
    request(app)
      .get('/test/intercept/series/comments')
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect(res => {
        if (res.text !== 'false') {
          throw new Error('donot intercept xhr fail');
        }
      })
      .end(done);
  });

  it('should intercept xhr when config ajax=true', done => {
    request(app)
      .get('/test/intercept/ajax')
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect('ok', done);
  });

  it('should interceptor response', done => {
    request(app)
      .get('/intercept/has/redirect/this-is-not-excute')
      .expect(200, /interceptor response/, done);
  });

  it('should interceptor forward', done => {
    request(app)
      .get('/intercept/has/forward/this-is-not-excute')
      .expect(200, /hello world/, done);
  });

  it('should can get data in router api-function from intercept api when set intercept series = true', done => {
    request(app)
      .get('/intercept/series/api-func-get-data')
      .expect(res => {
        if (res.text !== 'two') {
          throw new Error('router function api config fail to get apiData from interceptor');
        }
      })
      .end(done);
  });

  it('should can not get data in router api-function from intercept api when set intercept series = fales', done => {
    request(app)
      .get('/intercept/series/api-func-get-data?series=false')
      .expect('one', done);
  });
});
