const browserInfo = require('../utils/browser');
const slash = '/';

module.exports = function pageInfo(req, res, next) {
  const pathname = req.pathname.replace(slash, '');
  const firstSlash = pathname.indexOf(slash);

  const moduleName = pathname.substr(0, firstSlash);
  const browser = browserInfo(req.get('User-Agent'));

  Object.assign(req, {
    browser,
    moduleName
  });

  res.locals.request = req;
  res.locals.app = req.app;

  next();
};
