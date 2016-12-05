const valueChain = require('value-chain');

function handleData(req, res, next) {
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

  next();
}

module.exports = function runTask(req, res, next) {
  const seriesTask = req.apisTask.series;
  const parallelTask = req.apisTask.parallel;

  const runParallelTask = () => {
    if (!parallelTask) {
      return handleData(req, res, next);
    }

    return parallelTask.error(error => {
      next(error);
    }).run(() => {
      handleData(req, res, next);
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
