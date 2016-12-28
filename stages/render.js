const minimatch = require('minimatch');
const log = require('t-log');

function disableCache(res, disabled) {
  if (!disabled) {
    return;
  }

  res.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.append('Pragma', 'no-cache');
  res.append('Expires', '0');
}

function render(req, res, next) {
  const app = req.app;
  const filePath = res.viewFile;

  if (filePath) {
    const excludes = this.get('viewExclude')
      .filter(exclude => minimatch(filePath, exclude));

    // 匹配到需排除渲染的路径
    if (excludes.length) {
      log.warn(`viewPath: ${res.viewPath} is excluded!`);

      return next();
    }

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

      const disablePageCache = req.router && req.router.pageCache === false;
      disableCache(res, disablePageCache);

      res.send(html);
    });
  }

  if (req.xhr) {
    const disableAjaxCache = this.get('ajaxCache') === false;
    disableCache(res, disableAjaxCache);

    return res.json(res.apiData);
  }

  return next();
}

module.exports = render;
