module.exports = function runTask(req, res, next) {
  const seriesTask = req.apisTask.series;
  const parallelTask = req.apisTask.parallel;

  function handleData() {
    if (req.router && req.router.handle) {
      res.apiData = req.router.handle(res.apiData, req, res);
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
