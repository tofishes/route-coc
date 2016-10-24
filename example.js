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
cocer.after('requestProxy', (req, res, next) => {
  log.debug('param:', req.param);
  log.debug('path:', req.path);
  const pathname = req.pathname || req.path;

  if (pathname === '/forward') {
    log.info(req.router, '********');
    res.forward('/proxy');
    return;
  }
  log.warn(req.pathname, '*****');
  next();
});

app.listen(8080, () => {
  const startInfo = 'server run at http://localhost:8080';

  log.info(startInfo);
});

