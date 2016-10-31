const fs = require('fs');
const path = require('path');
const minimatch = require('minimatch');
const log = require('t-log');

const typeOf = require('../utils/typeof');

function render(req, res, next) {
  const app = req.app;
  const router = req.router;

  if (!router) {
    return next();
  }

  let view = router.view;

  if (!view) {
    view = req.path;
  }
  // view配置可以不以/开头
  if (!view.startsWith('/')) {
    view = `/${view}`;
  }

  if (typeOf(view).is('function')) {
    view = view.call(router, req, res, next);
  }

  const defaultEngine = app.get('view engine');
  let ext = path.extname(view);

  if (!ext && !defaultEngine) {
    throw new Error('No default engine was specified and no extension was provided.');
  }

  if (!ext) {
    ext = defaultEngine.startsWith('.') ? defaultEngine : `.${defaultEngine}`;
    view += ext;
  }

  const filePath = path.join(app.get('views'), view);
  const excludes = app.get('viewExclude').filter(exclude => minimatch(filePath, exclude));
  // 匹配到需排除渲染的路径
  if (excludes.length) {
    log.warn(`viewPath: ${view} is excluded!`);

    return next();
  }

  return fs.exists(filePath, exists => {
    if (exists) {
      const engine = app.engines[ext];
      const data = Object.assign(res.locals, res.apiData);
      // 手动调用有利于错误捕捉
      res.send(engine(filePath, data));
    } else {
      next();
    }
  });
}

module.exports = render;
