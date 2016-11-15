const request = require('supertest');
const app = require('../example/example');

describe('App server request', () => {
  it('should can visit', done => {
    request(app)
      .get('/proxy-api')
      .set('Accept', 'application/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should return 404', done => {
    request(app)
      .get('/404')
      .expect(404, done);
  });

  it('should redirect', done => {
    request(app)
      .get('/redirect')
      .expect(302, done);
  });

  it('should hello world', done => {
    request(app)
      .get('/hello')
      .expect(200, 'hello world', done);
  });

  it('should proxy from baidu', done => {
    request(app)
      .get('/proxy')
      .expect(res => {
        if (!~res.text.indexOf('百度一下，你就知道')) {
          throw new Error('not baidu content');
        }
      })
      .end(done);
  });

  // filters
  it('should forward to baidu after requestProxy', done => {
    request(app)
      .get('/forward')
      .expect(res => {
        if (!~res.text.indexOf('百度一下，你就知道')) {
          throw new Error('not baidu content');
        }
      })
      .end(done);
  });

  // render view and parse query
  it('should 405 method not allowed', done => {
    request(app)
      .get('/post')
      .expect(405, done);
  });
  it('should render hello username', done => {
    request(app)
      .get('/hello/bodhi')
      .expect(res => {
        if (res.text !== 'hello bodhi') {
          throw new Error('view render error');
        }
      })
      .end(done);
  });
  it('should only post and exec handle to response', done => {
    request(app)
      .post('/post')
      .send({ age: 11 })
      .expect(res => {
        if (res.text !== 'post body: 11') {
          throw new Error('body parse error');
        }
      })
      .end(done);
  });
  it('should handle body param', done => {
    request(app)
      .post('/post/param')
      .send({ age: 11 })
      .expect(res => {
        if (res.text !== 'name: bodhi, age: 11') {
          throw new Error('handle body param error');
        }
      })
      .end(done);
  });
});

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
      .expect(404, res => {
        if (res.text === 'no intercept ext') {
          throw new Error('intercept fail');
        }
      })
      .end(done);
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

  it('should intercept and get comment list', done => {
    request(app)
      .get('/test/intercept/series/comments')
      .expect(res => {
        if (res.text !== 'true') {
          throw new Error('intercept and get comment list fail');
        }
      })
      .end(done);
  });
});
