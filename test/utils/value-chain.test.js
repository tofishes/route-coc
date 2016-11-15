require('should');
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

  it('should has proto getValue and is Function type', () => {
    valueChain.set(data);
    data.should.have.property('getValue').with.be.a.Function;
  });

  it('should can get value when use property getValue', () => {
    data.getValue('user.name').should.equal('Bodhi');
  });

  it('should can get defalut value when use property getValue', () => {
    data.getValue('user.gender', 1).should.be.exactly(1);
  });
});
