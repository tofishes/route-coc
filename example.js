const log = require('t-log');
const express = require('express');
const coc = require('./index');

const app = express();
const cocer = coc(app, {});

// 查看阶段列表，每个阶段都可以用before,after处理
log.info(cocer.stageNames);

cocer.before('matchRouter', (req, res, next) => {
  log.debug('...matchRouter before 1');
  next();
});
cocer.before('matchRouter', function m(req, res, next) {
  log.debug('...matchRouter before 2');
  log.info('this: ', this);
  next();
});
cocer.after('matchRouter', (req, res, next) => {
  log.debug('param:', req.param);
  log.debug('router:', req.router);

  next();
});


cocer.run();

app.listen(8080, () => {
  const startInfo = 'server run at http://localhost:8080';

  log.info(startInfo);
});

