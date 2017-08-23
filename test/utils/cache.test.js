const should = require('should');
const cache = require('../../utils/memory-cache');
const tr = require('../../utils/time-record');

describe('util memory-cache', () => {
  it('should not exsit', () => {
    should.not.exist(cache('name'));
  });

  it('should stored in memory', () => {
    cache('name', 'yes');
    cache('name').should.equal('yes');
  });
});

describe('util time-record', () => {
  it('should set a time record', () => {
    should.exist(tr.set('name'));
  });

  it('should get a time record', (done) => {
    setTimeout(() => {
      const data = tr.get('name');
      const yes = data.bucket > 400 && data.bucket < 600;

      yes.should.be.true;
      done();
    }, 500)
  });

  it('should get right expired resule', () => {
    tr.isExpired('name', 1000).should.be.not.ok;
    tr.isExpired('name', 300).should.be.ok;
  });
});
