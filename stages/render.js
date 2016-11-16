const fs = require('fs');
const minimatch = require('minimatch');
const log = require('t-log');

function render(req, res, next) {
  const app = req.app;
  const filePath = res.viewFile;
  const excludes = app.get('viewExclude')
    .filter(exclude => minimatch(filePath, exclude));

  // 匹配到需排除渲染的路径
  if (excludes.length) {
    log.warn(`viewPath: ${res.viewPath} is excluded!`);

    return next();
  }

  return fs.exists(filePath, exists => {
    if (exists) {
      const engine = app.engines[res.viewExt];
      const data = Object.assign(res.locals, res.apiData);
      // 手动调用有利于错误捕捉
      res.send(engine(filePath, data));
    } else {
      next();
    }
  });
}

module.exports = render;
