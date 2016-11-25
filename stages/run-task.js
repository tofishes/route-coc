const valueChain = require('value-chain');

module.exports = function runTask(req, res, next) {
  const seriesTask = req.apisTask.series;
  const parallelTask = req.apisTask.parallel;

  function handleData() {
    const router = req.router;

    if (router && router.handle) {
      const data = router.handle(res.apiData, req, res);

      if (data) {
        valueChain.set(data);
      }

      if (router.name) {
        res.apiData[router.name] = data;
      } else {
        res.apiData = data || res.apiData;
      }
    }
  }

  const runParallelTask = () => {
    if (!parallelTask) {
      handleData();
      return next();
    }

    return parallelTask.error(error => {
      next(error);
    }).run(() => {
      handleData();
      next();
    });
  };

  if (seriesTask) {
    seriesTask.error(error => {
      next(error);
    }).run(() => {
      if (res.forwardSent || res.hasSent || res.headersSent) {
        return;
      }

      runParallelTask();
    });
  } else {
    runParallelTask();
  }
};
