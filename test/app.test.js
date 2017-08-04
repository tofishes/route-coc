const request = require('supertest');
const app = require('../example/example');

describe('App server request', () => {
  it('should can visit', done => {
    request(app)
      .get('/comment/list')
      .set('Accept', 'application/html')
      .expect('Content-Type', /html/)
      .expect(200, /热门评论/, done);
  });

  it('should be ok visit cache data', done => {
    request(app)
      .get('/comment/list')
      .set('Accept', 'application/html')
      .expect('Content-Type', /html/)
      .expect(200, /热门评论/, done);
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
      .expect(200, /百度一下，你就知道/, done);
  });

  it('should error when forward to current req path', done => {
    request(app)
      .get('/forward/to/self')
      .expect(500, /foward path cannot be the same as req.path/, done);
  });

  it('should handled by middleware when render error ', done => {
    request(app)
      .get('/render-error')
      .expect(500, done);
  });

  it('should forward ok', done => {
    request(app)
      .get('/forward/and/render')
      .expect(200, /list/, done);
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
});

describe('render view and parse query', () => {
  it('should throw error 405 method not allowed', done => {
    request(app)
      .get('/post')
      .expect(500, done);
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

  it('should auto render', done => {
    request(app)
      .get('/auto-render')
      .expect(200, /auto-render/, done);
  });

  it('should render default index page when visit dir path', done => {
    request(app)
      .get('/render-index')
      .expect(200, /index file/, done);
  });

  it('should render default index page when visit dir view', done => {
    request(app)
      .get('/render-index-view')
      .expect(200, /index file/, done);
  });

  it('should auto render swig file by swig engine', done => {
    request(app)
      .get('/other-engine.swig')
      .expect(200, /use swig engine/, done);
  });
  it('should render swig view by swig engine', done => {
    request(app)
      .get('/render-with-swig')
      .expect(200, /use swig engine/, done);
  });

  it('should 404 when visit not exist file view', done => {
    request(app)
      .get('/not/exist/view')
      .expect(404, done);
  });
  it('should 404 when visit exlucde view path', done => {
    request(app)
      .get('/include/header')
      .expect(404, done);
  });
  it('should 200 when visit module view path', done => {
    request(app)
      .get('/module/head')
      .expect(200, /include/, done);
  });

  it('should return json when is xhr', done => {
    request(app)
      .get('/xhr/comment/list')
      .set('X-Requested-With', 'XMLHttpRequest')
      // .expect(res => {
      //   console.log(res.body, '=======+++++++')
      // })
      .expect(200, /鞋子非常好，质量棒棒哒/, done);
  });

  it('should return json when is proxy', done => {
    request(app)
      .get('/proxy/api/comment/list')
      .expect(200, /鞋子非常好，质量棒棒哒/, done);
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

  it('should intercept and get comment list from cache and cache is func', done => {
    request(app)
      .get('/test/intercept/series/comments')
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
});

describe('Routers test', () => {
  it('should match the fixed router', done => {
    request(app)
      .get('/conflicted/literals')
      .expect(200, /fixed literals/, done);
  });

  it('should match the dynamic router', done => {
    request(app)
      .get('/conflicted/tofishes')
      .expect(200, /dynamic tofishes/, done);
  });
});

describe('Config is function', () => {
  it('should be ok when api is Array', done => {
    request(app)
      .get('/api/is/array')
      .expect(200, /api-is-array/, done);
  });
  it('should be ok when config is Function', done => {
    request(app)
      .get('/config/is/function')
      .expect(200, /api-is-function/, done);
  });
  it('should be ok when api is Function', done => {
    request(app)
      .get('/api/is/function')
      .expect(200, /api-is-function/, done);
  });
  it('should be ok when api is mixed types', done => {
    request(app)
      .get('/mixed/api-config')
      .expect(200, /true/, done);
  });
});

describe('Task run', () => {
  it('should 500 when api url is wrong', done => {
    request(app)
      .get('/task/error')
      .expect(500, /Invalid URI/, done);
  });

  it('should 500 when api url of series interceptor is wrong', done => {
    request(app)
      .get('/intercept/api/wrong/this-is-not-excute')
      .expect(500, /Invalid URI/, done);
  });
});

describe('PageInfo Locals', () => {
  const chrome = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36';

  it('should get broswer chrome info', done => {
    request(app)
      .get('/browser')
      .set('User-Agent', chrome)
      .expect(200, /chrome/i, done);
  });

  it('should get moduleName exactly', done => {
    request(app)
      .get('/module-name')
      .expect(200, /module-name/, done);
  });

  it('should get moduleName and pathes exactly', done => {
    request(app)
      .get('/module/url-info')
      .expect(200, /pathes: module,url-info/)
      .expect(200, /moduleName: module,/, done);
  });
});
