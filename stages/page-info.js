const parser = require('ua-parser-js');
const valueChain = require('value-chain');
const urlInfo = require('../utils/url-info');

function disableCache(disabled) {
  if (!disabled) {
    return;
  }

  const res = this;

  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
}

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
  res.disableCache = disableCache.bind(res);

  valueChain.set(res.apiData);

  next();
};
