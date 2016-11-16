const path = require('path');
const typeOf = require('../utils/typeof');

function getViewPath(req, res, next) {
  const app = req.app;
  const router = req.router || {};

  let view = router.view;

  if (!view) {
    view = req.path;
  }
  // view配置可以不以/开头
  if (!view.startsWith('/')) {
    view = `/${view}`;
  }

  if (typeOf(view).is('function')) {
    view = view.call(router, req, res);
  }

  const defaultEngine = app.get('view engine');
  let ext = path.extname(view);

  if (!ext && !defaultEngine) {
    const error = new Error('No default engine was specified and no extension was provided.');
    return next(error);
  }

  if (!ext) {
    ext = defaultEngine.startsWith('.') ? defaultEngine : `.${defaultEngine}`;
    view += ext;
  }

  const filePath = path.join(app.get('views'), view);

  res.viewPath = view;
  res.viewExt = ext;
  res.viewFile = filePath;

  return next();
}

module.exports = getViewPath;
