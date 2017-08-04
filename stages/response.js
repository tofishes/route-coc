function response(req, res, next) {
  if (res.proxyResoponse) {
    return res.proxyResoponse.pipe(res);
  }

  /**
   * html渲染和ajax json渲染
   * 之所以html渲染放在前面，是允许配置了view的情况下，可以由ajax获取html结果
   * 若想ajax始终得到json，不要配置view
   */
  if (res.html) {
    const disablePageCache = req.router && req.router.pageCache === false;
    res.disableCache(disablePageCache);

    return res.send(res.html);
  }

  if (req.xhr) {
    const disableAjaxCache = req.xhr && this.get('ajaxCache') === false;
    res.disableCache(disableAjaxCache);

    return res.json(res.apiData);
  }

  return next();
}

module.exports = response;
