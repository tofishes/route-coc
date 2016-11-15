require('should');
const typeOf = require('../../utils/typeof');

describe('util typeOf something', () => {
  it('should be an object', () => {
    typeOf({}).type.should.equal('object');
  });
  it('should be an function', () => {
    typeOf(() => {}).type.should.equal('function');
  });
  it('should be an array', () => {
    typeOf([]).type.should.equal('array');
  });
  it('should be an number', () => {
    typeOf(1).type.should.equal('number');
  });
  it('should be an number', () => {
    typeOf(Number(1)).type.should.equal('number');
  });
  it('should be an string', () => {
    typeOf('1').type.should.equal('string');
  });
  it('should be an boolean', () => {
    typeOf(true).type.should.equal('boolean');
  });
});
