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

  it('should get cache data when during validity period', done => {
    const client = request(app);
    client.get('/test/cache/expires')
      .end((err, res) => {
        const fisrtData = res.text;

        client.get('/test/cache/expires')
          .expect(fisrtData, done);
      });
  });

  it('should get new data when cache is expired', done => {
    const client = request(app);
    client.get('/test/cache/expires')
      .end((err, res) => {
        const fisrtData = res.text;

        setTimeout(() => {
          client.get('/test/cache/expires')
            .expect(res2 => {
              if (res2.text === fisrtData) {
                throw new Error('not update cache');
              }
            })
            .end(done);
        }, 400);
      });
  });

  it('should get new data every time when api is exception', done => {
    const client = request(app);
    client.get('/test/cache/expires')
      .end((err, res) => {
        const fisrtData = res.text;

        client.get('/test/cache/expires?statusCode=500')
          .expect(res2 => {
            if (res2.text === fisrtData) {
              throw new Error('can not get new data');
            }
          })
          .end(done);
      });
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

  it('should forward to www.baidu.com in router.api function', done => {
    request(app)
      .get('/forward/to/baidu-in-api')
      .expect(200, /百度一下，你就知道/, done);
  });

  it('should forward to www.baidu.com in router.handle config', done => {
    request(app)
      .get('/forward/to/baidu')
      .expect(200, /百度一下，你就知道/, done);
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

  it('should forward ok when has query', done => {
    request(app)
      .get('/forward/and/render?name=tofishes')
      .expect(200, /tofishes/, done);
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

  it('should can get prev api data in query|body when prev api is series', done => {
    request(app)
      .get('/series-apis/get-data-from-prev')
      .expect('true', done);
  });

  it('should can not get prev api data in query|body when prev api is not series', done => {
    request(app)
      .get('/series-apis/get-data-from-prev2')
      .expect('false', done);
  });

  it('should can get prev api data in apiFunction return query|body when prev api is series', done => {
    request(app)
      .get('/series-apis/get-data-from-prev3?series=true')
      .expect('true', done);
  });

  it('should can not get prev api data in apiFunction return query|body when prev api is not series', done => {
    request(app)
      .get('/series-apis/get-data-from-prev3')
      .expect('false', done);
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

  it('should ignore param when it is undefined', done => {
    request(app)
      .get('/hello/undefined')
      .expect('no username', done);
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

  it('should get error when ext engine is not register', done => {
    request(app)
      .get('/ext/engine/is/not/register')
      .expect(500, /File type '.engine' has no template engine/, done);
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
  it('should 503 when api url is wrong', done => {
    request(app)
      .get('/task/error')
      .expect(503, /Invalid URI/, done);
  });

  it('should 503 when api url of series interceptor is wrong', done => {
    request(app)
      .get('/intercept/api/wrong/this-is-not-excute')
      .expect(503, /Invalid URI/, done);
  });

  it('should not run parallel task when res.hasSent after series task', done => {
    request(app)
      .get('/render/after/series/task?render=ahead')
      .expect(200, /收到鞋子后打开一看真的很精致/, done);
  });

  it('should run parallel task when no res.hasSent after series task', done => {
    request(app)
      .get('/render/after/series/task')
      .expect(200, /tofishes/, done);
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
