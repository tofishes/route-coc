const should = require('should');
const Stage = require('../libs/stage');

const pageInfo = require('../stages/page-info');
const matchRouter = require('../stages/match-router');
let nextToResult = 'to is ok';
let noInvoKeMiddle = 'no-invoke';

function a(req, res, next) {
  req.isTo = true;
  next.to('c');
}
function b(req, res, next) {
  req.isTo = false;
  noInvoKeMiddle = 'yes-invoke';
  next();
}
function c(req, res, next) {
  if (!req.isTo) {
    nextToResult = 'to is bad';
    return;
  }

  next();
}
function d(req, res, next) {
  next.to('fake-action');
}

describe('Class Stage', () => {
  const filters = [pageInfo, matchRouter];
  const stage = new Stage(filters);
  const stage2 = new Stage([a, b, c]);
  const stage3 = new Stage([d, b]);

  function beforePageInfo() {}
  function afterPageInfo() {}

  it('should have two filters', () => {
    stage.stageNames.join(',').should.equal('pageInfo,matchRouter');
  });

  it('should can add before filter', () => {
    stage.before('pageInfo', beforePageInfo);

    stage.actions.map(action => action.name)
      .join(',').should.equal('beforePageInfo,pageInfo,matchRouter');
  });

  it('should can add after filter', () => {
    stage.after('pageInfo', afterPageInfo);

    stage.actions.map(action => action.name)
      .join(',').should.equal('beforePageInfo,pageInfo,afterPageInfo,matchRouter');
  });

  it('should throw when add filter to unexist stage', () => {
    const errorAfter = stageName => stage.after(stageName, afterPageInfo);
    errorAfter.bind(null, 'wrongStage').should.throw();
    errorAfter.bind(null, 'pageInfo').should.not.throw();
  });

  it('should get and set props correctly', () => {
    stage.set('a', 1);
    stage.get('a').should.equal(1);
  });

  it('should get ok when use next.to()', () => {
    stage2.handle({ path: '/demo' }, {}, () => {});

    nextToResult.should.equal('to is ok');
    noInvoKeMiddle.should.equal('no-invoke');
  });

  it('should throw error when use next.to an not exist action', () => {
    try {
      stage3.handle({ path: '/demo' }, {}, () => {});
    } catch (e) {
      e.message.should.containEql('Action fake-action does not exist');
    }
  });
});
