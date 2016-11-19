const should = require('should');
const valueChain = require('../../utils/value-chain');

const data = {
  'user': {
    'name': 'Bodhi',
    'profile': {
      'gender': 1,
      'features': [1, 2]
    }
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

  it('should has proto getList and is Function type', () => {
    data.should.have.property('getList').with.be.a.Function;
  });

  it('should has proto getMap and is Function type', () => {
    data.should.have.property('getMap').with.be.a.Function;
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

  it('should can get defalut array when use property getList', () => {
    data.getList('user.gender').should.be.instanceof(Array).and.have.lengthOf(0);
  });
  it('should can get defalut object when use property getMap', () => {
    data.getMap('user.gender').should.be.an.instanceOf(Object);
  });

  it('should can be chainning of the getValue', () => {
    const profile = data.getMap('user.profile');

    profile.should.have.property('getValue').with.be.a.Function;
    profile.should.have.property('getList').with.be.a.Function;
    profile.should.have.property('getMap').with.be.a.Function;
    profile.getList('features').should.be.instanceof(Array).and.have.lengthOf(2);
  });
});
