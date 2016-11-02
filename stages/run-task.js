module.exports = function runTask(req, res, next) {
  const seriesTask = req.apisTask.series;
  const parallelTask = req.apisTask.parallel;

  const runParallelTask = () => parallelTask.error(error => {
    next(error);
  }).run(() => {
    if (req.router.handle) {
      res.apiData = req.router.handle(res.apiData, req, res);
    }

    next();
  });

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
