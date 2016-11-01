module.exports = function runTask(req, res, next) {
  const seriesTask = req.apisTask.series;
  const parallelTask = req.apisTask.parallel;

  const runParallelTask = () => parallelTask.error(() => {
    next();
  }).run(() => {
    if (req.router.handle) {
      res.apiData = req.router.handle(res.apiData, req, res);
    }

    next();
  });

  if (seriesTask) {
    seriesTask.error(() => {
      next();
    }).run(() => {
      if (res.forwardSent) {
        return;
      }

      runParallelTask();
    });
  } else {
    runParallelTask();
  }
};
