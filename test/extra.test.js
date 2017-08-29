const request = require('supertest');
const app = require('../example/example');

describe('Extra app functions', () => {
  it('should render with marko', done => {
    request(app)
      .get('/marko')
      .expect(200, /This is Marko/, done);
  });

  it('should can use app.use before coc', done => {
    request(app)
      .get('/favicon.ico')
      .expect('ok', done);
  });

  it('should timeout when router config timeout is insufficient', done => {
    request(app)
      .get('/test/will/api-timeout')
      .expect(504, 'timeout', done);
  });

  it('should ok when router config timeout is enough', done => {
    request(app)
      .get('/test/willnot/api-timeout')
      .expect(200, /百度一下/, done);
  });

  it('should upload and get fields from req.body', done => {
    request(app)
      .post('/upload')
      .field('type', 'upload')
      .field('hobby', 'billiards')
      .field('hobby', 'tennis')
      .attach('avatar', `${__dirname}/avatar.jpg`)
      .expect(res => {
        const body = res.body;
        if (body.type !== 'upload' || body.avatar.originalFilename !== 'avatar.jpg'
          || !~body.avatar.path.indexOf('/uploads')
          || !body.avatar.path.endsWith('.jpg')
          || !Array.isArray(body.hobby)
          || body.hobby[1] !== 'tennis'
        ) {
          throw new Error('upload failed');
        }
      })
      .end(done);
  });
});
