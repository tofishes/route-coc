require('should');
const handleConfig = require('../../stages/handle-router').handleConfig;

describe('handle router', () => {
  const req = {
    'apisTask': {}
  };
  const res = {};

  it('should throw when the type of api is not String and Array and Function', () => {
    const routerConfig = {
      'api': 11
    };
    handleConfig.bind(null, routerConfig, req, res).should.throw();
  });
});
