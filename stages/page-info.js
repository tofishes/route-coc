const parser = require('ua-parser-js');
const urlInfo = require('../utils/url-info');
/**
 * 页面变量初始化等
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
module.exports = function pageInfo(req, res, next) {
  const { moduleName, pathes } = urlInfo(req.pathname);
  const ua = parser(req.get('User-Agent'));

  Object.assign(req, {
    ua,
    moduleName,
    pathes
  });

  res.locals.request = req;

  next();
};
