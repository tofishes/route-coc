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

  return fs.access(filePath, fs.constants.R_OK, error => {
    if (!error) {
      const engine = app.engines[res.viewExt];

      if (!engine) {
        throw new Error(`.${res.viewExt} file type has no template engine`);
      }

      const data = Object.assign(res.apiData, res.locals);

      return engine(filePath, data, (err, html) => {
        if (err) {
          next(err);
          return;
        }

        res.send(html);
      });
    }

    if (req.xhr) {
      return res.json(res.apiData);
    }

    return next();
  });
}

module.exports = render;
