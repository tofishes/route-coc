const should = require('should');
const valueChain = require('../../utils/value-chain');

const data = {
  'user': {
    'name': 'Bodhi'
  }
};

describe('util value-chain', () => {
  it('should get value chain', () => {
    valueChain(data, 'user.name').should.equal('Bodhi');
  });

  it('should return default value', () => {
    valueChain(data, 'user.gender', 1).should.be.exactly(1);
  });

  it('should do not throw when not defaultValue', () => {
    valueChain.bind(null, data, 'user.gender.a').should.not.throw();
  });

  it('should has proto getValue and is Function type', () => {
    valueChain.set(data);
    data.should.have.property('getValue').with.be.a.Function;
  });

  it('should return self when obj is empty or null or false', () => {
    let a;
    should(valueChain.set(null)).be.exactly(null);
    should(valueChain.set(a)).be.exactly(undefined);
    valueChain.set(false).should.be.exactly(false);
  });

  it('should can get value when use property getValue', () => {
    data.getValue('user.name').should.equal('Bodhi');
  });

  it('should can get defalut value when use property getValue', () => {
    data.getValue('user.gender', 1).should.be.exactly(1);
  });
});
