const fs = require('fs');
const minimatch = require('minimatch');
const log = require('t-log');

function render(req, res, next) {
  const app = req.app;
  const filePath = res.viewFile;
  const excludes = this.get('viewExclude')
    .filter(exclude => minimatch(filePath, exclude));

  // 匹配到需排除渲染的路径
  if (excludes.length) {
    log.warn(`viewPath: ${res.viewPath} is excluded!`);

    return next();
  }

  return fs.exists(filePath, exists => {
    if (exists) {
      const engine = app.engines[res.viewExt];

      if (!engine) {
        throw new Error(`.${res.viewExt} file type has no template engine`);
      }

      // res.locals 不具有 hasOwnProperty 方法，在swig设置locals后会报错
      const data = Object.assign(res.apiData, res.locals);
      // 手动渲染有利于domain的错误捕捉，res.render会隐藏一些问题
      return res.send(engine(filePath, data));
    }

    if (req.xhr) {
      return res.json(res.apiData);
    }

    return next();
  });
}

module.exports = render;
