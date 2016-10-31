const log = require('t-log');
const express = require('express');
const coc = require('./index');

const app = express();
const cocer = coc(app);

// 查看阶段列表，每个阶段都可以用before,after处理
log.info(cocer.stageNames);

cocer.before('pageInfo', (req, res, next) => {
  req.reqCircle = log.time();
  next();
});
cocer.before('initHttpRequest', (req, res, next) => {
  let timeout = 2 * 1000;

  if (req.router && req.router.timeout) {
    timeout = req.router.timeout;
  }
  req.httpRequestConfig = { timeout };

  next();
});
cocer.before('matchRouter', (req, res, next) => {
  log.debug('...matchRouter before 2');
  next();
});
cocer.after('requestProxy', (req, res, next) => {
  const pathname = req.pathname;
  log.debug('param:', req.param);
  log.debug('path:', pathname);

  if (pathname === '/forward') {
    log.info(req.router, '********');
    res.forward('/proxy');
    // res.redirect('http://www.163.com');
    // res.status(200).send('hello 200 ok!');
    // next已经可以正确处理forward情况
    // 类似redirect，res.send等已经响应了服务器的情况
    next();
    return;
  }

  next();
});
cocer.before('render', (req, res, next) => {
  const apiInfo = res.apiInfo;

  Object.keys(apiInfo).map(name => {
    const info = apiInfo[name];
    return log.info(info.method, info.api, info.consumeTime, 'ms');
  });
  log.warn('cost time: ', req.reqCircle.end());

  next();
});

app.use((req, res) => {
  res.status(404).send('404 not found!');
});

app.listen(8080, () => {
  const startInfo = 'server run at http://localhost:8080';

  log.info(startInfo);
});

