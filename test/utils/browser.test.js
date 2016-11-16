require('should');
const browser = require('../../utils/browser');

const ipad = `Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X)
 AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`;
const iphone = `Mozilla/5.0 (iPhone; CPU iPhone OS 10_1 like Mac OS X)
 AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`;
const android = `Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T)
 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36`;
const chrome = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1)
 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36`;

describe('util browser useragent', () => {
  it('should be ios when ipad', () => {
    const profile = browser(ipad);
    profile.mobile.should.be.exactly('ios');
    profile.version.should.be.exactly(9.1);
  });
  it('should be ios when iphone', () => {
    const profile = browser(iphone);
    profile.mobile.should.be.exactly('ios');
    profile.version.should.be.exactly(10.1);
  });
  it('should be android', () => {
    const profile = browser(android);
    profile.mobile.should.be.exactly('android');
    profile.version.should.be.exactly(5);
  });
  it('should be webkit', () => {
    const profile = browser(chrome);
    profile.webkit.should.be.exactly(true);
  });
});
