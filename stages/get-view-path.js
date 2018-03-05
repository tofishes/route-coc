const path = require('path');
const fs = require('fs');
const typeOf = require('../utils/typeof');

function getViewPath(req, res, next) {
  const app = req.app;
  const router = req.router || {};

  let view = router.view;

  if (!view) {
    view = req.path;
  }

  if (typeOf(view).is('function')) {
    view = view.call(router, req, res);

    if (!view) {
      next();
      return;
    }
  }

  // view配置可以不以/开头
  if (!view.startsWith('/')) {
    view = `/${view}`;
  }

  // 已设置默认引擎
  const defaultEngine = app.get('view engine') || this.get('view engine');
  let ext = path.extname(view);

  if (!ext) {
    ext = defaultEngine.startsWith('.') ? defaultEngine : `.${defaultEngine}`;
    view += ext;
  }

  res.viewPath = view;
  res.viewExt = ext;

  const filePath = path.join(this.get('views'), view);

  const success = viewFile => {
    res.viewFile = viewFile;

    return next();
  };

  fs.access(filePath, err => {
    if (!err) {
      return success(filePath);
    }

    const indexFile = filePath.replace(ext, `/index${ext}`);

    return fs.access(indexFile, error => {
      if (!error) {
        success(indexFile);
        return;
      }

      next();
    });
  });
}

module.exports = getViewPath;
