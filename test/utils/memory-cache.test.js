const should = require('should');
const cache = require('../../utils/memory-cache');

describe('util memory-cache', () => {
  it('should not exsit', () => {
    should.not.exist(cache('name'));
  });

  it('should stored in memory', () => {
    cache('name', 'yes');
    cache('name').should.equal('yes');
  });
});
