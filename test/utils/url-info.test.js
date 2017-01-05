require('should');
const urlInfo = require('../../utils/url-info');

describe('util url-info', () => {
  it('should get exactly moduleName and pathes', () => {
    const url1 = '/news/abc';
    const url2 = 'news';
    const url3 = '/news';
    const url4 = '/';
    const url5 = '';

    urlInfo(url1).moduleName.should.equal('news');
    urlInfo(url2).moduleName.should.equal('news');
    urlInfo(url3).moduleName.should.equal('news');
    urlInfo(url4).moduleName.should.equal('home');
    urlInfo(url5).moduleName.should.equal('home');
  });
});
