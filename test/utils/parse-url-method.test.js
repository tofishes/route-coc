require('should');
const parseURLMethod = require('../../utils/parse-url-method');

describe('util parse url to get method', () => {
  it('should get post method when url is post: prefix', () => {
    const urlMethod = parseURLMethod('post:/api');
    urlMethod.method.should.equal('post');
    urlMethod.url.should.equal('/api');
  });
  it('should get default post method', () => {
    const urlMethod = parseURLMethod('/api', 'post');
    urlMethod.method.should.equal('post');
    urlMethod.url.should.equal('/api');
  });
  it('should get default get method', () => {
    const urlMethod = parseURLMethod('/api');
    urlMethod.method.should.equal('get');
    urlMethod.url.should.equal('/api');
  });
});
