function response(req, res, next) {
  if (res.gotoInfo) {
    return res.redirect(...res.gotoInfo);
  }

  if (res.proxyResoponse) {
    return res.proxyResoponse.pipe(res);
  }

  /**
   * html渲染和ajax json渲染
   * 之所以html渲染放在前面，是允许配置了view的情况下，可以由ajax获取html结果
   * 若想ajax始终得到json，不要配置view
   */
  if (res.html) {
    return res.send(res.html);
  }

  if (req.xhr) {
    return res.json(res.apiData);
  }

  return next();
}

module.exports = response;
