const parser = require('ua-parser-js');
const slash = '/';
/**
 * 页面变量初始化等
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
module.exports = function pageInfo(req, res, next) {
  const pathname = req.pathname.replace(slash, '');
  const firstSlash = pathname.indexOf(slash);

  const moduleName = pathname.substr(0, firstSlash);
  const ua = parser(req.get('User-Agent'));

  Object.assign(req, {
    ua,
    moduleName
  });

  res.locals.request = req;
  res.locals.app = req.app;

  next();
};
