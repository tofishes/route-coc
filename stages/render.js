const minimatch = require('minimatch');
const log = require('t-log');

function render(req, res, next) {
  const app = req.app;
  const filePath = res.viewFile;

  /**
   * html渲染和ajax json渲染
   * 之所以html渲染放在前面，是允许配置了view的情况下，可以由ajax获取html结果
   * 若想ajax始终得到json，不要配置view
   */
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

    data.apiDataKeys = Object.keys(data);

    return engine(filePath, data, (err, html) => {
      if (err) {
        next(err);
        return;
      }

      const disablePageCache = req.router && req.router.pageCache === false;
      res.disableCache(disablePageCache);

      res.send(html);
    });
  }

  if (req.xhr) {
    return res.json(res.apiData);
  }

  return next();
}

module.exports = render;
